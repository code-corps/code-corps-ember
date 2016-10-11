import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

const {
  Object,
  Service
} = Ember;

moduleForComponent('organization-header', 'Integration | Component | organization header', {
  integration: true,
  beforeEach() {
    this.register('service:credentials', mockCredentials);
  }
});

let user = Object.create({});
let organization = Object.create({
  name: 'Test Organization',
  description: 'A test organization',
  iconThumbUrl: 'icon_thumb.png',
  iconLargeUrl: 'icon_large.png'
});

let mockCredentials = Service.extend({
  currentUserMembership: Object.create({
    member: user,
    organization,
    role: 'admin'
  })
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{organization-header}}`);

  assert.equal(this.$('.organization-header').length, 1);
});

test('it renders properly when not expanded', function(assert) {
  assert.expect(5);

  this.set('organization', organization);

  this.render(hbs`{{organization-header organization=organization}}`);

  assert.notOk(this.$('.organization-header').hasClass('expanded'), 'Does not have expanded class');
  assert.equal(this.$('img').attr('src'), 'icon_thumb.png', 'Has a small image');
  assert.ok(this.$('img').hasClass('icon'), 'Uses the small image class');
  assert.equal(this.$('h2').text().trim(), 'Test Organization', 'Shows the name');
  assert.equal(this.$('p').length, 0, 'Hides the description');
});

test('it renders properly when expanded', function(assert) {
  assert.expect(5);

  this.set('organization', organization);

  this.render(hbs`{{organization-header organization=organization expanded=true}}`);

  assert.ok(this.$('.organization-header').hasClass('expanded'), 'Has expanded class');
  assert.equal(this.$('img').attr('src'), 'icon_large.png', 'Has a large image');
  assert.ok(this.$('img').hasClass('icon large'), 'Uses the small image class');
  assert.equal(this.$('h2').text().trim(), 'Test Organization', 'Shows the name');
  assert.equal(this.$('p').text().trim(), 'A test organization', 'Shows the description');
});
