import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import userOrganizationList from '../../pages/components/user-organizations-list';
import Ember from 'ember';

const { set } = Ember;
let page = PageObject.create(userOrganizationList);

moduleForComponent('user-organizations-list', 'Integration | Component | user organizations list', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('with no organizations renders all required elements', function(assert) {
  assert.expect(2);

  // No organizations
  set(this, 'organizations', []);

  set(this, 'user', {
    username: 'JoshSmith'
  });

  page.render(hbs`{{user-organizations-list user=user organizations=organizations}}`);

  assert.equal(page.header, 'Organizations', 'The header renders');
  assert.equal(page.emptyState, 'JoshSmith', 'Component\'s element is rendered');
});

test('with several organizations renders all required elements', function(assert) {
  assert.expect(5);

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

  set(this, 'organizations', mockOrganizations);

  set(this, 'user', {
    username: 'JoshSmith'
  });

  page.render(hbs`{{user-organizations-list user=user organizations=organizations}}`);

  assert.equal(page.header, 'Organizations', 'The header renders');
  assert.equal(page.listItemCount, 3, 'All organization items render');
  assert.equal(page.organizationTitle, 'Organization 1', 'The organization title renders');
  assert.equal(page.organizationDescription, 'Organization 1 description', 'The organization description renders');
  assert.ok(page.organizationIconSrc.indexOf('icon_1.png') > -1, 'The organization icon renders');
});
