const db = require('../api/services/postgres/db');

var assert = require('chai').assert;

describe('DB', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
  describe('#indexOf()', function() {
    it('should return 1 when the value is 2', function() {
      assert.equal([1, 2, 3].indexOf(2), 1);
    });
  });
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(0), -1);
    });
  });
});
