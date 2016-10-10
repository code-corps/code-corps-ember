import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('user-organizations-list', 'Integration | Component | user organizations list', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{user-organizations-list}}`);

  assert.equal(this.$('.user-organizations-list').length, 1, 'Component\'s element is rendered');
});

test('with no organizations renders all required elements', function(assert) {
  assert.expect(3);

  // No organizations
  this.set('organizations', []);

  this.set('user', {
    username: 'JoshSmith'
  });

  this.render(hbs`{{user-organizations-list user=user organizations=organizations}}`);

  assert.equal(this.$('.user-organizations-list').length, 1, 'Component\'s element is rendered');
  assert.equal(this.$('h2').text(), 'Organizations', 'The header renders');
  assert.equal(this.$('.empty-state strong').text(), 'JoshSmith', 'Component\'s element is rendered');
});

test('with several organizations renders all required elements', function(assert) {
  assert.expect(6);

  let mockOrganizations = [];
  for (let i = 1; i <= 3; i++) {
    mockOrganizations.push({
      id: i,
      name: `Organization ${i}`,
      slug: `organization_${i}`,
      description: `Organization ${i} description`,
      iconThumbUrl: `/icon_${i}.png`
    });
  }

  this.set('organizations', mockOrganizations);

  this.set('user', {
    username: 'JoshSmith'
  });

  this.render(hbs`{{user-organizations-list user=user organizations=organizations}}`);

  assert.equal(this.$('.user-organizations-list').length, 1, 'Component\'s element is rendered');
  assert.equal(this.$('h2').text(), 'Organizations', 'The header renders');
  assert.equal(this.$('li').length, 3, 'All organization items render');
  assert.equal(this.$('li:first h3').text().trim(), 'Organization 1', 'The organization header renders');
  assert.equal(this.$('li:first p').text().trim(), 'Organization 1 description', 'The organization description renders');
  assert.equal(this.$('li:first img').attr('src'), '/icon_1.png', 'The organization image renders');
});