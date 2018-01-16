import { moduleForComponent, test } from 'ember-qunit';
import { set } from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/conversations/status-select';

let page = PageObject.create(component);

function renderPage() {
  page.render(hbs`
    {{conversations/status-select
      status=status
    }}
  `);
}

moduleForComponent('conversations/status-select', 'Integration | Component | conversations/status select', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it opens, closes, and renders the correct states', async function(assert) {
  assert.expect(8);

  set(this, 'status', 'open');

  renderPage();

  assert.ok(page.openButton.isVisible, 'The open button is visible');

  await page.openButton.click();

  assert.ok(page.openButton.isActive, 'The open button is active');
  assert.ok(page.openLink.isActive, 'The open link is active');
  assert.notOk(page.closedLink.isActive, 'The close link is not active');

  await page.closedLink.click();
  await page.closedButton.click();

  assert.ok(page.closedButton.isActive, 'The close button is active');
  assert.notOk(page.openLink.isActive, 'The open link is not active');
  assert.ok(page.closedLink.isActive, 'The close link is active');

  await page.openLink.click();

  assert.ok(page.openButton.isVisible, 'The open button is visible');
});
