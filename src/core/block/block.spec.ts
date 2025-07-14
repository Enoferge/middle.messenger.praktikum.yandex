import sinon from 'sinon';
import { expect } from 'chai';

import { Block } from './block';
import type { BlockClass, Props } from './types';

describe('Block', () => {
  let PageComponent: BlockClass<Props>;

  before(() => {
    class Page extends Block {
      constructor(props: Props) {
        super('div', props);
      }

      render() {
        return `<div>
                    <span id="test-text">{{text}}</span>
                    <button>{{text-button}}</button>
                </div>`;
      }
    }

    PageComponent = Page;
  });

  it('should create component with state from constructor props', () => {
    const text = 'Hello there';

    const pageComponent = new PageComponent({ text });

    const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

    expect(spanText).to.be.eq(text);
  });

  it('should support props reactivity', () => {
    const newValue = 'New value';

    const pageComponent = new PageComponent({ text: 'Hello' });

    pageComponent.setProps({ text: newValue });
    const spanText = pageComponent.element?.querySelector('#test-text')?.innerHTML;

    expect(spanText).to.be.eq(newValue);
  });

  it('should support events', () => {
    const clickhadnlerStub = sinon.stub();
    const pageComponent = new PageComponent({
      events: {
        click: clickhadnlerStub,
      },
    });

    const event = new MouseEvent('click');
    pageComponent.element?.dispatchEvent(event);

    expect(clickhadnlerStub.calledOnce).to.be.true;
  });

  it('should force update component', () => {
    const pageComponent = new PageComponent({ text: 'Initial' });
    const element = pageComponent.getContent();

    const spanElement = element?.querySelector('#test-text');
    if (spanElement) {
      spanElement.innerHTML = 'Stale text';
    }

    pageComponent.forceUpdate();

    const updatedSpanText = element?.querySelector('#test-text')?.innerHTML;
    expect(updatedSpanText).to.be.eq('Initial');
  });

  it('should show component', () => {
    const pageComponent = new PageComponent({ text: 'Test' });
    const element = pageComponent.getContent();

    pageComponent.show();
    expect(element?.style.display).to.be.eq('block');
  });

  it('should hide component', () => {
    const pageComponent = new PageComponent({ text: 'Test' });
    const element = pageComponent.getContent();

    pageComponent.hide();
    expect(element?.style.display).to.be.eq('none');
  });
});
