import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/task-status-button';

const { Object } = Ember;

let page = PageObject.create(component);

moduleForComponent('task-status-button', 'Integration | Component | task status button', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('when task is open, it renders the button to close it', function(assert) {
  assert.expect(3);

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
  page.render(hbs`{{task-status-button task=task}}`);

  page.clickClose();
});

test('when task is closed, it renders the button to open it', function(assert) {
  assert.expect(3);

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
  page.render(hbs`{{task-status-button task=task}}`);

  page.clickOpen();
});
