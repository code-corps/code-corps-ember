import { moduleFor, test } from 'ember-qunit';
import stubService from 'code-corps-ember/tests/helpers/stub-service';

moduleFor('ability:project', 'Unit | Ability | project', {
  needs: ['service:credentials']
});

test('it allows managing donation goals if user is owner of project organization', function(assert) {
  assert.expect(1);

  let ability = this.subject();

  stubService(this, 'credentials', { currentUserMembership: { isOwner: true } });

  assert.ok(ability.get('canManageDonationGoals'));
});

test('it allows managing donation goals if user is not owner of project organization', function(assert) {
  assert.expect(1);

  let ability = this.subject();

  stubService(this, 'credentials', { currentUserMembership: { isOwner: false } });

  assert.notOk(ability.get('canManageDonationGoals'));
});
