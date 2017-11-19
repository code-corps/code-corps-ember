import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/task-status';

let page = PageObject.create(component);

moduleForComponent('task-status', 'Integration | Component | task status', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders closed status', function(assert) {
  assert.expect(3);

  let task = { status: 'closed' };
  this.set('task', task);
  page.render(hbs`{{task-status task=task}}`);

  assert.ok(page.isClosed);
  assert.ok(page.iconClosed.isVisible);
  assert.equal(page.statusText, 'Closed');
});

test('it renders open status', function(assert) {
  assert.expect(3);

  let task = { status: 'open' };
  this.set('task', task);
  page.render(hbs`{{task-status task=task}}`);

  assert.ok(page.isOpen);
  assert.ok(page.iconOpen.isVisible);
  assert.equal(page.statusText, 'Open');
});
