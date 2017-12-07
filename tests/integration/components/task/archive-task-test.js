import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/task/archive-task';
import { Ability } from 'ember-can';
import sinon from 'sinon';

let page = PageObject.create(component);

function renderPage() {
  page.render(hbs`
    {{task/archive-task
      archiveTask=archiveTaskHandler
      task=task
    }}`);
}

moduleForComponent('task/archive-task', 'Integration | Component | task/archive task', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    this.register('ability:task', Ability.extend({ canArchive: true }));
  },
  afterEach() {
    page.removeContext();
  }
});

test('can archive if user has ability', function(assert) {
  assert.expect(2);

  let stub = sinon.stub(window, 'confirm').callsFake(() => {
    assert.ok(true, 'Confirmation prompt was called.');
    return true;
  });

  let task = { archived: false };
  this.set('task', task);
  this.set('archiveTaskHandler', function() {
    assert.ok(true, 'archiveTask action was called.');
  });

  this.register('ability:task', Ability.extend({ canArchive: true }));

  renderPage();

  page.archiveLink.click();

  stub.restore();
});

test('cannot archive if user does not have ability', function(assert) {
  assert.expect(2);

  let task = { archived: false };
  this.set('task', task);

  this.register('ability:task', Ability.extend({ canArchive: false }));

  renderPage();

  assert.notOk(page.archiveLink.isVisible, 'Archive link is not visible');
  assert.notOk(page.archivedStatus.isVisible, 'Archived status is not visible because task is not archived');
});

test('show archived status if archived', function(assert) {
  assert.expect(2);

  let task = { archived: true };
  this.set('task', task);

  renderPage();

  assert.notOk(page.archiveLink.isVisible, 'Archive link is not visible');
  assert.ok(page.archivedStatus.isVisible, 'Archived status is visible because task is archived');
});
