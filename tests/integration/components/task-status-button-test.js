import { get } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/task-status-button';

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
  assert.expect(2);

  let mockTask = {
    status: 'open',
    save() {
      assert.ok(true, 'Save is called');
    }
  };

  this.set('task', mockTask);
  page.render(hbs`{{task-status-button task=task}}`);

  page.clickClose();

  let task = get(this, 'task');
  assert.equal(get(task, 'status'), 'closed', 'Status is set to closed');
});

test('when task is closed, it renders the button to open it', function(assert) {
  assert.expect(2);

  let mockTask = {
    status: 'closed',
    save() {
      assert.ok(true, 'Save is called');
    }
  };

  this.set('task', mockTask);
  page.render(hbs`{{task-status-button task=task}}`);

  page.clickOpen();

  let task = get(this, 'task');
  assert.equal(get(task, 'status'), 'open', 'Status is set to open');
});
