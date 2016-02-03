import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('editor-with-preview', 'Integration | Component | editor with preview', {
  integration: true
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

test('It triggers a "generatePreview" action when preview button is clicked and initiates loading', function(assert) {
  assert.expect(2);
  this.render(hbs`{{editor-with-preview input='test' preview='Random text...' generatePreview='generatePreview'}}`);

  this.on('generatePreview', function(content) {
    assert.equal(content, 'test', 'The action was triggered with correct content');
  });
  this.$('.preview').click();
  assert.equal(this.$('.editor-with-preview.previewing .body').text().trim(), 'Loading preview...', 'The loading indicator renders');
});

test('It renders preview as unescaped html', function(assert) {
  assert.expect(1);
  this.render(hbs`{{editor-with-preview preview=preview}}`);
  this.$('.preview').click();
  this.set('preview', 'Random <b>text</b>...');
  assert.equal(this.$('.editor-with-preview.previewing .body b').length, 1, 'The html is rendered properly');
});
