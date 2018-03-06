import { getOwner } from '@ember/application';
import RSVP from 'rsvp';
import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { getFlashMessageCount } from 'code-corps-ember/tests/helpers/flash-message';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/organization-settings-form';

let page = PageObject.create(component);

moduleForComponent('organization-settings-form', 'Integration | Component | organization settings form', {
  integration: true,
  beforeEach() {
    getOwner(this).lookup('service:flash-messages').registerTypes(['success']);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

let organization = {
  name: 'Test Organization',
  description: 'A test organization'
};

test('it renders form elements', function(assert) {
  assert.expect(3);

  set(this, 'organization', organization);

  this.render(hbs`{{organization-settings-form organization=organization}}`);

  assert.equal(page.name.value, 'Test Organization');
  assert.equal(page.description.value, 'A test organization');
  assert.ok(page.save.isVisible);
});

test('it calls save on organization when save button is clicked', function(assert) {
  assert.expect(2);

  organization.save = function() {
    assert.ok(true, 'Save method was called on organization');
    return RSVP.resolve();
  };

  set(this, 'organization', organization);

  this.render(hbs`{{organization-settings-form organization=organization}}`);

  page.save.click();

  assert.equal(getFlashMessageCount(this), 1, 'A flash message was shown');
});
