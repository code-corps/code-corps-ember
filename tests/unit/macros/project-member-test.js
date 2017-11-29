import projectMember from 'code-corps-ember/macros/project-member';
import compute from 'ember-macro-test-helpers/compute';
import { module, test } from 'qunit';

module('Unit | Macro | project member');

let user1 = { id: 1 };
let user2 = { id: 2 };
let user3 = { id: 3 };

let user1Relationship = {
  id() {
    return user1.id;
  }
};

let user2Relationship = {
  id() {
    return user2.id;
  }
};

let projectUsers = [
  {
    belongsTo() {
      return user1Relationship;
    },
    user: user1
  },
  {
    belongsTo() {
      return user2Relationship;
    },
    user: user2
  }
];

test('it returns the project user if the user is in the project users', function(assert) {
  compute({
    assert,
    computed: projectMember('projectUsers', 'user'),
    properties: {
      projectUsers,
      user: user1
    },
    deepEqual: projectUsers[0]
  });
});

test('it returns `undefined` if the user is not in the project users', function(assert) {
  compute({
    assert,
    computed: projectMember('projectUsers', 'user'),
    properties: {
      projectUsers,
      user: user3
    },
    equal: undefined
  });
});

test('it returns `undefined` if the user id is empty', function(assert) {
  compute({
    assert,
    computed: projectMember('projectUsers', 'user'),
    properties: {
      projectUsers,
      user: { id: null }
    },
    equal: undefined
  });
});
