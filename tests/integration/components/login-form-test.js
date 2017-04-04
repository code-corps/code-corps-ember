import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/login-form';

let page = PageObject.create(component);

moduleForComponent('login-form', 'Integration | Component | login form', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders required ui elements', function(assert) {
  this.render(hbs`{{login-form}}`);

  assert.ok(page.emailInput.isVisible, 'The email field renders');
  assert.ok(page.passwordInput.isVisible, 'The password field renders');
  assert.ok(page.submitButton.isVisible, 'The submit button renders');
  assert.ok(page.forgotPasswordLink.isVisible, 'The forgot password link renders');
});
