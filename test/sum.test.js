/* eslint-disable no-undef */
const chai = require('chai');

const { expect } = chai;
const sum = require('../utils/sum');

describe('Testing sum.js', () => {
  it('return must be 5', () => {
    expect(sum(2, 3)).to.equal(5);
  });
});
