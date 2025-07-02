import type { Block } from '@/core/block/block';
import type { BlockClass, Props } from '@/core/block/types';

import type { RouteProps, RouteInterface } from './types';

class Route implements RouteInterface {
  _pathname: string | null;

  _blockClass: BlockClass<Props>;

  _block: Block | null;

  _props: RouteProps;

  constructor(pathname: string, blockClass: BlockClass<Props>, props: RouteProps) {
    this._pathname = pathname;
    this._blockClass = blockClass;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      // this._block.hide();
      this._block.dispose();
    }
  }

  match(pathname: string) {
    const cleanPath = pathname.split('?')[0];
    return cleanPath === this._pathname;
  }

  _renderDom(query: string, block: Block) {
    const root = document.querySelector(query);
    const content = block.getContent();

    if (root && content) {
      root.innerHTML = '';
      root.append(content);
    }
  }

  render() {
    // Always dispose the old block before creating a new one
    if (this._block) {
      this._block.dispose();
      this._block = null;
    }
    this._block = new this._blockClass({});
    this._renderDom(this._props.rootQuery, this._block);
    this._block.dispatchComponentDidMount();
    this._block.show();
  }
}

export default Route;
