import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('site-footer', 'Integration | Component | site footer', {
  integration: true
});

test('it renders all elements', function(assert) {
  this.render(hbs`{{site-footer}}`);

  assert.equal(this.$('ul.footer-columns > li').length, 5);

  assert.equal(this.$('.footer-logo').length, 1);

  assert.equal(this.$('ul.footer-columns > li:eq(1) h4').text().trim(), 'Code Corps');
  assert.equal(this.$('ul.footer-columns > li:eq(2) h4').text().trim(), 'Help');
  assert.equal(this.$('ul.footer-columns > li:eq(3) h4').text().trim(), 'Learn');
  assert.equal(this.$('ul.footer-columns > li:eq(4) h4').text().trim(), 'Connect');

  assert.equal(this.$('ul.footer-columns > li:eq(1) li:eq(0)').text().trim(), 'About us');
  assert.equal(this.$('ul.footer-columns > li:eq(1) li:eq(1)').text().trim(), 'Team');

  assert.equal(this.$('ul.footer-columns > li:eq(2) li:eq(0)').text().trim(), 'team@codecorps.org');
  assert.equal(this.$('ul.footer-columns > li:eq(2) li:eq(1)').text().trim(), 'Terms of Use');
  assert.equal(this.$('ul.footer-columns > li:eq(2) li:eq(2)').text().trim(), 'Privacy Policy');

  assert.equal(this.$('ul.footer-columns > li:eq(2) li:eq(0) a').attr('href'), 'mailto:team@codecorps.org');

  assert.equal(this.$('ul.footer-columns > li:eq(3) li:eq(0)').text().trim(), 'Blog');

  assert.equal(this.$('.github').text().trim(), 'GitHub');
  assert.equal(this.$('.slack').text().trim(), 'Slack');
  assert.equal(this.$('.twitter').text().trim(), 'Twitter');
  assert.equal(this.$('.facebook').text().trim(), 'Facebook');

  assert.equal(this.$('.github').attr('href'), 'https://github.com/code-corps');
  assert.equal(this.$('.slack').attr('href'), 'http://slack.codecorps.org');
  assert.equal(this.$('.twitter').attr('href'), 'https://twitter.com/thecodecorps');
  assert.equal(this.$('.facebook').attr('href'), 'https://www.facebook.com/thecodecorps');
});
