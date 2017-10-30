import RSVP from 'rsvp';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/task-header';

let mockTask = {
  title: 'A task',
  body: 'A <strong>body</strong>',
  number: 12,
  save() {
    return RSVP.resolve();
  }
};

let page = PageObject.create(component);

moduleForComponent('task-header', 'Integration | Component | task header', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders all the ui elements properly bound', function(assert) {
  assert.expect(1);
  this.set('task', mockTask);
  page.render(hbs`{{task-header task=task}}`);

  assert.equal(page.taskTitle.title.text, 'A task #12', 'Title is correctly bound and rendered');
});
