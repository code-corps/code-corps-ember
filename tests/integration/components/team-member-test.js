import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('team-member', 'Integration | Component | team member', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{team-member name="Nikola Begedin" imageSlug="nikola-begedin"}}`);

  assert.equal(this.$().text().trim(), 'Nikola Begedin');
  assert.equal(this.$('img').attr('src'), 'https://d3pgew4wbk2vb1.cloudfront.net/images/team/nikola-begedin.png');
});
