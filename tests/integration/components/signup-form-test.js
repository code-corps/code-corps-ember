import { run } from '@ember/runloop';
import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/signup-form';

const page = PageObject.create(component);

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
  assert.expect(4);

  this.render(hbs`{{signup-form user=user}}`);

  assert.ok(page.usernameInput.isVisible, 'The username field renders');
  assert.ok(page.emailInput.isVisible, 'The email field renders');
  assert.ok(page.passwordInput.isVisible, 'The password field renders');
  assert.ok(page.signupButton.isVisible, 'The signup button renders');
});

test('renders different title if user is donating', function(assert) {
  assert.expect(2);

  this.render(hbs`{{signup-form user=user}}`);

  let normalUser = { signUpContext: null };
  let donatingUser = { signUpContext: 'donation' };

  run(() => set(this, 'user', normalUser));
  assert.equal(page.title.text, 'Join Code Corps today.', 'Title is correct.');
  run(() => set(this, 'user', donatingUser));
  assert.equal(page.title.text, 'Join Code Corps to continue.', 'Title is correct.');
});
