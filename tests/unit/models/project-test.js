import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('project', 'Unit | Model | project', {
  // Specify the other units that are required for this test.
  needs: ['model:project-category', 'model:organization', 
          'model:organization-membership', 'model:user', 
          'model:post', 'model:project-skill']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('it should has attributes', function(assert) {
  let model = this.subject();
  let attributes = Object.keys(model.toJSON());
  
  assert.ok(attributes.includes('base64IconData'), 'Has base64IconData attribute');
  assert.ok(attributes.includes('closedPostsCount'), 'Has closedPostsCount attribute');
  assert.ok(attributes.includes('description'), 'Has description attribute');
  assert.ok(attributes.includes('iconLargeUrl'), 'Has iconLargeUrl attribute');
  assert.ok(attributes.includes('iconThumbUrl'), 'Has iconThumbUrl attribute');
  assert.ok(attributes.includes('longDescriptionBody'), 'Has longDescriptionBody attribute');
  assert.ok(attributes.includes('longDescriptionMarkdown'), 'Has longDescriptionMarkdown attribute');
  assert.ok(attributes.includes('openPostsCount'), 'Has openPostsCount attribute');
  assert.ok(attributes.includes('slug'), 'Has slug attribute');
  assert.ok(attributes.includes('title'), 'Has title attribute');
});

test('it should has relationships', function(assert) {
  const Project = this.store().modelFor('project');
  const relationships = Ember.get(Project, 'relationshipsByName');
  
  assert.equal(relationships.get('organization').key, 'organization', 'has relationship with organization');
  assert.equal(relationships.get('organization').kind, 'belongsTo', 'kind of relationship is belongsTo');

  assert.equal(relationships.get('posts').key, 'posts', 'has relationship with posts');
  assert.equal(relationships.get('posts').kind, 'hasMany', 'kind of relationship is belongsTo');

  assert.equal(relationships.get('projectCategories').key, 'projectCategories', 'has relationship with projectCategories');
  assert.equal(relationships.get('projectCategories').kind, 'hasMany', 'kind of relationship is belongsTo');

  assert.equal(relationships.get('projectSkills').key, 'projectSkills', 'has relationship with projectSkills');
  assert.equal(relationships.get('projectSkills').kind, 'hasMany', 'kind of relationship is belongsTo');
});

test('it should has open posts', function(assert) {
  const project = this.subject({ openPostsCount: 1 });

  assert.equal(project.get('hasOpenPosts'), true, 'has open posts');
});

test('it should has organization', function(assert) {
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
