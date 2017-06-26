import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

import pageComponent from 'code-corps-ember/tests/pages/components/settings-menu';
import PageObject from 'ember-cli-page-object';

let page = PageObject.create(pageComponent);

moduleForComponent('settings-menu', 'Integration | Component | settings menu', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders correct links', function(assert) {
  assert.expect(2);

  page.render(hbs`{{settings-menu}}`);

  assert.ok(page.profileLink.isVisible, 'Profile link is rendered.');
  assert.ok(page.integrationsLink.isVisible, 'Integrations link is rendered.');
});
