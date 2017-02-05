import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import organizationMembers from 'code-corps-ember/tests/pages/components/organization-members';

let page = PageObject.create(organizationMembers);

moduleForComponent('organization-members', 'Integration | Component | organization members', {
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

  let mockMembers = [];
  for (let i = 1; i <= 3; i++) {
    mockMembers.push({
      id: i,
      isLoaded: true,
      photoThumbUrl: `image_${i}.png`
    });
  }

  this.set('members', mockMembers);
  page.render(hbs`{{organization-members members=members}}`);

  assert.equal(page.memberCount, 3, 'The correct number of members are rendered');
  assert.ok(page.members(0).imageSource.indexOf('image_1.png') > -1, 'The correct photo renders');
});

test('it renders loading items differently', function(assert) {
  assert.expect(2);

  let mockMembers = [
    {
      isLoaded: false,
      photoThumbUrl: 'image.png'
    }
  ];

  this.set('members', mockMembers);
  page.render(hbs`{{organization-members members=members}}`);

  assert.notOk(page.members(0).imageIsVisible, 'The photo does not render');
  assert.ok(page.members(0).placeholderIsVisible, 'The placeholder renders');
});
