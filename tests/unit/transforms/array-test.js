import { moduleFor, test } from 'ember-qunit';

moduleFor('transform:array', 'Unit | Transform | array', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

// Replace this with your real tests.
test('it exists', function(assert) {
  let transform = this.subject();
  assert.ok(transform);
});

test('it serializes properly', function(assert) {
  assert.expect(4);

  let transform = this.subject();

  assert.deepEqual(transform.serialize(['a', 'b', 'c', 'd']), ['a', 'b', 'c', 'd'], 'Arrays are serialized into arrays');
  assert.deepEqual(transform.serialize('a, b , c, d'), ['a', 'b', 'c', 'd'], 'Strings of items with "," separaters are serialized into arrays with the items trimmed');
  assert.deepEqual(transform.serialize(1), [], 'Numbers are serialized into an empty array');
  assert.deepEqual(transform.serialize(true), [], 'Booleans are serialized into an empty array');
});

test('it deserializes properly', function(assert) {
  assert.expect(2);

  let transform = this.subject();

  assert.deepEqual(transform.deserialize([1, 2, 3]), [1, 2, 3], 'Arrays get deserialized into arrays');
  assert.deepEqual(transform.deserialize('a,b,c'), [], 'Anything else just becomes an empty array');
});
