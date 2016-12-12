import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import taskBoardComponent from 'code-corps-ember/tests/pages/components/task-board';

let page = PageObject.create(taskBoardComponent);

moduleForComponent('task-board', 'Integration | Component | task board', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders', function(assert) {
  assert.expect(1);

  page.render(hbs`{{task-board}}`);

  assert.equal(this.$().text().trim(), '');
});
