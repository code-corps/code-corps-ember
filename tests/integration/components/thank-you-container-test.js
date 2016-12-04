import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import thankYouContainerComponent from '../../pages/components/thank-you-container';

let page = PageObject.create(thankYouContainerComponent);

const members = [
  'Rudolph',
  'Charlie Brown',
  'Yukon Cornelius',
  'Frosty the Snowman'
];

function generateMemberships(size) {
  let memberships = [];
  let i = 0;

  for (; i < size; i++) {
    memberships.push({
      role: 'contributor',
      member: {
        name: members[Math.floor(Math.random() * members.length)],
        photoThumbUrl: 'http://fillmurray.com/200/200',
        userRoles: [
          {
            name: 'Contributor'
          }
        ]
      }
    });
  }

  return memberships;
}

moduleForComponent('thank-you-container', 'Integration | Component | thank-you container', {
  integration: true,
  beforeEach() {
    this.set('project', {
      id: 42,
      title: 'A Test Project',
      organization: {
        organizationMemberships: generateMemberships(14)
      }
    });

    page.setContext(this);
    page.render(hbs`{{thank-you-container project=project}}`);
  }
});

test('it renders the thank you text', function(assert) {
  assert.expect(1);

  assert.equal(page.thankYouText, `From all the volunteers on the ${this.get('project.title')} team.`);
});

test('it renders a subset of 12 volunteers', function(assert) {
  assert.expect(1);

  assert.equal(page.volunteers().count, 12);
});
