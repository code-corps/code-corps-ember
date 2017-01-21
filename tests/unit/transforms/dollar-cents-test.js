import { moduleFor, test } from 'ember-qunit';

moduleFor('transform:dollar-cents', 'Unit | Transform | dollar-cents', {});

test('it turns integer into correct float value when deserializing', function(assert) {
  assert.expect(1);
  let value = this.subject().deserialize(1000);
  assert.equal(value, 10.0);
});

test('it turns float into correct integer value when serializing', function(assert) {
  assert.expect(1);

  let value = this.subject().serialize(10.25);
  assert.equal(value, 1025);
});
