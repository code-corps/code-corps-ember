import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

let mockSession = Ember.Service.extend({
  isAuthenticated: true
});

moduleForComponent('post-title', 'Integration | Component | post title', {
  integration: true,
  beforeEach() {
    this.container.register('service:session', mockSession);
    this.container.injection('component', 'sessionService', 'service:session');
  }
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{post-title}}`);
  assert.equal(this.$('.post-title').length, 1, 'The component\'s element is rendered');
});

test('it switches between edit and view mode', function(assert) {
  assert.expect(8);
  this.render(hbs`{{post-title}}`);

  assert.equal(this.$('.post-title.editing').length, 0, 'Component is not in edit mode');
  assert.equal(this.$('.post-title.editing input[name=title]').length, 0, 'Input element is not rendered');
  assert.equal(this.$('.post-title .title').length, 1, 'Display element is rendered');
  this.$('.post-title .edit').click();
  assert.equal(this.$('.post-title.editing').length, 1, 'Component is in edit mode');
  assert.equal(this.$('.post-title.editing input[name=title]').length, 1, 'Input element is rendered');
  assert.equal(this.$('.post-title.editing .save').length, 1, 'Save button is rendered');
  assert.equal(this.$('.post-title.editing .cancel').length, 1, 'Cancel button is rendered');
  this.$('.post-title .cancel').click();
  assert.equal(this.$('.post-title.editing').length, 0, 'Component is not in edit mode');
});

test('it binds to title and triggers save', function(assert) {
  assert.expect(2);
  this.set('title', 'Original title');
  this.render(hbs`{{post-title title=title saveTitle='saveTitle'}}`);

  this.on('saveTitle', (title) => {
    assert.equal(title, 'Original title', 'Action was triggered with original title');
  });

  this.$('.post-title .edit').click();
  this.$('.post-title .save').click();

  this.on('saveTitle', (title) => {
    assert.equal(title, 'Edited title', 'Action was triggered with original title');
  });

  this.$('.post-title .edit').click();
  this.$('.post-title input[name=title]').val('Edited title').trigger('change');
  this.$('.post-title .save').click();
});

test('it resets the input element when editing is cancelled and then restarted', function(assert) {
  assert.expect(1);
  this.set('title', 'Original title');
  this.render(hbs`{{post-title title=title}}`);
  this.$('.post-title .edit').click();
  this.$('.post-title input[name=title]').val('Edited title').trigger('change');
  this.$('.post-title .cancel').click();
  this.$('.post-title .edit').click();
  assert.equal(this.$('.post-title input[name=title]').val(), 'Original title', 'Input is back to the original value');
});

