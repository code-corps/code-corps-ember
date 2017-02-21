import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/editor-with-preview';
import { initialize as initializeKeyboard } from 'ember-keyboard';

const {
  Object,
  RSVP
} = Ember;

let mockPreview = Object.create({
  markdown: 'A **body**',
  body: 'A <strong>body</strong>',
  save() {
    return RSVP.resolve(this);
  }
});

let mockStore = {
  createRecord() {
    return mockPreview;
  }
};

let mockMentionFetcher = {
  fetchBodyWithMentions() {
    return RSVP.resolve('Lorem ipsum <strong>bla</strong>');
  }
};

let page = PageObject.create(component);

moduleForComponent('editor-with-preview', 'Integration | Component | editor with preview', {
  integration: true,
  beforeEach() {
    stubService(this, 'store', mockStore);
    stubService(this, 'mention-fetcher', mockMentionFetcher);
    page.setContext(this);
    initializeKeyboard();
  },
  afterEach() {
    page.removeContext();
  }
});

test('it binds to the editor text correctly', function(assert) {
  assert.expect(1);
  page.render(hbs`{{editor-with-preview input='Random input'}}`);
  assert.equal(page.textarea.value, 'Random input', 'The text area is rendered with correct content');
});

test('user can switch between editing and preview mode', function(assert) {
  assert.expect(3);
  page.render(hbs`{{editor-with-preview}}`);
  assert.ok(page.isEditing, 'The component is rendered in editing mode initially');
  page.clickPreview();
  assert.ok(page.isPreviewing, 'The component switches to preview mode');
  page.clickEdit();
  assert.ok(page.isEditing, 'The component switches to edit mode');
});

test('It renders the preview tab with proper content when clicking the preview button', function(assert) {
  assert.expect(1);
  page.render(hbs`{{editor-with-preview input='test' generatePreview='generatePreview'}}`);
  page.clickPreview();
  assert.equal(page.bodyPreview.text, 'Lorem ipsum bla');
});

test('it renders the preview tab with no content message when input is blank when clicking the preview button', function(assert) {
  assert.expect(1);
  page.render(hbs`{{editor-with-preview input='' generatePreview='generatePreview'}}`);
  page.clickPreview();
  assert.equal(page.bodyPreview.text, 'Nothing to preview.');
});

test('it has a spinner when loading', function(assert) {
  assert.expect(1);

  this.set('isLoading', true);
  page.render(hbs`{{editor-with-preview isLoading=isLoading}}`);

  assert.ok(page.spinnerIsVisible);
});

test('it has no spinner when not loading', function(assert) {
  assert.expect(1);

  this.set('isLoading', false);
  page.render(hbs`{{editor-with-preview isLoading=isLoading}}`);

  assert.notOk(page.spinnerIsVisible);
});

test('it sets the edit button class when editing', function(assert) {
  assert.expect(1);

  page.render(hbs`{{editor-with-preview}}`);
  this.set('editing', true);

  assert.ok(page.editButton.isActive);
});

test('it has the code theme selector', function(assert) {
  assert.expect(1);

  page.render(hbs`{{editor-with-preview}}`);

  assert.ok(page.codeThemeSelector.isVisible);
});

test('it has a placeholder when provided', function(assert) {
  assert.expect(1);

  this.set('placeholder', 'Placeholder text');
  page.render(hbs`{{editor-with-preview placeholder=placeholder}}`);

  assert.equal(page.textarea.placeholder, 'Placeholder text');
});

test('it does not autofocus on first load if not provided', function(assert) {
  assert.expect(1);

  page.render(hbs`{{editor-with-preview}}`);

  assert.notOk(page.textarea.isFocused);
});

test('it autofocuses on second render if not provided', function(assert) {
  assert.expect(1);

  page.render(hbs`{{editor-with-preview}}`);
  page.clickPreview();
  page.clickEdit();

  assert.ok(page.textarea.isFocused);
});

test('it autofocuses on first load if provided', function(assert) {
  assert.expect(1);

  this.set('autofocus', true);
  page.render(hbs`{{editor-with-preview autofocus=autofocus}}`);

  assert.ok(page.textarea.isFocused);
});

test('it sets the editor min-height to the editor height when previewing and still loading', function(assert) {
  assert.expect(1);

  this.set('isLoading', true);
  page.render(hbs`{{editor-with-preview isLoading=isLoading}}`);

  let height = this.$('.editor-with-preview').css('height');

  page.clickPreview();

  assert.equal(page.style, `min-height: ${height};`);
});

test('it clears the editor style when previewing and done loading', function(assert) {
  assert.expect(2);

  this.set('isLoading', true);
  page.render(hbs`{{editor-with-preview isLoading=isLoading}}`);

  page.clickPreview();
  assert.ok(page.style);

  this.set('isLoading', false);
  assert.notOk(page.style);
});

test('it sends the modifiedSubmit action with ctrl/cmd + enter', function(assert) {
  assert.expect(1);

  this.on('modifiedSubmit', () => {
    assert.equal(page.textarea.value, '', 'Action was called, input is unchanged.');
  });

  page.render(hbs`{{editor-with-preview modifiedSubmit="modifiedSubmit"}}`);

  page.textarea.keySubmit();
});
