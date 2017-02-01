import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { getFlashMessageCount } from 'code-corps-ember/tests/helpers/flash-message';

const { getOwner, RSVP, set } = Ember;

moduleForComponent('organization-settings-form', 'Integration | Component | organization settings form', {
  integration: true,
  beforeEach() {
    getOwner(this).lookup('service:flash-messages').registerTypes(['success']);
  }
});

let organization = {
  name: 'Test Organization',
  description: 'A test organization'
};

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{organization-settings-form}}`);

  assert.equal(this.$('.organization-settings-form').length, 1);
});

test('it renders form elements properly', function(assert) {
  assert.expect(3);

  set(this, 'organization', organization);

  this.render(hbs`{{organization-settings-form organization=organization}}`);

  assert.equal(this.$('input[name=name]').val(), 'Test Organization');
  assert.equal(this.$('input[name=description]').val(), 'A test organization');

  assert.equal(this.$('.save').length, 1);
});

test('it calls save on organization when save button is clicked', function(assert) {
  assert.expect(2);

  organization.save = function() {
    assert.ok(true, 'Save method was called on organization');
    return RSVP.resolve();
  };

  set(this, 'organization', organization);

  this.render(hbs`{{organization-settings-form organization=organization}}`);

  this.$('.save').click();

  assert.equal(getFlashMessageCount(this), 1, 'A flash message was shown');
});
