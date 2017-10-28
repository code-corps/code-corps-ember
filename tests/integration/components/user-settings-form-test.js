import { getOwner } from '@ember/application';
import RSVP from 'rsvp';
import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { getFlashMessageCount } from 'code-corps-ember/tests/helpers/flash-message';
import PageObject from 'ember-cli-page-object';
import userSettingsFormComponent from '../../pages/components/user-settings-form';

let page = PageObject.create(userSettingsFormComponent);

moduleForComponent('user-settings-form', 'Integration | Component | user settings form', {
  integration: true,
  beforeEach() {
    getOwner(this).lookup('service:flash-messages').registerTypes(['success']);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

let user = {
  biography: 'A test user',
  firstName: 'Test',
  lastName: 'User',
  twitter: '@testuser',
  website: 'example.com'
};

test('it renders form elements properly', function(assert) {
  assert.expect(6);

  set(this, 'user', user);

  page.render(hbs`{{user-settings-form user=user}}`);

  assert.equal(page.biographyValue, 'A test user');
  assert.equal(page.firstNameValue, 'Test');
  assert.equal(page.lastNameValue, 'User');
  assert.equal(page.twitterValue, '@testuser');
  assert.equal(page.websiteValue, 'example.com');

  assert.ok(page.saveVisible);
});

test('it calls save on user when save button is clicked', function(assert) {
  assert.expect(2);

  user.save = function() {
    assert.ok(true, 'Save method was called on user');
    return RSVP.resolve();
  };

  set(this, 'user', user);

  page.render(hbs`{{user-settings-form user=user}}`);

  page.clickSave();

  assert.equal(getFlashMessageCount(this), 1, 'A flash message was shown');
});
