import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const { Object } = Ember;

moduleForComponent('task-status-button', 'Integration | Component | task status button', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{task-status-button}}`);

  assert.equal(this.$('.task-status-button').length, 1, 'The element renders');
});

test('when task is open, it renders the button to close it', function(assert) {
  assert.expect(4);

  let mockTask = Object.create({
    status: 'open',
    set(property, value) {
      assert.equal(property, 'status', 'Status is set to closed');
      assert.equal(value, 'closed', 'Status is set to closed');
    },
    save() {
      assert.ok(true, 'Save is called');
    }
  });

  this.set('task', mockTask);
  this.render(hbs`{{task-status-button task=task}}`);

  assert.equal(this.$('.task-status-button [name=close]').length, 1, 'The element renders');
  this.$('.task-status-button [name=close]').click();
});

test('when task is closed, it renders the button to open it', function(assert) {
  assert.expect(4);

  let mockTask = Object.create({
    status: 'closed',
    set(property, value) {
      assert.equal(property, 'status', 'Status is set to open');
      assert.equal(value, 'open', 'Status is set to open');
    },
    save() {
      assert.ok(true, 'Save is called');
    }
  });

  this.set('task', mockTask);
  this.render(hbs`{{task-status-button task=task}}`);

  assert.equal(this.$('.task-status-button [name=open]').length, 1, 'The element renders');
  this.$('.task-status-button [name=open]').click();
});
