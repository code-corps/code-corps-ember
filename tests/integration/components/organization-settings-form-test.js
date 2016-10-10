import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const {
  RSVP,
  Service
} = Ember;

moduleForComponent('organization-settings-form', 'Integration | Component | organization settings form', {
  integration: true
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

  this.set('organization', organization);

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

  this.set('organization', organization);

  let flashServiceStub = Service.extend({
    success() {
      assert.ok(true, 'Flash message service was called');
    }
  });

  this.register('service:flash-messages', flashServiceStub);

  this.render(hbs`{{organization-settings-form organization=organization}}`);

  this.$('.save').click();
});
