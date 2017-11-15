import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import { set, get } from '@ember/object';
import unselectedItemComponent from 'code-corps-ember/tests/pages/unselected-item.js';

let page = PageObject.create(unselectedItemComponent);

function renderPage() {
  page.render(hbs`
    {{unselected-item
      dropdownOpen=dropdownOpen
      tooltipShown=tooltipShown
     }}
     `);
}

let dropdownOpen = false;
let tooltipShown = false;

moduleForComponent('task-card/user/unselected-item', 'Integration | Component | task card/user/unselected item', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('mouseEnter hovers and tooltipShown', function(assert) {
  set(this, 'dropdownOpen', dropdownOpen);
  set(this, 'tooltipShown', tooltipShown);
  renderPage();

  assert.ok(page.unselectedIcon.isVisable, 'the user icon renders');
  page.mouseenter(); // trigger the tooltip
  assert.ok(page.isTooltipTarget, 'There is a tooltip.');
  assert.equal(page.tooltip.text, 'Assign this task', 'The tooltip renders with text.');
  page.mouseleave();// hide the tooltip
  assert.ok(page.tooltip.isHidden);
});
