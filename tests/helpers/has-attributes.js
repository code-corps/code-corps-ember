import QUnit from 'qunit';

function compareArrays(attributes, attributesToTest){
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
