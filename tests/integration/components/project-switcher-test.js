import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/project-switcher';

let page = PageObject.create(component);

moduleForComponent('project-switcher', 'Integration | Component | project switcher', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it hides and shows', async function(assert) {
  assert.expect(12);

  this.render(hbs`{{project-switcher user=user}}`);

  assert.ok(page.hasHiddenClass, 'Has the hidden class by default.');
  assert.notOk(page.hasVisibleClass, 'Does not have the visible class by default.');
  assert.notOk(page.body.hasHiddenStyle(), 'Body does not have overflow: hidden');
  assert.notOk(page.projectSwitcherMenu.isVisible, 'Menu is not visible.');

  await page.menuLink.click();

  assert.notOk(page.hasHiddenClass, 'Does not have the hidden class after clicking');
  assert.ok(page.hasVisibleClass, 'Has the visible class after clicking.');
  assert.ok(page.body.hasHiddenStyle(), 'Body has overflow: hidden');
  assert.ok(page.projectSwitcherMenu.isVisible, 'Menu is visible.');

  await page.overlay.click();

  assert.ok(page.hasHiddenClass, 'Has the hidden class after hiding.');
  assert.notOk(page.hasVisibleClass, 'Does not have the visible class after hiding.');
  assert.notOk(page.body.hasHiddenStyle(), 'Body does not have overflow: hidden');
  assert.notOk(page.projectSwitcherMenu.isVisible, 'Menu is not visible.');
});
