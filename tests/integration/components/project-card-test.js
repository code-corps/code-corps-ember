import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'code-corps-ember/tests/helpers/stub-service';

const {
  set
} = Ember;

moduleForComponent('project-card', 'Integration | Component | project card', {
  integration: true
});

let user = {
  isLoaded: true,
  photoThumbUrl: 'http://lorempixel.com/25/25/'
};

let organization = {
  name: 'Test Organization',
  organizationMemberships: [
    {
      member: user
    }
  ]
};

let project = {
  description: 'Test description',
  iconLargeUrl: 'http://lorempixel.com/500/500/',
  organization,
  projectCategories: [
    {
      title: 'Test category'
    }
  ],
  title: 'Test Project'
};

test('it renders', function(assert) {
  assert.expect(8);

  stubService(this, 'user-categories', { findUserCategory() {} });

  set(this, 'project', project);
  this.render(hbs`{{project-card project=project}}`);

  assert.equal(this.$('.icon-container img').attr('src'), project.iconLargeUrl);
  assert.equal(this.$('.details-container h4').text().trim(), project.title);
  assert.equal(this.$('p.organization').text().trim(), `by ${organization.name}`);
  assert.equal(this.$('ul.categories li').length, 1);
  assert.equal(this.$('p.description').text().trim(), project.description);
  assert.equal(this.$('.project-card-skills').length, 1);
  assert.equal(this.$('ul.project-card-members li').length, 1);
  assert.equal(this.$('ul.project-card-members li:first img').attr('src'), user.photoThumbUrl);
});

test('it renders the right icon when the user is not loaded', function(assert) {
  assert.expect(1);

  set(user, 'isLoaded', false);
  stubService(this, 'user-categories', { findUserCategory() {} });

  set(this, 'project', project);
  this.render(hbs`{{project-card project=project}}`);

  assert.equal(this.$('ul.project-card-members li:first img').length, 0);
});
