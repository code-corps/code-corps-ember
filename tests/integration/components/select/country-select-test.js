import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import selectCountry from '../../../pages/components/select/country-select';
import PageObject from 'ember-cli-page-object';

function setHandler(context, onChange = function() {}) {
  set(context, 'onChange', onChange);
}

function renderPage() {
  page.render(hbs`{{select/country-select country=country onChange=onChange}}`);
}

let page = PageObject.create(selectCountry);

moduleForComponent('select/country-select', 'Integration | Component | select/country select', {
  integration: true,
  beforeEach() {
    setHandler(this);
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

// we can't really write an 'it selects' test, since there's only one selectable item
test('it triggers action on selection change', function(assert) {
  assert.expect(1);
  set(this, 'country', 'US');

  setHandler(this, (value) => {
    assert.equal(value, 'US', 'Action was triggered with proper parameter');
  });

  renderPage();

  page.country.fillIn('US');
});
