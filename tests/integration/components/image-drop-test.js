import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import fillInFileInput from '../../helpers/fill-in-file-input';
import removeDoubleQuotes from '../../helpers/remove-double-quotes';

moduleForComponent('image-drop', 'Integration | Component | image drop', {
  integration: true
});

let originalImageString = 'data:image/gif;base64,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';
let droppedImageString = 'data:image/png;base64,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';

test('it renders default state without a photo', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });"
  this.render(hbs`{{image-drop}}`);

  assert.equal(this.$('p.help-text').text().trim(), 'Drop your image here.');
  assert.equal(this.$('.image-drop').hasClass('active'), false);
  assert.equal(this.$('.image-drop').hasClass('is-dragging'), false);
  let style = this.$('.image-drop').css('background-image');
  assert.equal(style, 'none');
});

test('it reacts to dragging on the application', function(assert) {
  this.render(hbs`
    {{#drag-zone}}
      {{image-drop}}
    {{/drag-zone}}
  `);

  this.$('.drag-zone').trigger('dragover');
  assert.equal(this.$('.image-drop').hasClass('is-dragging'), true);

  this.$('.drag-zone').trigger('dragleave');
  assert.equal(this.$('.image-drop').hasClass('is-dragging'), false);
});

test('it reacts to dragging on itself', function(assert) {
  this.render(hbs`{{image-drop}}`);

  this.$('.image-drop').trigger('dragover');
  assert.equal(this.$('.image-drop').hasClass('active'), true);

  this.$('.image-drop').trigger('dragleave');
  assert.equal(this.$('.image-drop').hasClass('active'), false);
});

test('it renders the original image', function(assert) {
  this.set('originalImage', originalImageString);

  this.render(hbs`{{image-drop originalImage=originalImage}}`);

  let style = this.$('.image-drop').css('background-image');
  let expectedStyle = `url(${originalImageString})`;
  assert.equal(removeDoubleQuotes(style), expectedStyle);
});

test('it renders the dropped image', function(assert) {
  this.set('originalImage', originalImageString);
  this.set('droppedImage', droppedImageString);

  this.render(hbs`{{image-drop originalImage=originalImage droppedImage=droppedImage}}`);

  let style = this.$('.image-drop').css('background-image');
  let expectedStyle = `url(${droppedImageString})`;
  assert.equal(removeDoubleQuotes(style), expectedStyle);
});

test('it handles a dropped image file', function(assert) {
  this.set('originalImage', originalImageString);
  this.render(hbs`{{image-drop originalImage=originalImage}}`);
  let fileName = 'file.png';

  this.$('.image-drop').trigger('dragover');
  assert.equal(this.$('.image-drop').hasClass('active'), true);

  fillInFileInput('input', { name: fileName, content: droppedImageString });

  let style = this.$('.image-drop').css('background-image');
  let expectedStyle = `url(${droppedImageString})`;
  assert.equal(removeDoubleQuotes(style), expectedStyle);
  assert.equal(this.$('.image-drop').hasClass('active'), false);
});

test('it does not show the hover text if not hovering', function(assert) {
  this.set('hoverText', 'Some hover text.');
  this.render(hbs`{{image-drop hoverText=hoverText}}`);

  assert.equal(this.$('.hover').text().trim(), 'Some hover text.');
  assert.equal(this.$('.hover').css('display'), 'none');
});

// TODO: Figure out how to make this one pass
// test('it shows the hover text if hovering', function(assert) {
//   assert.expect(2);
//   this.set('hoverText', 'Some hover text.');
//   this.set('originalImage', originalImageString);

//   this.render(hbs`{{image-drop originalImage=originalImage hoverText=hoverText}}`);

//   Ember.run(() => { this.$('.image-drop').trigger('mouseenter'); });

//   assert.equal(this.$('.hover').text().trim(), 'Some hover text.');
//   assert.equal(this.$('.hover').css('display'), 'block');
// });

test('it is circular if circle passed in', function(assert) {
  this.render(hbs`{{image-drop circle=true}}`);

  assert.equal(this.$('.image-drop').hasClass('is-circular'), true);
});
