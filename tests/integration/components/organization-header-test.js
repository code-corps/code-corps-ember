import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/organization-header';

const { Object } = Ember;

let page = PageObject.create(component);

moduleForComponent('organization-header', 'Integration | Component | organization header', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

let organization = Object.create({
  name: 'Test Organization',
  description: 'A test organization',
  iconThumbUrl: 'icon_thumb.png',
  iconLargeUrl: 'icon_large.png'
});

test('it renders properly when not expanded', function(assert) {
  assert.expect(5);

  this.set('organization', organization);

  page.render(hbs`{{organization-header organization=organization}}`);

  assert.notOk(page.isExpanded, 'Does not have expanded class');
  assert.equal(page.image.src, 'icon_thumb.png', 'Has a small image');
  assert.ok(page.image.isSmall, 'Uses the small image class');
  assert.equal(page.title.text, 'Test Organization', 'Shows the name');
  assert.notOk(page.description.isVisible, 'Hides the description');
});

test('it renders properly when expanded', function(assert) {
  assert.expect(5);

  this.set('organization', organization);

  page.render(hbs`{{organization-header organization=organization expanded=true}}`);

  assert.ok(page.isExpanded, 'Has expanded class');
  assert.equal(page.image.src, 'icon_large.png', 'Has a large image');
  assert.ok(page.image.isLarge, 'Uses the small image class');
  assert.equal(page.title.text, 'Test Organization', 'Shows the name');
  assert.ok(page.description.text, 'A test organization', 'Shows the description');
});
