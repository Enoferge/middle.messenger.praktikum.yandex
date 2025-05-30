import { EventBus } from '../../services/event-bus/event-bus';
import { cloneDeep } from '../../utils/clone-deep';
import type { Meta, Element, Props } from './types';

export class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  eventBus;

  _element: Element | null = null;
  _meta: Meta | null = null;

  props: Props;

  constructor(tagName = 'div', props = {}) {
    const eventBus = new EventBus();

    this._meta = {
      tagName,
      props,
    };

    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

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
    const { tagName } = this._meta || { tagName: 'div' };
    this._element = this._createDocumentElement(tagName);
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
  }

  _componentDidUpdate(oldProps: Props, newProps: Props) {
    const isPropsChanged = this.componentDidUpdate(oldProps, newProps);

    if (isPropsChanged) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(oldProps: Props, newProps: Props) {
    return true;
  }

  setProps = (nextProps: Props) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    if (this._element) {
      this._element.innerHTML = block;
    }
  }

  render(): string {
    return '';
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: Props) {
    return new Proxy(props, {
      get: (target, prop) => {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        const oldProps = cloneDeep(target);
        target[prop] = value;
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldProps, value);

        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    // TODO: several elements?
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
