import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import startMirage from '../../helpers/setup-mirage-for-integration';
import wait from 'ember-test-helpers/wait';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/signup-username-input';

let page = PageObject.create(component);

const { run } = Ember;

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
  page.render(hbs`{{signup-username-input}}`);

  assert.notOk(page.suggestionsArea.visible);
  assert.notOk(page.suggestionsArea.visible);
});

test('it shows suggestions when invalid', function(assert) {
  let done = assert.async();
  assert.expect(5);

  server.get('/users/username_available', () => {
    return { valid: false, available: true };
  });

  this.on('usernameValidated', (result) => {
    run.next(() => {
      assert.notOk(result);
    });
  });
  page.render(hbs`{{signup-username-input user=user usernameValidated="usernameValidated"}}`);

  this.set('user', { username: 'lots--of--hypens' });

  wait().then(() => {
    assert.notOk(page.suggestionsArea.ok);
    assert.ok(page.suggestionsArea.notOk);
    assert.equal(page.suggestionsArea.suggestions().count, 1);
    assert.equal(page.suggestionsArea.suggestions(0).text, 'Please enter a username with only letters, numbers, or underscores.');
    done();
  });
});

test('it shows suggestions when unavailable', function(assert) {
  let done = assert.async();
  assert.expect(5);

  server.get('/users/username_available', () => {
    return { valid: true, available: false };
  });

  this.on('usernameValidated', (result) => {
    run.next(() => {
      assert.notOk(result);
    });
  });
  page.render(hbs`{{signup-username-input user=user usernameValidated="usernameValidated"}}`);

  this.set('user', { username: 'taken' });

  wait().then(() => {
    assert.notOk(page.suggestionsArea.ok);
    assert.ok(page.suggestionsArea.notOk);
    assert.equal(page.suggestionsArea.suggestions().count, 1);
    assert.equal(page.suggestionsArea.suggestions(0).text, 'This username is already registered. Want to login?');
    done();
  });
});

test('it shows ok when valid and available', function(assert) {
  let done = assert.async();
  assert.expect(4);

  server.get('/users/username_available', () => {
    return { valid: true, available: true };
  });

  this.on('usernameValidated', (result) => {
    run.next(() => {
      assert.ok(result);
    });
  });
  page.render(hbs`{{signup-username-input user=user usernameValidated="usernameValidated"}}`);

  this.set('user', { username: 'available' });

  wait().then(() => {
    assert.ok(page.suggestionsArea.ok);
    assert.notOk(page.suggestionsArea.notOk);
    assert.equal(page.suggestionsArea.suggestions().count, 0);
    done();
  });
});

test('it resets to show nothing when cleared', function(assert) {
  let done = assert.async();
  assert.expect(3);

  server.get('/users/username_available', () => {
    return { valid: true, available: true };
  });

  this.on('usernameValidated', (result) => {
    run.next(() => {
      assert.notOk(result);
    });
  });
  this.set('user', { username: 'available' });
  page.render(hbs`{{signup-username-input user=user usernameValidated="usernameValidated"}}`);

  this.set('user', { username: '' });

  wait().then(() => {
    assert.notOk(page.suggestionsArea.visible);
    assert.notOk(page.suggestionsArea.visible);
    done();
  });
});
