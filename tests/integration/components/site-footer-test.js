import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/site-footer';
import { setBreakpointForIntegrationTest } from 'code-corps-ember/tests/helpers/responsive';
import stubService from 'code-corps-ember/tests/helpers/stub-service';

let page = PageObject.create(component);

function renderPage() {
  page.render(hbs`{{site-footer media=media}}`);
}

function assertReducedFooter(assert) {
  assert.equal(page.rows().count, 6);

  assert.equal(page.rows(0).text, 'About');
  assert.equal(page.rows(1).text, 'Team');
  assert.equal(page.rows(2).text, 'Help');
  assert.equal(page.rows(2).link.href, 'https://help.codecorps.org');
  assert.equal(page.rows(3).text, 'Terms');
  assert.equal(page.rows(4).text, 'Privacy');
  assert.equal(page.rows(5).text, 'Blog');
}

moduleForComponent('site-footer', 'Integration | Component | site footer', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders all elements when showing the full footer', function(assert) {
  setBreakpointForIntegrationTest(this, 'full');
  stubService(this, 'site-footer', { isReduced: false });

  renderPage();

  assert.equal(page.columns().count, 4);

  assert.equal(page.columns(0).header, 'Code Corps');
  assert.equal(page.columns(1).header, 'Help');
  assert.equal(page.columns(2).header, 'Learn');
  assert.equal(page.columns(3).header, 'Connect');

  page.columns(0).as((column) => {
    assert.equal(column.rows(0).text, 'About us');
    assert.equal(column.rows(1).text, 'Team');
  });

  page.columns(1).as((column) => {
    assert.equal(column.rows(0).text, 'Help Center');
    assert.equal(column.rows(0).link.href, 'https://help.codecorps.org');
    assert.equal(column.rows(1).text, 'Terms of Use');
    assert.equal(column.rows(2).text, 'Privacy Policy');
  });

  assert.equal(page.columns(2).rows(0).text, 'Blog');

  page.columns(3).as((column) => {
    assert.equal(column.rows(0).text, 'GitHub');
    assert.equal(column.rows(0).link.href, 'https://github.com/code-corps');
    assert.equal(column.rows(1).text, 'Slack');
    assert.equal(column.rows(1).link.href, 'http://slack.codecorps.org');
    assert.equal(column.rows(2).text, 'Twitter');
    assert.equal(column.rows(2).link.href, 'https://twitter.com/thecodecorps');
    assert.equal(column.rows(3).text, 'Facebook');
    assert.equal(column.rows(3).link.href, 'https://www.facebook.com/thecodecorps');
  });
});

test('it renders only the horizontal elements when showing the reduced footer', function(assert) {
  setBreakpointForIntegrationTest(this, 'full');
  stubService(this, 'site-footer', { isReduced: true });

  renderPage();

  assertReducedFooter(assert);
});

test('it renders only the horizontal elements for the medium breakpoint', function(assert) {
  setBreakpointForIntegrationTest(this, 'medium');
  stubService(this, 'site-footer', { isReduced: false });

  renderPage();

  assertReducedFooter(assert);
});
