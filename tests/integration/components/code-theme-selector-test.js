import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/code-theme-selector';

let page = PageObject.create(component);

moduleForComponent('code-theme-selector', 'Integration | Component | code theme selector', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it toggles code theme service when clicked', function(assert) {
  assert.expect(1);

  stubService(this, 'code-theme', {
    toggle() {
      assert.ok(true, 'Code theme service was called');
    }
  });

  this.render(hbs`{{code-theme-selector}}`);

  page.click();
});

test('it has the class name from the service', function(assert) {
  assert.expect(1);

  stubService(this, 'code-theme', {
    className: 'light'
  });

  this.render(hbs`{{code-theme-selector}}`);

  assert.ok(page.isLight);
});
