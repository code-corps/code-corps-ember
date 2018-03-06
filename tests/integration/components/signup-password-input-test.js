import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/signup-password-input';

let page = PageObject.create(component);

moduleForComponent('signup-password-input', 'Integration | Component | signup password input', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it shows nothing when empty', function(assert) {
  this.render(hbs`{{signup-password-input}}`);

  assert.notOk(page.suggestionsArea.visible);
});

test('it shows suggestions when needed', function(assert) {
  this.set('user', { password: 'password' });
  this.render(hbs`{{signup-password-input user=user}}`);

  assert.ok(page.suggestionsArea.ok, 'renders a check');
  assert.equal(page.suggestionsArea.suggestions.length, 2);
  assert.equal(page.suggestionsArea.suggestions.objectAt(0).text, 'Tips for a stronger password:');
  assert.equal(page.suggestionsArea.suggestions.objectAt(1).text, 'Add another word or two. Uncommon words are better.');
});

test('it shows password strength', function(assert) {
  // https://xkcd.com/936/
  this.set('user', { password: 'correcthorsebatterystaple' });
  this.render(hbs`{{signup-password-input user=user}}`);

  assert.ok(page.progressBar.displaysPercentage(100));
});

test('it shows minimum length error', function(assert) {
  this.set('user', { password: 'p' });
  this.render(hbs`{{signup-password-input user=user}}`);

  assert.ok(page.suggestionsArea.notOk);
  assert.equal(page.suggestionsArea.suggestions.length, 1);
  assert.equal(page.suggestionsArea.suggestions.objectAt(0).text, 'Your password must be at least 6 characters.');
});
