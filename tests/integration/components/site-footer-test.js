import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/site-footer';
import { setBreakpointForIntegrationTest } from 'code-corps-ember/tests/helpers/responsive';
import stubService from 'code-corps-ember/tests/helpers/stub-service';

let page = PageObject.create(component);

function assertReducedFooter(assert) {
  assert.equal(page.rows.length, 6);

  assert.equal(page.rows.objectAt(0).text, 'About');
  assert.equal(page.rows.objectAt(1).text, 'Team');
  assert.equal(page.rows.objectAt(2).text, 'Help');
  assert.equal(page.rows.objectAt(2).link.href, 'https://help.codecorps.org');
  assert.equal(page.rows.objectAt(3).text, 'Terms');
  assert.equal(page.rows.objectAt(4).text, 'Privacy');
  assert.equal(page.rows.objectAt(5).text, 'Blog');
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
  stubService(this, 'site-footer', { isShrunken: false });

  this.render(hbs`{{site-footer media=media}}`);

  assert.equal(page.columns.length, 4);

  assert.equal(page.columns.objectAt(0).header, 'Code Corps');
  assert.equal(page.columns.objectAt(1).header, 'Help');
  assert.equal(page.columns.objectAt(2).header, 'Learn');
  assert.equal(page.columns.objectAt(3).header, 'Connect');

  page.columns.objectAt(0).as((column) => {
    assert.equal(column.rows.objectAt(0).text, 'About us');
    assert.equal(column.rows.objectAt(1).text, 'Team');
  });

  page.columns.objectAt(1).as((column) => {
    assert.equal(column.rows.objectAt(0).text, 'Help Center');
    assert.equal(column.rows.objectAt(0).link.href, 'https://help.codecorps.org');
    assert.equal(column.rows.objectAt(1).text, 'Terms of Use');
    assert.equal(column.rows.objectAt(2).text, 'Privacy Policy');
  });

  assert.equal(page.columns.objectAt(2).rows.objectAt(0).text, 'Blog');

  page.columns.objectAt(3).as((column) => {
    assert.equal(column.rows.objectAt(0).text, 'GitHub');
    assert.equal(column.rows.objectAt(0).link.href, 'https://github.com/code-corps');
    assert.equal(column.rows.objectAt(1).text, 'Slack');
    assert.equal(column.rows.objectAt(1).link.href, 'http://slack.codecorps.org');
    assert.equal(column.rows.objectAt(2).text, 'Twitter');
    assert.equal(column.rows.objectAt(2).link.href, 'https://twitter.com/thecodecorps');
    assert.equal(column.rows.objectAt(3).text, 'Facebook');
    assert.equal(column.rows.objectAt(3).link.href, 'https://www.facebook.com/thecodecorps');
  });
});

test('it renders only the horizontal elements when showing the shrunken footer', function(assert) {
  setBreakpointForIntegrationTest(this, 'full');
  stubService(this, 'site-footer', { isShrunken: true });

  this.render(hbs`{{site-footer media=media}}`);

  assertReducedFooter(assert);
});

test('it renders only the horizontal elements for the medium breakpoint', function(assert) {
  setBreakpointForIntegrationTest(this, 'medium');
  stubService(this, 'site-footer', { isShrunken: false });

  this.render(hbs`{{site-footer media=media}}`);

  assertReducedFooter(assert);
});
