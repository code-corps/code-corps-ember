import { run } from '@ember/runloop';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import startMirage from '../../helpers/setup-mirage-for-integration';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/signup-username-input';

let page = PageObject.create(component);

moduleForComponent('signup-username-input', 'Integration | Component | signup username input', {
  integration: true,
  setup() {
    startMirage(this.container);
  },
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
    server.shutdown();
  }
});

test('it shows nothing when empty', function(assert) {
  this.render(hbs`{{signup-username-input}}`);

  assert.notOk(page.suggestionsArea.visible);
  assert.notOk(page.suggestionsArea.visible);
});

test('it shows suggestions when invalid', async function(assert) {
  assert.expect(5);

  server.get('/users/username_available', () => {
    return { valid: false, available: true };
  });

  this.set('usernameValidated', (result) => {
    run.next(() => {
      assert.notOk(result);
    });
  });
  this.set('user', { username: null });
  this.render(hbs`{{signup-username-input user=user usernameValidated=usernameValidated}}`);

  page.fillIn('lots--of--hypens');
  await page.keydown();

  assert.notOk(page.suggestionsArea.ok);
  assert.ok(page.suggestionsArea.notOk);
  assert.equal(page.suggestionsArea.suggestions.length, 1);
  assert.equal(page.suggestionsArea.suggestions.objectAt(0).text, 'Please enter a username with only letters, numbers, or underscores.');
});

test('it shows suggestions when unavailable', async function(assert) {
  assert.expect(5);

  server.get('/users/username_available', () => {
    return { valid: true, available: false };
  });

  this.set('usernameValidated', (result) => {
    run.next(() => {
      assert.notOk(result);
    });
  });
  this.set('user', { username: null });
  this.render(hbs`{{signup-username-input user=user usernameValidated=usernameValidated}}`);

  page.fillIn('taken');
  await page.keydown();

  assert.notOk(page.suggestionsArea.ok);
  assert.ok(page.suggestionsArea.notOk);
  assert.equal(page.suggestionsArea.suggestions.length, 1);
  assert.equal(page.suggestionsArea.suggestions.objectAt(0).text, 'This username is already registered. Want to login?');
});

test('it shows ok when valid and available', async function(assert) {
  assert.expect(4);

  server.get('/users/username_available', () => {
    return { valid: true, available: true };
  });

  this.set('usernameValidated', (result) => {
    run.next(() => {
      assert.ok(result);
    });
  });
  this.set('user', { username: null });
  this.render(hbs`{{signup-username-input user=user usernameValidated=usernameValidated}}`);

  page.fillIn('available');
  await page.keydown();

  assert.ok(page.suggestionsArea.ok);
  assert.notOk(page.suggestionsArea.notOk);
  assert.equal(page.suggestionsArea.suggestions.length, 0);
});

test('it resets to show nothing when cleared', async function(assert) {
  assert.expect(3);

  server.get('/users/username_available', () => {
    return { valid: true, available: true };
  });

  this.set('usernameValidated', (result) => {
    run.next(() => {
      assert.notOk(result);
    });
  });
  this.set('user', { username: 'available' });
  this.render(hbs`{{signup-username-input user=user usernameValidated=usernameValidated}}`);

  page.fillIn('');
  await page.keydown();

  assert.notOk(page.suggestionsArea.visible);
  assert.notOk(page.suggestionsArea.visible);
});
