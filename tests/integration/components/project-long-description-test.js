import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const {
  Object,
  RSVP,
  Service
} = Ember;

moduleForComponent('project-long-description', 'Integration | Component | project long description', {
  integration: true,
  beforeEach() {
    this.register('service:credentials', Service.extend({}));
  }
});

let credentialsWithAdminMembership = Service.extend({
  currentUserMembership: Object.create({
    isAdmin: true
  })
});

let projectWithDescription = Object.create({
  longDescriptionBody: 'A <strong>body</strong>',
  longDescriptionMarkdown: 'A **body**'
});

let blankProject = Object.create({
  longDescriptionBody: null,
  longDescriptionMarkdown: null
});

test('it renders properly when decription is blank and the user cannot add to it', function(assert) {
  assert.expect(3);

  this.set('project', blankProject);
  this.render(hbs`{{project-long-description project=project}}`);

  assert.equal(this.$('.no-description.user-cannot-add').length, 1, 'The correct element is shown');
  assert.equal(this.$('.editor-with-preview').length, 0, 'The editor is not shown');
  assert.equal(this.$('button[name=save]').length, 0, 'The button to save changes is not shown');
});

test('it renders properly when description is blank and the user can add to it', function(assert) {
  assert.expect(3);

  this.set('project', blankProject);
  this.register('service:credentials', credentialsWithAdminMembership);

  this.render(hbs`{{project-long-description project=project}}`);

  assert.equal(this.$('.no-description.user-can-add').length, 1, 'The correct element is shown');
  assert.equal(this.$('.editor-with-preview').length, 1, 'The editor is shown');
  assert.equal(this.$('button[name=save]').length, 1, 'The button to save changes is shown');
});

test('it renders properly when description is present and user cannot edit', function(assert) {
  assert.expect(6);

  this.set('project', projectWithDescription);

  this.render(hbs`{{project-long-description project=project}}`);

  assert.equal(this.$('.long-description.empty').length, 0, 'The section for empty description is not shown');
  assert.equal(this.$('.editor-with-preview').length, 0, 'The editor is not shown, since we are in read mode');
  assert.equal(this.$('button[name=save]').length, 0, 'The button to save changes is not shown');
  assert.equal(this.$('button[name=edit]').length, 0, 'The button to enter edit mode is not shown');
  assert.ok(this.$('.long-description').text().trim().indexOf('A body') !== -1, 'The body is rendered');
  assert.equal(this.$('.long-description strong:contains("body")').length, 1, 'The body is rendered as html');
});

test('it renders properly when description is present and user can edit', function(assert) {
  assert.expect(4);

  this.set('project', projectWithDescription);
  this.register('service:credentials', credentialsWithAdminMembership);

  this.render(hbs`{{project-long-description project=project}}`);

  assert.equal(this.$('.long-description.empty').length, 0, 'The section for empty description is not shown');
  assert.equal(this.$('.editor-with-preview').length, 0, 'The editor is not shown, since we are in read mode');
  assert.equal(this.$('button[name=save]').length, 0, 'The button to save changes is not shown');
  assert.equal(this.$('button[name=edit]').length, 1, 'The button to enter edit mode is shown');
});

test('it is possible to add a description', function(assert) {
  assert.expect(1);

  let savableProject = Object.create(blankProject, {
    save() {
      assert.ok(true);
      return RSVP.resolve(this);
    }
  });

  this.set('project', savableProject);
  this.register('service:credentials', credentialsWithAdminMembership);

  this.render(hbs`{{project-long-description project=project}}`);

  this.$('button[name=save]').click();
});

test('it is possible to edit a description', function(assert) {
  assert.expect(3);

  let savableProject = Object.create(projectWithDescription, {
    save() {
      assert.ok(true);
      return RSVP.resolve(this);
    }
  });

  this.set('project', savableProject);
  this.register('service:credentials', credentialsWithAdminMembership);

  this.render(hbs`{{project-long-description project=project}}`);
  assert.equal(this.$('.editor-with-preview').length, 0, 'The editor is not shown, since we are in read mode');
  this.$('button[name=edit]').click();
  assert.equal(this.$('.editor-with-preview').length, 1, 'The editor is shown, since we are in edit mode');
  this.$('button[name=save]').click();
});
