import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';

import { EventBus } from '@/services/event-bus/event-bus';
import { cloneDeep } from '@/utils/clone-deep';

import type { Meta, Element, Props, Children } from './types';

export class Block<T extends Props = Props> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  eventBus;

  _element: Element | null = null;
  _id = nanoid(6);
  _meta: Meta | null = null;

  children: Children;
  props: T;

  constructor(tagName = 'div', propsWithChildren: T) {
    const eventBus = new EventBus();
    this.eventBus = () => eventBus;

    const { children, ...props } = propsWithChildren;

    this.children = children || {};
    this.props = this._makePropsProxy({ ...props } as T);

    this._meta = {
      tagName,
      props,
    };

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName, props } = this._meta || {};

    if (tagName === 'fragment') {
      this._element = document.createDocumentFragment() as unknown as HTMLElement;
    } else {
      this._element = this._createDocumentElement(
        (tagName ?? 'div') as keyof HTMLElementTagNameMap
      );
    }

    if (typeof props?.attrs === 'object') {
      Object.entries(props.attrs).forEach(([attrName, attrValue]) => {
        this._element?.setAttribute(attrName, String(attrValue));
      });
    }
  }

  init() {
    this._createResources();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    // Object.values(this.children).forEach((child) => {
    //   if (Array.isArray(child)) {
    //     child.forEach((component) => component.dispatchComponentDidMount());
    //   } else {
    //     child.dispatchComponentDidMount();
    //   }
    // });
  }

  _componentDidUpdate(oldProps: T, newProps: T) {
    const isPropsChanged = this.componentDidUpdate(oldProps, newProps);

    if (isPropsChanged) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: T, newProps: T) {
    return true;
  }

  setProps = (nextProps: Partial<T>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  _compile() {
    const propsAndStubs: Record<string, unknown> = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndStubs[key] = child.map((component) => `<div data-id="${component._id}"></div>`);
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    });

    const fragment: HTMLTemplateElement = this._createDocumentElement('template');
    const template = Handlebars.compile(this.render());
    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => {
          const stub = fragment.content.querySelector(`[data-id="${component._id}"]`);
          const content = component.getContent();

          if (content) {
            stub?.replaceWith(content);
          }
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
        const content = child.getContent();

        if (content) {
          stub?.replaceWith(content);
        }
      }
    });

    return fragment.content;
  }

  _render() {
    this._removeEvents();

    this.beforeRender();

    const block = this._compile();

    const className = this.computeClass();

    if (className) {
      this._element?.setAttribute('class', className);
    }

    if (this._element?.children.length === 0) {
      this._element.appendChild(block);
    } else {
      this._element?.replaceChildren(block);
    }

    this._addEvents();
  }

  render(): string {
    return '';
  }

  beforeRender() {}

  computeClass(): string {
    return this.props.class || '';
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: T) {
    const eventBus = this.eventBus();
    const emitBind = eventBus.emit.bind(eventBus);

    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target: any, prop, value) => {
        const oldProps = cloneDeep(target);

        target[prop] = value;
        emitBind(Block.EVENTS.FLOW_CDU, oldProps, target);

        return true;
      },
      deleteProperty() {
        throw new Error('No right to delete property');
      },
    });
  }

  _createDocumentElement<T extends keyof HTMLElementTagNameMap>(
    tagName: T
  ): HTMLElementTagNameMap[T] {
    return document.createElement(tagName);
  }

  show() {
    const content = this.getContent();

    if (content) {
      content.style.display = 'block';
    }
  }

  hide() {
    const content = this.getContent();

    if (content) {
      content.style.display = 'none';
    }
  }
}
