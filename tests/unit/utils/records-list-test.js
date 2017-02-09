import Ember from 'ember';
import recordsList from 'code-corps-ember/utils/records-list';
import { module, test } from 'qunit';

const { isEmpty, Object } = Ember;

module('Unit | Utility | skills-list');

let projectSkill = Object.create({
  belongsTo(relationshipName) {
    return Object.create({
      id() {
        return `${relationshipName}-1`;
      }
    });
  },
  constructor: {
    modelName: 'project-skill'
  },
  id: 'project-skill-1'
});

let project = Object.create({
  belongsTo(relationshipName) {
    return { id: `${relationshipName}-1` };
  },
  constructor: {
    modelName: 'project'
  },
  id: 'project-1'
});

let skill = Object.create({
  belongsTo(relationshipName) {
    return { id: `${relationshipName}-1` };
  },
  content: {
    constructor: {
      modelName: 'skill'
    }
  },
  id: 'skill-1'
});

test('find returns a match correctly', function(assert) {
  let projectSkills = [projectSkill];
  let result = recordsList.find(projectSkills, skill, project);
  assert.equal(projectSkill, result);
});

test('find returns no match correctly', function(assert) {
  let result = recordsList.find([], skill, project);
  assert.ok(isEmpty(result));
});

test('contains returns true when there is a match', function(assert) {
  let projectSkills = [projectSkill];
  let result = recordsList.contains(projectSkills, skill);
  assert.ok(result);
});

test('contains returns false when there is no match', function(assert) {
  let result = recordsList.contains([], skill);
  assert.notOk(result);
});
