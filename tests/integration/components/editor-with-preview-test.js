import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  $,
  Object,
  RSVP,
  Service
} = Ember;

let mockPreview = Object.create({
  markdown: 'A **body**',
  body: 'A <strong>body</strong>',
  save() {
    return RSVP.resolve(this);
  }
});

let mockStore = Service.extend({
  createRecord() {
    return mockPreview;
  }
});

let mockMentionFetcher = Service.extend({
  fetchBodyWithMentions() {
    return RSVP.resolve('Lorem ipsum <strong>bla</strong>');
  }
});

moduleForComponent('editor-with-preview', 'Integration | Component | editor with preview', {
  integration: true,
  beforeEach() {
    this.register('service:store', mockStore);
    this.register('service:mention-fetcher', mockMentionFetcher);
  }
});

let pressCtrlEnter = $.Event('keydown', {
  keyCode: 13,
  which: 13,
  ctrlKey: true
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{editor-with-preview}}`);
  assert.equal(this.$('.editor-with-preview').length, 1, 'The component\'s element is rendered');
});

test('it starts out in editing mode', function(assert) {
  assert.expect(1);
  this.render(hbs`{{editor-with-preview}}`);
  assert.equal(this.$('.editor-with-preview textarea').length, 1, 'The text area is rendered');
});

test('it binds to the editor text correctly', function(assert) {
  assert.expect(1);
  this.render(hbs`{{editor-with-preview input='Random input'}}`);
  assert.equal(this.$('.editor-with-preview textarea').val(), 'Random input', 'The text area is rendered with correct content');
});

test('user can switch between editing and preview mode', function(assert) {
  assert.expect(3);
  this.render(hbs`{{editor-with-preview}}`);
  assert.equal(this.$('.editor-with-preview.editing').length, 1, 'The component is rendered in editing mode initially');
  this.$('.preview').click();
  assert.equal(this.$('.editor-with-preview.previewing').length, 1, 'The component switches to preview mode');
  this.$('.edit').click();
  assert.equal(this.$('.editor-with-preview.editing').length, 1, 'The component switches to edit mode');
});

test('It renders the preview tab with proper content when clicking the preview button', function(assert) {
  assert.expect(1);
  this.render(hbs`{{editor-with-preview input='test' generatePreview='generatePreview'}}`);
  this.$('.preview').click();
  assert.equal(this.$('.body-preview').html(), 'Lorem ipsum <strong>bla</strong>');
});

test('it renders the preview tab with no content message when input is blank when clicking the preview button', function(assert) {
  assert.expect(1);
  this.render(hbs`{{editor-with-preview input='' generatePreview='generatePreview'}}`);
  this.$('.preview').click();
  assert.equal(this.$('.body-preview').html(), '<p>Nothing to preview.</p>');
});

test('it has a spinner when loading', function(assert) {
  assert.expect(1);

  this.set('isLoading', true);
  this.render(hbs`{{editor-with-preview isLoading=isLoading}}`);

  assert.equal(this.$('.editor-with-preview .spinner').length, 1);
});

test('it has no spinner when not loading', function(assert) {
  assert.expect(1);

  this.set('isLoading', false);
  this.render(hbs`{{editor-with-preview isLoading=isLoading}}`);

  assert.equal(this.$('.editor-with-preview .spinner').length, 0);
});

test('it sets the edit button class when editing', function(assert) {
  assert.expect(1);

  this.render(hbs`{{editor-with-preview}}`);
  this.set('editing', true);

  assert.equal(this.$('.editor-with-preview button.edit').hasClass('active'), true);
});

test('it has the code theme selector', function(assert) {
  assert.expect(1);

  this.render(hbs`{{editor-with-preview}}`);

  assert.equal(this.$('.editor-with-preview .code-theme-selector').length, 1);
});

test('it has a placeholder when provided', function(assert) {
  assert.expect(1);

  this.set('placeholder', 'Placeholder text');
  this.render(hbs`{{editor-with-preview placeholder=placeholder}}`);

  assert.equal(this.$('.editor-with-preview textarea').attr('placeholder'), 'Placeholder text');
});

test('it does not autofocus on first load if not provided', function(assert) {
  assert.expect(1);

  this.render(hbs`{{editor-with-preview}}`);

  assert.equal(this.$('.editor-with-preview textarea').hasClass('focused'), false);
});

test('it autofocuses on second render if not provided', function(assert) {
  assert.expect(1);

  this.render(hbs`{{editor-with-preview}}`);
  this.$('.preview').click();
  this.$('.edit').click();

  assert.equal(this.$('.editor-with-preview textarea').hasClass('focused'), true);
});

test('it autofocuses on first load if provided', function(assert) {
  assert.expect(1);

  this.set('autofocus', true);
  this.render(hbs`{{editor-with-preview autofocus=autofocus}}`);

  assert.equal(this.$('.editor-with-preview textarea').hasClass('focused'), true);
});

test('it sets the editor min-height to the editor height when previewing and still loading', function(assert) {
  assert.expect(1);

  this.set('isLoading', true);
  this.render(hbs`{{editor-with-preview isLoading=isLoading}}`);

  let height = this.$('.editor-with-preview').css('height');

  this.$('.preview').click();

  let style = `min-height: ${height};`;
  assert.equal(this.$('.editor-with-preview').attr('style'), style);
});

test('it clears the editor style when previewing and done loading', function(assert) {
  assert.expect(2);

  this.set('isLoading', true);
  this.render(hbs`{{editor-with-preview isLoading=isLoading}}`);

  this.$('.preview').click();
  assert.equal(this.$('.editor-with-preview')[0].hasAttribute('style'), true);

  this.set('isLoading', false);
  assert.equal(this.$('.editor-with-preview')[0].hasAttribute('style'), false);
});

// test('it autoresizes to a max height of 350px', function(assert) {
//   assert.expect(3);
//
//   this.render(hbs`{{editor-with-preview input=input}}`);
//
//   assert.equal(this.$('.editor-with-preview textarea').css('height'), '100px');
//
//   var text = "";
//   for(var i = 0; i < 100; i++) { text += "\n"; }
//   this.set('input', text);
//   assert.equal(this.$('.editor-with-preview textarea').css('height'), '350px');
//
//   this.set('input', '');
//   assert.equal(this.$('.editor-with-preview textarea').css('height'), '100px');
// });

test('it sends the modifiedSubmit action with ctrl+enter', function(assert) {
  assert.expect(2);

  this.on('modifiedSubmit', () => {
    assert.ok(true);
  });
  this.render(hbs`{{editor-with-preview modifiedSubmit="modifiedSubmit"}}`);

  this.$('textarea').trigger(pressCtrlEnter);
  assert.equal(this.$('textarea').val().trim(), '');
});
