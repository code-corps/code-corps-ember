import { isEmpty } from '@ember/utils';
import recordsList from 'code-corps-ember/utils/records-list';
import { module, test } from 'qunit';

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

let uncreatedProject = {
  belongsTo(relationshipName) {
    return { id: `${relationshipName}-1` };
  },
  constructor: {
    modelName: 'project'
  },
  id: null
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

test('find returns a match when the relationship is not there yet', function(assert) {
  let projectSkills = [projectSkill];
  let result = recordsList.find(projectSkills, skill, uncreatedProject);
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

test('includes returns false when there are no records', function(assert) {
  let result = recordsList.includes(null, skill);
  assert.notOk(result);
});
