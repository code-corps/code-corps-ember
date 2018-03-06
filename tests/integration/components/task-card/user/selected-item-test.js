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

moduleForComponent('task-card/user/selected-item', 'Integration | Component | task card/user/selected item', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('lazy renders as unselected by default', function(assert) {
  assert.expect(2);

  this.render(hbs`{{task-card/user/selected-item}}`);

  assert.notOk(page.selectedIcon.isVisible, 'The selected icon does not render.');
  assert.notOk(page.isTooltipTarget, 'There is no tooltip because it lazy renders.');
});

test('renders selected user as an icon', function(assert) {
  assert.expect(1);

  let mockUser = {
    photoThumbUrl: 'test.png',
    username: 'testuser'
  };

  set(this, 'select', { selected: mockUser });

  page.render(hbs`{{task-card/user/selected-item select=select}}`);

  assert.equal(page.selectedIcon.src, mockUser.photoThumbUrl, 'the user photo was rendered in the icon.');
});

test('the tooltip renders lazily, triggered by mouseEnter', function(assert) {
  assert.expect(6);

  let mockUser = {
    photoThumbUrl: 'test.png',
    username: 'testuser'
  };

  set(this, 'select', { selected: mockUser });

  page.render(hbs`{{task-card/user/selected-item select=select}}`);

  assertTooltipNotRendered(assert);

  page.mouseenter();

  assertTooltipRendered(assert);
  assertTooltipVisible(assert);
  assert.equal(page.tooltip.text, `Assigned to ${mockUser.username}`, 'the tooltip renders the correct text.');

  page.mouseleave();

  assertTooltipRendered(assert);
  assertTooltipNotVisible(assert);
});
