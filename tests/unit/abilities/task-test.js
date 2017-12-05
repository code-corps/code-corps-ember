import { set, get } from '@ember/object';
import { moduleFor, test } from 'ember-qunit';
import projectUser from 'code-corps-ember/tests/helpers/project-user';

moduleFor('ability:task', 'Unit | Ability | task', {
  needs: [
    'service:current-user',
    'service:session'
  ]
});

// users of different roles
let author = { id: 'author' };
let other = { id: 'other' };
let pending = { id: 'pending' };
let contributor = { id: 'contributor' };
let admin = { id: 'admin' };
let owner = { id: 'owner' };

// the task model
let model = {
  user: author,
  project: {
    owner,
    projectUsers: [
      projectUser(pending, 'pending'),
      projectUser(contributor, 'contributor'),
      projectUser(admin, 'admin'),
      projectUser(owner, 'owner')
    ]
  }
};

test('canEdit works properly', function(assert) {
  let ability = this.subject({ model });

  set(ability, 'currentUser', { user: null  });
  assert.notOk(get(ability, 'canEdit'), 'Unauthenticated users cannot edit.');

  set(ability, 'currentUser', { user: author  });
  assert.ok(get(ability, 'canEdit'), 'Authors can edit.');

  set(ability, 'currentUser', { user: other  });
  assert.notOk(get(ability, 'canEdit'), 'Users not associated with task or project cannot edit.');

  set(ability, 'currentUser', { user: pending  });
  assert.notOk(get(ability, 'canEdit'), 'Pending project members cannot edit.');

  set(ability, 'currentUser', { user: contributor  });
  assert.notOk(get(ability, 'canEdit'), 'Contributor project members cannot edit.');

  set(ability, 'currentUser', { user: admin  });
  assert.ok(get(ability, 'canEdit'), 'Admin project members can edit.');

  set(ability, 'currentUser', { user: owner  });
  assert.ok(get(ability, 'canEdit'), 'Owners can edit.');
});

test('canAssign works properly', function(assert) {
  let ability = this.subject({ model });

  set(ability, 'currentUser', { user: null  });
  assert.notOk(get(ability, 'canAssign'), 'Unauthenticated users cannot assign.');

  set(ability, 'currentUser', { user: author  });
  assert.ok(get(ability, 'canAssign'), 'Authors can assign.');

  set(ability, 'currentUser', { user: other  });
  assert.notOk(get(ability, 'canAssign'), 'Users not associated with task or project cannot assign.');

  set(ability, 'currentUser', { user: pending  });
  assert.notOk(get(ability, 'canAssign'), 'Pending project members cannot assign.');

  set(ability, 'currentUser', { user: contributor  });
  assert.ok(get(ability, 'canAssign'), 'Contributor project members can assign.');

  set(ability, 'currentUser', { user: admin  });
  assert.ok(get(ability, 'canAssign'), 'Admin project members can assign.');

  set(ability, 'currentUser', { user: owner  });
  assert.ok(get(ability, 'canAssign'), 'Owners can assign.');
});

test('canReposition works properly', function(assert) {
  let ability = this.subject({ model });

  set(ability, 'currentUser', { user: null  });
  assert.notOk(get(ability, 'canReposition'), 'Unauthenticated users cannot reposition.');

  set(ability, 'currentUser', { user: author  });
  assert.ok(get(ability, 'canReposition'), 'Authors can reposition.');

  set(ability, 'currentUser', { user: other  });
  assert.notOk(get(ability, 'canReposition'), 'Users not associated with task or project cannot reposition.');

  set(ability, 'currentUser', { user: pending  });
  assert.notOk(get(ability, 'canReposition'), 'Pending project members cannot reposition.');

  set(ability, 'currentUser', { user: contributor  });
  assert.ok(get(ability, 'canReposition'), 'Contributor project members can reposition.');

  set(ability, 'currentUser', { user: admin  });
  assert.ok(get(ability, 'canReposition'), 'Admin project members can reposition.');

  set(ability, 'currentUser', { user: owner  });
  assert.ok(get(ability, 'canReposition'), 'Owners can reposition.');
});
