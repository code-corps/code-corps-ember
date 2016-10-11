import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const {
  getOwner,
  run
} = Ember;

moduleForComponent('flash-messages', 'Integration | Component | flash messages', {
  integration: true
});

test('it renders a fixed error message', function(assert) {
  this.render(hbs`{{flash-messages}}`);

  run(() => {
    getOwner(this).lookup('service:flash-messages').add({
      message: 'Error message',
      type: 'danger',
      fixed: true,
      sticky: false,
      timeout: 5000
    });
  });

  assert.equal(this.$('.flash .fixed-flash .fixed-flash-inner p').text().trim(), 'Error message');
});

test('it renders a normal success message', function(assert) {
  this.render(hbs`{{flash-messages}}`);

  run(() => {
    getOwner(this).lookup('service:flash-messages').add({
      message: 'Success message',
      type: 'success'
    });
  });

  assert.equal(this.$('.flash .container p').text().trim(), 'Success message');
});
