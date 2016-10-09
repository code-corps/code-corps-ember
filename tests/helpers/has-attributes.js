import QUnit from 'qunit';
/*
  This assertion will compare 2 arrays of attributes.
  It first sorts both arrays and then compares each element.

  @method hasAttributes
  @param {Array} actualAttributes
  @param {Array} expectedAttributes
*/
function compareArrays(actualAttributes, expectedAttributes) {
  expectedAttributes.sort();

  return actualAttributes.sort().every(function(element, index) {
    return element === expectedAttributes[index];
  });
}

QUnit.assert.hasAttributes = function(actualAttributes, expectedAttributes) {
  this.expect(2);

  this.ok(actualAttributes.length === expectedAttributes.length, `should have ${expectedAttributes.length} attributes`);
  this.ok(compareArrays(actualAttributes, expectedAttributes), 'should have the expected attributes');
};
