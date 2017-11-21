import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import {
  assertTooltipRendered,
  assertTooltipNotRendered,
  assertTooltipNotVisible,
  assertTooltipVisible
} from 'code-corps-ember/tests/helpers/ember-tooltips';

function renderPage() {
  page.render(hbs`
    {{task-card/user/unselected-item
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
