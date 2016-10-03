import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';
import '../../helpers/has-attributes';

moduleForModel('project', 'Unit | Model | project', {
  // Specify the other units that are required for this test.
  needs: ['model:project-category', 'model:organization', 
          'model:organization-membership', 'model:user', 
          'model:task', 'model:project-skill']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it should have all of its attributes', function(assert) {
  let model = this.subject();
  let attributes = Object.keys(model.toJSON());
  let attributesToTest = [
    "base64IconData",
    "description",
    "iconLargeUrl",
    "openTasksCount",
    "iconThumbUrl",
    "longDescriptionBody",
    "longDescriptionMarkdown",
    "organization",
    "slug",
    "closedTasksCount",
    "title",
  ];

  assert.hasAttributes(attributes, attributesToTest);
});

test('it should have relationships', function(assert) {
  let Project = this.store().modelFor('project');
  let relationships = Ember.get(Project, 'relationshipsByName');
  
  assert.equal(relationships.get('organization').key, 'organization', 'has relationship with organization');
  assert.equal(relationships.get('organization').kind, 'belongsTo', 'kind of relationship is belongsTo');

  assert.equal(relationships.get('tasks').key, 'tasks', 'has relationship with tasks');
  assert.equal(relationships.get('tasks').kind, 'hasMany', 'kind of relationship is hasMany');

  assert.equal(relationships.get('projectCategories').key, 'projectCategories', 'has relationship with projectCategories');
  assert.equal(relationships.get('projectCategories').kind, 'hasMany', 'kind of relationship is hasMany');

  assert.equal(relationships.get('projectSkills').key, 'projectSkills', 'has relationship with projectSkills');
  assert.equal(relationships.get('projectSkills').kind, 'hasMany', 'kind of relationship is hasMany');
});

test('it should have open tasks', function(assert) {
  let project = this.subject({ openTasksCount: 1 });

  assert.equal(project.get('hasOpenTasks'), true, 'has open tasks');
});

test('it should have organization', function(assert) {
  let _this = this,
      project;

  Ember.run(function(){
    let organization = _this.store().createRecord('organization');
    _this.store().createRecord('organization-membership', { organization: organization, role: 'pending'});

    project = _this.subject({ organization: organization });
  });

  assert.equal(project.get('pendingMembersCount'), 1, 'pendingMembersCount should return 1');
  assert.equal(project.get('hasPendingMembers'), true, 'hasPendingMembers should return true');
});
