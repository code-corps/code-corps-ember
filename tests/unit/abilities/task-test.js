import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

const { Object } = Ember;

moduleFor('ability:task', 'Unit | Ability | task', { });

test('it can edit task if user is the task author', function(assert) {
  let ability = this.subject({
    model: Object.create({ user: Object.create({ id: 1 }) }),
    currentUser: Object.create({ user: Object.create({ id: 1 }) })
  });
  assert.ok(ability.get('canEdit'));
});

test('it cannot edit task if user is not the task author', function(assert) {
  let ability = this.subject({
    model: Object.create({ user: Object.create({ id: 1 }) }),
    currentUser: Object.create({ user: Object.create({ id: 2 }) })
  });
  assert.notOk(ability.get('canEdit'));
});

test('it can edit task if user is at least admin in organization', function(assert) {
  let ability = this.subject({
    credentials: Object.create({
      currentUserMembership: Object.create({ isAdmin: true })
    })
  });
  assert.ok(ability.get('canEdit'));
});

test('it cannot edit task if user is not at least admin in organization', function(assert) {
  let ability = this.subject({
    credentials: Object.create({
      currentUserMembership: Object.create({ isAdmin: false })
    })
  });
  assert.notOk(ability.get('canEdit'));
});
