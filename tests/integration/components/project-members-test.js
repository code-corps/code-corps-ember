import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import pageComponent from 'code-corps-ember/tests/pages/components/project-members';

let page = PageObject.create(pageComponent);

moduleForComponent('project-members', 'Integration | Component | project members', {
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
  for (let i = 1; i <= 3; i++) {
    mockUsers.push({
      id: i,
      isLoaded: true,
      photoThumbUrl: `image_${i}.png`
    });
  }

  this.set('users', mockUsers);
  page.render(hbs`{{project-members users=users}}`);

  assert.equal(page.memberCount, 3, 'The correct number of members are rendered');
  assert.ok(page.members(0).imageSource.indexOf('image_1.png') > -1, 'The correct photo renders');
});

test('it renders loading items differently', function(assert) {
  assert.expect(2);

  let mockUsers = [
    {
      isLoaded: false,
      photoThumbUrl: 'image.png'
    }
  ];

  this.set('users', mockUsers);
  page.render(hbs`{{project-members users=users}}`);

  assert.notOk(page.members(0).imageIsVisible, 'The photo does not render');
  assert.ok(page.members(0).placeholderIsVisible, 'The placeholder renders');
});
