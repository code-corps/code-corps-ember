import { merge } from '@ember/polyfills';
import RSVP from 'rsvp';
import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/project-long-description';
import projectUser from 'code-corps-ember/tests/helpers/project-user';

let page = PageObject.create(component);

moduleForComponent('project-long-description', 'Integration | Component | project long description', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

let owner = { id: 'owner' };

let projectWithDescription = {
  longDescriptionBody: 'A <strong>body</strong>',
  longDescriptionMarkdown: 'A **body**',
  projectUsers: [projectUser(owner)]
};

let projectWithListedDescription = {
  longDescriptionBody: 'Todo list: <ul><li>list item 1</li></ul>',
  longDescriptionMarkdown: 'Todo list: \n *   list item 1',
  projectUsers: [projectUser(owner)]
};

let blankProject = {
  longDescriptionBody: null,
  longDescriptionMarkdown: null,
  projectUsers: [projectUser(owner)]
};

test('it renders properly when decription is blank and the user cannot add to it', function(assert) {
  assert.expect(3);

  set(this, 'project', blankProject);
  this.render(hbs`{{project-long-description project=project}}`);

  assert.ok(page.noDescription.cannotAdd, 'The correct element is shown');
  assert.notOk(page.editorWithPreview.isVisible, 'The editor is not shown');
  assert.notOk(page.save.isVisible, 'The button to save changes is not shown');
});

test('it renders properly when description is blank and the user can add to it', function(assert) {
  assert.expect(3);

  set(this, 'project', blankProject);
  stubService(this, 'current-user', { user: owner });

  this.render(hbs`{{project-long-description project=project}}`);

  assert.ok(page.noDescription.canAdd, 'The correct element is shown');
  assert.ok(page.editorWithPreview.isVisible, 'The editor is shown');
  assert.ok(page.save.isVisible, 'The button to save changes is shown');
});

test('it renders properly when description is present and user cannot edit', function(assert) {
  assert.expect(6);

  set(this, 'project', projectWithDescription);

  this.render(hbs`{{project-long-description project=project}}`);

  assert.notOk(page.longDescription.isEmpty, 'The section for empty description is not shown');
  assert.notOk(page.editorWithPreview.isVisible, 'The editor is not shown, since we are in read mode');
  assert.notOk(page.save.isVisible, 'The button to save changes is not shown');
  assert.notOk(page.edit.isVisible, 'The button to enter edit mode is not shown');
  assert.ok(page.longDescription.text.indexOf('A body') !== -1, 'The body is rendered');
  assert.equal(page.longDescription.strong.text, 'body', 'The body is rendered as html');
});

test('it renders properly when description is present and user can edit', function(assert) {
  assert.expect(4);

  set(this, 'project', projectWithDescription);
  stubService(this, 'current-user', { user: owner });

  this.render(hbs`{{project-long-description project=project}}`);

  assert.notOk(page.longDescription.isEmpty, 'The section for empty description is not shown');
  assert.notOk(page.editorWithPreview.isVisible, 'The editor is not shown, since we are in read mode');
  assert.notOk(page.save.isVisible, 'The button to save changes is not shown');
  assert.ok(page.edit.isVisible, 'The button to enter edit mode is shown');
});

test('it is possible to add a description', function(assert) {
  assert.expect(1);

  let savable = {
    save() {
      assert.ok(true);
      return RSVP.resolve(this);
    }
  };

  let savableProject = merge(blankProject, savable);

  set(this, 'project', savableProject);
  stubService(this, 'current-user', { user: owner });

  this.render(hbs`{{project-long-description project=project}}`);

  page.save.click();
});

test('it is possible to edit a description', function(assert) {
  assert.expect(3);

  let savable = {
    save() {
      assert.ok(true);
      return RSVP.resolve(this);
    }
  };

  let savableProject = merge(projectWithDescription, savable);

  set(this, 'project', savableProject);
  stubService(this, 'current-user', { user: owner });

  this.render(hbs`{{project-long-description project=project}}`);

  assert.notOk(page.editorWithPreview.isVisible, 'The editor is not shown, since we are in read mode');
  page.edit.click();
  assert.ok(page.editorWithPreview.isVisible, 'The editor is shown, since we are in edit mode');
  page.save.click();
});

test('it renders list items in the description with bullet points', function(assert) {
  assert.expect(2);

  set(this, 'project', projectWithListedDescription);
  this.render(hbs`{{project-long-description project=project}}`);

  assert.equal(page.longDescription.list.listItem.text, 'list item 1', 'the description text shows the list');
  assert.equal(this.$('li').css('listStyleType'), 'disc', 'list in description text is displayed with bullet points');
});
