import Ember from 'ember';
import recordsList from 'code-corps-ember/utils/records-list';
import { module, test } from 'qunit';

const { isEmpty } = Ember;

module('Unit | Utility | records-list');

let projectSkill = {
  belongsTo(relationshipName) {
    return {
      id() {
        return `${relationshipName}-1`;
      }
    };
  },
  constructor: {
    modelName: 'project-skill'
  },
  id: 'project-skill-1'
};

let project = {
  belongsTo(relationshipName) {
    return { id: `${relationshipName}-1` };
  },
  constructor: {
    modelName: 'project'
  },
  id: 'project-1'
};

let skill = {
  belongsTo(relationshipName) {
    return { id: `${relationshipName}-1` };
  },
  content: {
    constructor: {
      modelName: 'skill'
    }
  },
  id: 'skill-1'
};

test('find returns a match correctly', function(assert) {
  let projectSkills = [projectSkill];
  let result = recordsList.find(projectSkills, skill, project);
  assert.equal(projectSkill, result);
});

test('find returns no match correctly', function(assert) {
  let result = recordsList.find([], skill, project);
  assert.ok(isEmpty(result));
});

test('includes returns true when there is a match', function(assert) {
  let projectSkills = [projectSkill];
  let result = recordsList.includes(projectSkills, skill);
  assert.ok(result);
});

test('includes returns false when there is no match', function(assert) {
  let result = recordsList.includes([], skill);
  assert.notOk(result);
});
