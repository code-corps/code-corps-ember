import { set } from '@ember/object';
import { faker } from 'ember-cli-mirage';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import pageComponent from 'code-corps-ember/tests/pages/components/project-card/project-users';

let page = PageObject.create(pageComponent);

moduleForComponent('project-card/project-users', 'Integration | Component | project card/project users', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

function createProjectUsers(count) {
  let users = [];
  for (let i = 1; i <= count; i++) {
    users.push({
      photoThumbUrl: faker.internet.avatar()
    });
  }
  return users;
}

const allUsersVisible = createProjectUsers(6);
const someUsersHidden = createProjectUsers(9);

test('it shows all users if less than 8', function(assert) {
  set(this, 'projectUsers', allUsersVisible);

  this.render(hbs`{{project-card/project-users projectUsers=projectUsers}}`);

  assert.equal(page.users.length, 6, 'All 6 users are rendered');
  assert.notOk(page.userCount.isVisible, "The 'more' text isn't rendered");
});

test('it shows all users if more than 8', function(assert) {
  set(this, 'projectUsers', someUsersHidden);

  this.render(hbs`{{project-card/project-users projectUsers=projectUsers}}`);

  assert.equal(page.users.length, 8, '8 users are rendered');
  assert.equal(page.userCount.text, '+1 more', "The '+1 more' text is rendered");
});
