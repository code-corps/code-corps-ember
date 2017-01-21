import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import selectCountry from '../../../pages/components/select/country-select';
import PageObject from 'ember-cli-page-object';

const {
  get,
  set
} = Ember;

let page = PageObject.create(selectCountry);

moduleForComponent('select/country-select', 'Integration | Component | select/country select', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it sets the correct country', function(assert) {
  assert.expect(1);
  set(this, 'country', 'US');
  page.render(hbs`{{select/country-select country=country}}`);
  page.country.fillIn('US');
  let country = get(this, 'country');
  assert.equal(country, 'US');
});
