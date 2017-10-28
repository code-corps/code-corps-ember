import { setProperties } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import pageComponent from 'code-corps-ember/tests/pages/components/select-inline-dropdown/list-item';
import PageObject from 'ember-cli-page-object';

let page = PageObject.create(pageComponent);

moduleForComponent(
  'select-inline-dropdown/list-item',
  'Integration | Component | select inline dropdown/list item', {
    integration: true,
    beforeEach() {
      page.setContext(this);
    },
    afterEach() {
      page.removeContext();
    }
  }
);

function renderPage() {
  page.render(hbs`
    {{select-inline-dropdown/list-item
      iconUrl=iconUrl
      primaryText=primaryText
      secondaryText=secondaryText
      lastSearchedText=lastSearchedText
    }}`);
}

test('it renders correctly', function(assert) {
  assert.expect(5);

  let iconUrl = 'testurl';
  let primaryText = 'Test';
  let secondaryText = 'testuser';
  let lastSearchedText = 'est';

  setProperties(this, { iconUrl, primaryText, secondaryText, lastSearchedText });

  renderPage();

  assert.equal(page.icon.url, iconUrl, 'Icon is rendered.');
  assert.equal(page.primary.text, primaryText, 'Primary text is rendered.');
  assert.equal(page.primary.highlighted.text, lastSearchedText, 'Filtered text is rendered on primary.');
  assert.equal(page.secondary.text, secondaryText, 'Secondary text is rendered.');
  assert.equal(page.secondary.highlighted.text, lastSearchedText, 'Filtered text is rendered on secondary.');
});
