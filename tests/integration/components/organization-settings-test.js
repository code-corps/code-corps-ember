import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/organization-settings';

let page = PageObject.create(component);

moduleForComponent('organization-settings', 'Integration | Component | organization settings', {
  integration: true,
  beforeEach() {
    stubService(this, 'store');
    stubService(this, 'session');
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders properly', function(assert) {
  assert.expect(2);

  page.render(hbs`{{organization-settings}}`);

  assert.ok(page.organizationHeader.isVisible);
  assert.ok(page.organizationMenu.isVisible);
});
