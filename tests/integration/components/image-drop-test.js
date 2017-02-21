import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import fillInFileInput from '../../helpers/fill-in-file-input';
import removeDoubleQuotes from '../../helpers/remove-double-quotes';
import Ember from 'ember';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/image-drop';

const {
  set
} = Ember;

let page = PageObject.create(component);

moduleForComponent('image-drop', 'Integration | Component | image drop', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

let originalImageString = 'data:image/gif;base64,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';
let droppedImageString = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

test('it renders default state without a photo', function(assert) {
  // Set any properties with set(this, 'myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"
  page.render(hbs`{{image-drop}}`);

  assert.equal(this.$('p.help-text').text().trim(), 'Click to add your photo.');
  assert.notOk(page.dropZone.isActive);
  assert.notOk(page.dropZone.isDragging);
  let style = this.$('.image-drop').css('background-image');
  assert.equal(style, 'none');
});

test('it reacts to dragging on the application', function(assert) {
  page.render(hbs`
    {{#drag-zone}}
      {{image-drop}}
    {{/drag-zone}}
  `);

  page.dragZone.dragover();
  assert.ok(page.dropZone.isDragging);

  page.dragZone.dragleave();
  assert.notOk(page.dropZone.isDragging);
});

test('it reacts to dragging on itself', function(assert) {
  page.render(hbs`{{image-drop}}`);

  this.$('.image-drop').trigger('dragover');
  assert.ok(page.dropZone.isActive);

  this.$('.image-drop').trigger('dragleave');
  assert.notOk(page.dropZone.isActive);
});

test('it renders the original image', function(assert) {
  set(this, 'originalImage', originalImageString);

  page.render(hbs`{{image-drop originalImage=originalImage}}`);

  let style = this.$('.image-drop').css('background-image');
  let expectedStyle = `url(${originalImageString})`;
  assert.equal(removeDoubleQuotes(style), expectedStyle);
});

test('it renders the dropped image', function(assert) {
  set(this, 'originalImage', originalImageString);
  set(this, 'droppedImage', droppedImageString);

  page.render(hbs`{{image-drop originalImage=originalImage droppedImage=droppedImage}}`);

  let style = this.$('.image-drop').css('background-image');
  let expectedStyle = `url(${droppedImageString})`;
  assert.equal(removeDoubleQuotes(style), expectedStyle);
});

test('it handles a dropped image file', function(assert) {
  set(this, 'originalImage', originalImageString);
  page.render(hbs`{{image-drop originalImage=originalImage}}`);
  let fileName = 'file.png';

  this.$('.image-drop').trigger('dragover');
  assert.ok(page.dropZone.isActive);

  fillInFileInput('.image-drop input[type=file]', { name: fileName, content: droppedImageString });

  let style = this.$('.image-drop').css('background-image');
  let expectedStyle = `url(${droppedImageString})`;
  assert.equal(removeDoubleQuotes(style), expectedStyle);
  assert.notOk(page.dropZone.isActive);
});

test('it does not show the hover text if not hovering', function(assert) {
  set(this, 'hoverText', 'Some hover text.');
  page.render(hbs`{{image-drop hoverText=hoverText}}`);

  assert.equal(this.$('.hover').text().trim(), 'Some hover text.');
  assert.equal(this.$('.hover').css('display'), 'none');
});

// TODO: Figure out how to make this one pass
// test('it shows the hover text if hovering', function(assert) {
//   assert.expect(2);
//   set(this, 'hoverText', 'Some hover text.');
//   set(this, 'originalImage', originalImageString);

//   page.render(hbs`{{image-drop originalImage=originalImage hoverText=hoverText}}`);

//   Ember.run(() => { this.$('.image-drop').trigger('mouseenter'); });

//   assert.equal(this.$('.hover').text().trim(), 'Some hover text.');
//   assert.equal(this.$('.hover').css('display'), 'block');
// });

test('it is circular if circle passed in', function(assert) {
  page.render(hbs`{{image-drop circle=true}}`);

  assert.ok(page.dropZone.isCircle);
});
