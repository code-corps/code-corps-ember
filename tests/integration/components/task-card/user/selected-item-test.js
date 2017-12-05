import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { set } from '@ember/object';
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
    {{
      task-card/user/selected-item
      select=(hash selected = selectedOption)
      task=task
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
  assert.expect(2);
  renderPage();
  assert.notOk(page.selectedIcon.isVisible, 'The selected icon does not render.');
  assert.notOk(page.isTooltipTarget, 'There is no tooltip because it lazy renders.');
});

test('the selected user is rendered', function(assert) {

  let mockUser = {

    photoThumbUrl: 'test.png',
    userName: 'testuser'
  };

  set(this, 'selectedOption', { mockUser });
  renderPage();
  assert.equal(mockUser.userName, 'testuser');
  assert.equal(mockUser.photoThumbUrl, 'test.png');
});

test('the tooltip renders lazily, triggered by mouseEnter', function(assert) {
  assert.expect(5);

  let mockUser = {

    photoThumbUrl: 'test.png',
    userName: 'testuser'
  };

  set(this, 'selectedOption', { mockUser });
  renderPage();
  assertTooltipNotRendered(assert);

  page.mouseenter();

  assertTooltipRendered(assert);
  assertTooltipVisible(assert);

  page.mouseleave();

  assertTooltipRendered(assert);
  assertTooltipNotVisible(assert);
});
