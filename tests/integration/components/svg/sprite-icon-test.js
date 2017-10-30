import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import component from 'code-corps-ember/tests/pages/components/svg/sprite-icon';
import PageObject from 'ember-cli-page-object';

let page = PageObject.create(component);

function renderPage() {
  page.render(hbs`
    {{svg/sprite-icon
      icon=icon
      style=style
    }}
  `);
}

moduleForComponent('svg/sprite-icon', 'Integration | Component | svg/sprite icon', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders the icon and style', function(assert) {
  assert.expect(2);

  set(this, 'icon', 'github-48');
  set(this, 'style', 'solid-light-gray');

  renderPage();

  assert.equal(page.svg.use.xlinkHref, '#github-48', 'The icon xlink href value is properly bound.');
  assert.ok(page.svg.hasClass('solid-light-gray'), 'The svg has the style class.');
});

test('it renders the default size', function(assert) {
  assert.expect(1);
  renderPage();
  assert.ok(page.svg.hasClass('size-16'), 'The svg has a default size.');
});

test('it renders a different size', function(assert) {
  assert.expect(1);
  set(this, 'size', '50');
  renderPage();
  assert.ok(page.svg.hasClass('size-50'), 'The svg renders the passed size.');
});
