import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import pageComponent from 'code-corps-ember/tests/pages/components/project-users';
import { set } from '@ember/object';

let page = PageObject.create(pageComponent);

moduleForComponent('project-users', 'Integration | Component | project users', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders an item for each member in the list', function(assert) {
  assert.expect(2);

  let mockUsers = [];
  for (let i = 1; i <= 19; i++) {
    mockUsers.push({
      id: i,
      isLoaded: true,
      photoThumbUrl: `image_${i}.png`
    });
  }

  set(this, 'users', mockUsers);
  page.render(hbs`{{project-users users=users}}`);

  assert.equal(page.userCount, 18, 'The correct number of users are rendered');
  assert.ok(page.users(0).imageSource.indexOf('image_1.png') > -1, 'The correct photo renders');
});

test('it renders loading items differently', function(assert) {
  assert.expect(2);

  let mockUsers = [
    {
      isLoaded: false,
      photoThumbUrl: 'image.png'
    }
  ];

  set(this, 'users', mockUsers);
  page.render(hbs`{{project-users users=users}}`);

  assert.notOk(page.users(0).imageIsVisible, 'The photo does not render');
  assert.ok(page.users(0).placeholderIsVisible, 'The placeholder renders');
});
