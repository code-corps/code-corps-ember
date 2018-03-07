import { run } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from '../../helpers/setup-mirage-for-integration';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/signup-email-input';

let page = PageObject.create(component);

moduleForComponent('signup-email-input', 'Integration | Component | signup email input', {
  integration: true,
  setup() {
    startMirage(this.container);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
    server.shutdown();
  }
});

test('it shows nothing when empty', function(assert) {
  this.render(hbs`{{signup-email-input}}`);

  assert.notOk(page.suggestionsArea.visible);
  assert.notOk(page.suggestionsArea.visible);
});

test('it shows suggestions when invalid', async function(assert) {
  assert.expect(5);

  server.get('/users/email_available', () => {
    return { valid: false, available: true };
  });

  this.set('emailValidated', (result) => {
    run.next(() => {
      assert.notOk(result);
    });
  });
  this.set('user', { email: null });
  this.render(hbs`{{signup-email-input user=user emailValidated=emailValidated}}`);

  page.fillIn('incomplete@');
  await page.keydown();

  assert.notOk(page.suggestionsArea.ok);
  assert.ok(page.suggestionsArea.notOk);
  assert.equal(page.suggestionsArea.suggestions.length, 1);
  assert.equal(page.suggestionsArea.suggestions.objectAt(0).text, 'Please enter a valid email.');
});

test('it shows suggestions when unavailable', async function(assert) {
  assert.expect(5);

  server.get('/users/email_available', () => {
    return { valid: true, available: false };
  });

  this.set('emailValidated', (result) => {
    run.next(() => {
      assert.notOk(result);
    });
  });
  this.set('user', { email: null });
  this.render(hbs`{{signup-email-input user=user emailValidated=emailValidated}}`);

  page.fillIn('taken@gmail.com');
  await page.keydown();

  assert.notOk(page.suggestionsArea.ok);
  assert.ok(page.suggestionsArea.notOk);
  assert.equal(page.suggestionsArea.suggestions.length, 1);
  assert.equal(page.suggestionsArea.suggestions.objectAt(0).text, 'This email is already registered. Want to login?');
});

test('it shows ok when valid and available', async function(assert) {
  assert.expect(4);

  server.get('/users/email_available', () => {
    return { valid: true, available: true };
  });

  this.set('emailValidated', (result) => {
    run.next(() => {
      assert.ok(result);
    });
  });
  this.set('user', { email: null });
  this.render(hbs`{{signup-email-input user=user emailValidated=emailValidated}}`);

  page.fillIn('available@gmail.com');
  await page.keydown();

  assert.ok(page.suggestionsArea.ok);
  assert.notOk(page.suggestionsArea.notOk);
  assert.equal(page.suggestionsArea.suggestions.length, 0);
});

test('it resets to invalid when deleted', async function(assert) {
  assert.expect(3);

  server.get('/users/email_available', () => {
    return { valid: true, available: true };
  });

  this.set('emailValidated', (result) => {
    run.next(() => {
      assert.notOk(result);
    });
  });
  this.set('user', { email: 'available@gmail.com' });
  this.render(hbs`{{signup-email-input user=user emailValidated=emailValidated}}`);

  page.fillIn('');
  await page.keydown();

  assert.notOk(page.suggestionsArea.visible);
  assert.notOk(page.suggestionsArea.visible);
});
