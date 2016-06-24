import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('ability:post', 'Unit | Ability | post', {
});

test('it can edit post if user is the post author', function(assert) {
  let ability = this.subject({
    model: Ember.Object.create({ user: Ember.Object.create({ id: 1 }) }),
    currentUser: Ember.Object.create({ user: Ember.Object.create({ id: 1 }) })
  });
  assert.ok(ability.get('canEdit'));
});

test('it cannot edit post if user is not the post author', function(assert) {
  let ability = this.subject({
    model: Ember.Object.create({ user: Ember.Object.create({ id: 1 }) }),
    currentUser: Ember.Object.create({ user: Ember.Object.create({ id: 2 }) })
  });
  assert.notOk(ability.get('canEdit'));
});

test('it can edit post if user is at least admin in organization', function(assert) {
  let ability = this.subject({
    credentials: Ember.Object.create({
      currentUserMembership: Ember.Object.create({ isAdmin: true })
    }),
  });
  assert.ok(ability.get('canEdit'));
});

test('it cannot edit post if user is not at least admin in organization', function(assert) {
  let ability = this.subject({
    credentials: Ember.Object.create({
      currentUserMembership: Ember.Object.create({ isAdmin: false }),
    }),
  });
  assert.notOk(ability.get('canEdit'));
});

