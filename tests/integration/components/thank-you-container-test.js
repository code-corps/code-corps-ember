import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import thankYouContainerComponent from 'code-corps-ember/tests/pages/components/thank-you-container';

let page = PageObject.create(thankYouContainerComponent);

const members = [
  'Rudolph',
  'Charlie Brown',
  'Yukon Cornelius',
  'Frosty the Snowman'
];

function generateProjectUsers(size) {
  let projectUsers = [];

  for (let i = 0; i < size; i++) {
    projectUsers.push({
      role: 'contributor',
      user: {
        name: members[Math.floor(Math.random() * members.length)],
        photoThumbUrl: '/assets/images/icons/test.png',
        userRoles: [
          {
            name: 'Contributor'
          }
        ]
      }
    });
  }

  return projectUsers;
}

moduleForComponent('thank-you-container', 'Integration | Component | thank-you container', {
  integration: true,
  beforeEach() {
    this.set('project', {
      id: 42,
      title: 'A Test Project',
      projectUsers: generateProjectUsers(14)
    });

    page.setContext(this);
    this.render(hbs`{{thank-you-container project=project}}`);
  }
});

test('it renders the thank you text', function(assert) {
  assert.expect(1);

  assert.equal(page.thankYouText, `From all the volunteers on the ${this.get('project.title')} team.`);
});

test('it renders a subset of 12 volunteers', function(assert) {
  assert.expect(1);

  assert.equal(page.volunteers.length, 12);
});
