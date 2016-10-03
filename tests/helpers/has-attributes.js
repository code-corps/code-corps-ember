import QUnit from 'qunit';

/**
  Creates a custom QUnit Assertion.
  This assertion will compare 2 arrays of attributes.

  @method hasAttributes
  @param {Array} attributes
  @param {Array} attributesToTest
*/
function compareArrays(attributes, attributesToTest) {
  attributesToTest.sort();

  return attributes.sort().every(function(element, index) {
    return element === attributesToTest[index]; 
  });
}

QUnit.assert.hasAttributes = function(attributes, attributesToTest) {
  this.expect(2);

  this.ok(attributes.length === attributesToTest.length, `should have ${attributesToTest.length} attributes`);
  this.ok(compareArrays(attributes, attributesToTest), 'should have the expected attributes');
};
