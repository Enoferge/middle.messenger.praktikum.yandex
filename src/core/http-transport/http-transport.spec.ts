import sinon from 'sinon';
import { expect } from 'chai';

import { HTTPTransport } from './http-transport';

(global as any).ProgressEvent = function ProgressEvent(type: string) {
  this.type = type;
};

describe('Http Transport', () => {
  let openSpy: sinon.SinonSpy;
  let sendSpy: sinon.SinonSpy;
  let sandbox: sinon.SinonSandbox;
  let http: HTTPTransport;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    openSpy = sandbox.spy(XMLHttpRequest.prototype, 'open');
    sendSpy = sandbox.spy(XMLHttpRequest.prototype, 'send');

    http = new HTTPTransport('/test');
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should build correct url with api path and request path', () => {
    http.get('/path');

    const urlArg = openSpy.getCall(0).args[1];
    expect(urlArg).to.include('/test/path');
  });

  it('should stringify query object for GET request', () => {
    http.get('/path', { data: { userId: 1, chatId: 13 } });

    const urlArg = openSpy.getCall(0).args[1];
    expect(urlArg).to.include('/path?userId=1&chatId=13');
  });

  it('should send POST request', () => {
    http.post('/path', { data: { userId: 1 } });

    expect(openSpy.calledWith('POST')).to.be.true;
  });

  it('should send POST request with correct JSON body', () => {
    const requestData = { userName: 'enoferge', chatId: 13 };

    http.post('/path', { data: requestData });

    expect(sendSpy.calledWith(JSON.stringify(requestData))).to.be.true;
  });

  it('should set custom headers', () => {
    const requestHeaderSpy = sandbox.spy(XMLHttpRequest.prototype, 'setRequestHeader');

    http.get('/path', { headers: { 'X-Test-Header': 'value' } });

    expect(requestHeaderSpy.calledWith('X-Test-Header', 'value')).to.be.true;

    requestHeaderSpy.restore();
  });

  it('should reject promise on network error', async () => {
    const xhrErrorStub = sinon.stub(global, 'XMLHttpRequest').callsFake(function (this: XMLHttpRequest) {
      this.open = sinon.stub().callsFake(() => {});
      this.send = function () {
        setTimeout(() => this.onerror?.(new ProgressEvent('error')), 0);
      };
      this.setRequestHeader = sinon.stub();
      this.withCredentials = true;
      this.timeout = 5000;
    });

    http = new HTTPTransport('/test');
    let isErrorCaught = false;

    try {
      await http.get('/path');
    } catch (e) {
      isErrorCaught = true;
    }

    expect(isErrorCaught).to.be.true;

    xhrErrorStub.restore();
  });
});
