import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('post-status-button', 'Integration | Component | post status button', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{post-status-button}}`);

  assert.equal(this.$('.post-status-button').length, 1, 'The element renders');
});


test('when post is open, it renders the button to close it', function(assert) {
  assert.expect(4);

  let mockPost = Ember.Object.create({
    status: 'open',
    set(property, value) {
      assert.equal(property, 'status', 'Status is set to closed');
      assert.equal(value, 'closed', 'Status is set to closed');
    },
    save() {
      assert.ok(true, 'Save is called');
    }
  });

  this.set('post', mockPost);
  this.render(hbs`{{post-status-button post=post}}`);

  assert.equal(this.$('.post-status-button [name=close]').length, 1, 'The element renders');
  this.$('.post-status-button [name=close]').click();
});

test('when post is closed, it renders the button to open it', function(assert) {
  assert.expect(4);

  let mockPost = Ember.Object.create({
    status: 'closed',
    set(property, value) {
      assert.equal(property, 'status', 'Status is set to open');
      assert.equal(value, 'open', 'Status is set to open');
    },
    save() {
      assert.ok(true, 'Save is called');
    }
  });

  this.set('post', mockPost);
  this.render(hbs`{{post-status-button post=post}}`);

  assert.equal(this.$('.post-status-button [name=open]').length, 1, 'The element renders');
  this.$('.post-status-button [name=open]').click();
});
