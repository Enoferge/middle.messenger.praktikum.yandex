import sinon from 'sinon';
import { expect } from 'chai';

import Router from './router';
import { ROUTER } from './constants';
import { Block } from '../core/block/block';
import type { Props } from '../core/block/types';

describe('Router', () => {
  let router: Router;
  let sandbox: sinon.SinonSandbox;

  class MockPage extends Block {
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

  before(() => {
    (Router as any).__instance = undefined;
    router = Router.getInstance('#app');
  });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    router
      .use(ROUTER.home, MockPage)
      .use(ROUTER.signIn, MockPage)
      .use(ROUTER.signUp, MockPage)
      .use(ROUTER.messenger, MockPage);

    (window as any).store = { getState: () => ({ user: null }) };
  });

  afterEach(() => {
    if (router) {
      router.clearRoutes();
      router.clearCurrentRoute();
    }

    sandbox.restore();
  });

  it('should add a route "home" correctly', () => {
    router.use(ROUTER.home, MockPage);

    const route = router.getRoute(ROUTER.home);

    expect(route?.match(ROUTER.home)).to.be.true;
  });

  it('should update window.location.pathname when going to a sign-in route', () => {
    const signInPath = ROUTER.signIn;

    router.go(signInPath);

    expect(window.location.pathname).to.be.eq(signInPath);
  });

  it('should redirect unauthenticated users to sign-in when accessing protected page', () => {
    const goSpy = sandbox.spy(router, 'go');

    router.go(ROUTER.messenger);

    expect(goSpy.calledWith(ROUTER.signIn)).to.be.true;
  });

  it('should redirect authenticated users to messenger when accessing sign-up', () => {
    (window as any).store = { getState: () => ({ user: { id: 1 } }) };
    const goSpy = sandbox.spy(router, 'go');

    router.go(ROUTER.signUp);

    expect(goSpy.calledWith(ROUTER.messenger)).to.be.true;
  });

  it('should not call go if already on the same pathname', () => {
    window.history.pushState({}, '', ROUTER.home);
    const onRouteSpy = sandbox.spy(router as Router, '_onRoute');

    router.go(ROUTER.home);

    expect(onRouteSpy.called).to.be.false;
  });

  it('should handle browser back button', () => {
    const backSpy = sandbox.spy(router.history, 'back');

    router.back();

    expect(backSpy.calledOnce).to.be.true;
  });

  it('should handle browser forward button', () => {
    const forwardSpy = sandbox.spy(router.history, 'forward');

    router.forward();

    expect(forwardSpy.calledOnce).to.be.true;
  });
});
