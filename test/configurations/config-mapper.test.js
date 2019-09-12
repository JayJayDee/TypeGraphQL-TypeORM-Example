const { read } = require('../../src/configurations/config-mappers');
const { expect } = require('chai');

describe('the read() function tests', () => {
  it('if value not exist and rule was mandantory, must throw the exception', () => {
    const source = {};
    const reader = read(source);

    expect(() => {
      reader({
        key: 'test',
        mandantory: true
      });
    }).to.throw();
  });

  it('if value was exist and rule was mandantory, must returns the value', () => {
    const source = {
      test: 'test-value'
    };
    const reader = read(source);
    const value = reader({
      key: 'test',
      mandantory: true
    });
    expect('test-value').to.equal(value);
  });
});