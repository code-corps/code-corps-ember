import { test } from 'ember-qunit';
import Ember from 'ember';

const { get } = Ember;

// source: https://gist.github.com/he9qi/b6354a81a0672dc63294
export function testForHasMany(name, many) {
  test(`should have many ${many}`, function(assert) {
    assert.expect(2);
    let Model = this.store().modelFor(name);
    let relationship = get(Model, 'relationshipsByName').get(many);

    assert.equal(relationship.key, many, `has relationship with ${many}`);
    assert.equal(relationship.kind, 'hasMany', 'kind of relationship is hasMany');
  });
}

export function testForBelongsTo(name, belongsTo) {
  test(`should belong to ${belongsTo}`, function(assert) {
    assert.expect(2);
    let Model = this.store().modelFor(name);
    let relationship = get(Model, 'relationshipsByName').get(belongsTo);

    assert.equal(relationship.key, belongsTo, `has relationship with ${belongsTo}`);
    assert.equal(relationship.kind, 'belongsTo', 'kind of relationship is belongsTo');
  });
}
