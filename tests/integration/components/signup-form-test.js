import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/signup-form';

let page = PageObject.create(component);

moduleForComponent('signup-form', 'Integration | Component | signup form', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders required ui elements', function(assert) {
  this.render(hbs`{{signup-form}}`);

  assert.ok(page.usernameInput.isVisible, 'The username field renders');
  assert.ok(page.emailInput.isVisible, 'The email field renders');
  assert.ok(page.passwordInput.isVisible, 'The password field renders');
  assert.ok(page.signupButton.isVisible, 'The signup button renders');
});
