import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';

import { cloneDeep } from '../../utils/clone-deep';
import { EventBus } from '../event-bus/event-bus';

import type {
  Meta, Element, Props, Children,
} from './types';

export class Block<T extends Props = Props> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  eventBus;

  _element: Element | null = null;

  _isElementHidden = false;

  _id = nanoid(6);

  _meta: Meta | null = null;

  children: Children;

  props: T;

  private _isBatchUpdating = false;

  private _eventWrappers: Record<string, (e: Event) => void> = {};

  constructor(tagName = 'div', propsWithChildren: T = {} as T) {
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
        (tagName ?? 'div') as keyof HTMLElementTagNameMap,
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

  componentDidMount() { }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((component) => component.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  _componentDidUpdate = (...args: unknown[]) => {
    const [oldProps, newProps] = args as [T, T];
    const isPropsChanged = this.componentDidUpdate(oldProps, newProps);

    if (isPropsChanged) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  };

  componentDidUpdate(_oldProps: T, _newProps: T) {
    return true;
  }

  public setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    this._isBatchUpdating = true;
    const oldProps = cloneDeep(this.props);

    Object.assign(this.props, nextProps);

    this._isBatchUpdating = false;
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, this.props);
  };

  public forceUpdate(): void {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  public updateChildren(children: Children): void {
    this.children = children;
  }

  get element() {
    return this._element;
  }

  _addEvents() {
    const events = this.computeEvents ? this.computeEvents() : (this.props.events || {});
    Object.keys(events).forEach((eventName) => {
      if (!this._eventWrappers[eventName]) {
        this._eventWrappers[eventName] = (e: Event) => {
          const currentEvents = this.computeEvents ? this.computeEvents() : (this.props.events || {});
          currentEvents[eventName]?.(e);
        };
      }
      this._element?.addEventListener(eventName, this._eventWrappers[eventName]);
    });
  }

  _removeEvents() {
    Object.keys(this._eventWrappers).forEach((eventName) => {
      this._element?.removeEventListener(eventName, this._eventWrappers[eventName]);
    });
  }

  _replaceStubWithContent(fragment: HTMLTemplateElement, component: Block) {
    const stub = fragment.content.querySelector(`[data-id="${component._id}"]`);
    const content = component.getContent();

    if (content) {
      if (stub) {
        try {
          stub.replaceWith(content);
        } catch (e) {
          if (stub.parentNode) {
            stub.parentNode.replaceChild(content, stub);
          } else {
            fragment.content.appendChild(content);
          }
        }
      }
    }
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
          this._replaceStubWithContent(fragment, component);
        });
      } else {
        this._replaceStubWithContent(fragment, child);
      }
    });

    return fragment.content;
  }

  _render() {
    this._removeEvents();

    const block = this._compile();

    this._applyAttributes();

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

  computeClass(): string {
    return this.props.class || '';
  }

  computeAttrs(): Record<string, unknown> {
    return this.props.attrs || {};
  }

  computeEvents(): Record<string, (e: Event) => void> {
    return this.props.events || {};
  }

  private _applyAttributes() {
    const attrs = this.computeAttrs();

    if (this._element) {
      Array.from(this._element.attributes || []).forEach((attr) => {
        this._element?.removeAttribute(attr.name);
      });

      Object.entries(attrs).forEach(([key, value]) => {
        if (value !== undefined && value !== null && typeof value !== 'object') {
          this._element?.setAttribute(key, String(value));
        }
      });

      if (this._isElementHidden) {
        this._element.style.display = 'none';
      }
    }
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

        if (!this._isBatchUpdating) {
          emitBind(Block.EVENTS.FLOW_CDU, oldProps, target);
        }

        return true;
      },
      deleteProperty() {
        throw new Error('No right to delete property');
      },
    });
  }

  _createDocumentElement<U extends keyof HTMLElementTagNameMap>(
    tagName: U,
  ): HTMLElementTagNameMap[U] {
    return document.createElement(tagName);
  }

  getBlockChild<B extends Block>(child: Block | Block[]): B {
    return Array.isArray(child) ? child[0] as B : child as B;
  }

  show() {
    const content = this.getContent();

    if (content) {
      this._isElementHidden = false;
      content.style.display = 'block';
    }
  }

  hide() {
    const content = this.getContent();

    if (content) {
      this._isElementHidden = true;
      content.style.display = 'none';
    }
  }

  componentWillUnmount() { }

  dispose(): void {
    this.hide();
    this.componentWillUnmount();
    this._removeEvents();

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((c) => c.dispose());
      } else {
        child.dispose();
      }
    });
  }
}
