import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/user-details';

let page = PageObject.create(component);

moduleForComponent('user-details', 'Integration | Component | user details', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders subcomponents', function(assert) {
  assert.expect(2);

  page.render(hbs`{{user-details}}`);

  assert.ok(page.userOrganizationsList.isVisible);
  assert.ok(page.userSidebar.isVisible);
});
