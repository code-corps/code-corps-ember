import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/site-footer';

let page = PageObject.create(component);

moduleForComponent('site-footer', 'Integration | Component | site footer', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders all elements', function(assert) {
  page.render(hbs`{{site-footer}}`);

  assert.equal(page.columns().count, 4);

  assert.equal(page.columns(0).header, 'Code Corps');
  assert.equal(page.columns(1).header, 'Help');
  assert.equal(page.columns(2).header, 'Learn');
  assert.equal(page.columns(3).header, 'Connect');

  assert.equal(page.columns(0).rows(0).text, 'About us');
  assert.equal(page.columns(0).rows(1).text, 'Team');

  assert.equal(page.columns(1).rows(0).text, 'Help Center');
  assert.equal(page.columns(1).rows(0).link.href, 'https://help.codecorps.org');
  assert.equal(page.columns(1).rows(1).text, 'Terms of Use');
  assert.equal(page.columns(1).rows(2).text, 'Privacy Policy');

  assert.equal(page.columns(2).rows(0).text, 'Blog');

  assert.equal(page.columns(3).rows(0).text, 'GitHub');
  assert.equal(page.columns(3).rows(0).link.href, 'https://github.com/code-corps');
  assert.equal(page.columns(3).rows(1).text, 'Slack');
  assert.equal(page.columns(3).rows(1).link.href, 'http://slack.codecorps.org');
  assert.equal(page.columns(3).rows(2).text, 'Twitter');
  assert.equal(page.columns(3).rows(2).link.href, 'https://twitter.com/thecodecorps');
  assert.equal(page.columns(3).rows(3).text, 'Facebook');
  assert.equal(page.columns(3).rows(3).link.href, 'https://www.facebook.com/thecodecorps');
});
