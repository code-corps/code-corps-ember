import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'code-corps-ember/tests/helpers/stub-service';

moduleForComponent('project-categories-list', 'Integration | Component | project categories list', {
  integration: true
});

let categories = [
  {
    id: 2,
    name: 'Society'
  },
  {
    id: 1,
    name: 'Zoology'
  },
  {
    id: 3,
    name: 'Alphabets'
  }
];

test('it renders the categories and sorts them by name', function(assert) {
  assert.expect(4);

  stubService(this, 'user-categories', { findUserCategory() {} });

  this.set('categories', categories);
  this.render(hbs`{{project-categories-list categories=categories}}`);

  assert.equal(this.$('li').length, 3);
  assert.equal(this.$('li:eq(0) .ember-tooltip').text().trim(), 'Alphabets');
  assert.equal(this.$('li:eq(1) .ember-tooltip').text().trim(), 'Society');
  assert.equal(this.$('li:eq(2) .ember-tooltip').text().trim(), 'Zoology');
});
