import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import {
  assertTooltipRendered,
  assertTooltipNotRendered,
  assertTooltipNotVisible,
  assertTooltipVisible
} from 'code-corps-ember/tests/helpers/ember-tooltips';
import selectedItem from 'code-corps-ember/tests/pages/components/task-card/user/selected-item';

let page = PageObject.create(selectedItem);

function renderPage() {
  page.render(hbs`
    {{task-card/user/selected-item
      taskUser=taskUser
    }}
  `);
}

moduleForComponent('task-card/user/selected-item', 'Integration | Component | task card/user/selected item', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('the default state when user task is loaded', function(assert) {
  renderPage();
  assert.notOk(page.selectedIcon.isVisible, 'The selected icon does not render.');
  assert.notOk(page.isTooltipTarget, 'There is no tooltip because it lazy renders.');
});

test('the tooltip renders lazily, triggered by mouseEnter', function(assert) {
  assert.expect(5);

  renderPage();
  assertTooltipNotRendered(assert);

  page.mouseenter();

  assertTooltipRendered(assert);
  assertTooltipVisible(assert);

  page.mouseleave();

  assertTooltipRendered(assert);
  assertTooltipNotVisible(assert);
});
