import { set, get } from '@ember/object';
import { moduleFor, test } from 'ember-qunit';
import projectUser from 'code-corps-ember/tests/helpers/project-user';

let owner = { id: 'owner' };
let other = { id: 'other' };
let project = {
  projectUsers: [projectUser(owner)]
};

moduleFor('ability:project', 'Unit | Ability | project', {
  needs: [
    'service:current-user',
    'service:metrics',
    'service:session'
  ]
});

test('it allows managing if user is owner of project', function(assert) {
  assert.expect(1);

  let ability = this.subject();
  set(ability, 'model', project);
  set(ability, 'currentUser', { user: owner });

  assert.ok(get(ability, 'canManage'));
});

test('it allows managing donation goals if user is not owner of project organization', function(assert) {
  assert.expect(1);

  let ability = this.subject();
  set(ability, 'model', project);
  set(ability, 'currentUser', { user: other });

  assert.notOk(get(ability, 'canManage'));
});
