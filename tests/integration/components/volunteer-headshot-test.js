import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import volunteerHeadshot from '../../pages/components/volunteer-headshot';

let page = PageObject.create(volunteerHeadshot);

const userRoles = [
  { role: { name: 'Developer' } },
  { role: { name: 'Ember Developer' } },
  { role: { name: 'UX Designer' } },
  { role: { name: 'Software Engineer' } },
  { role: { name: 'Project Coordinator' } },
  { role: { name: 'Designer & Developer' } }
];

moduleForComponent('volunteer-headshot', 'Integration | Component | volunteer headshot', {
  integration: true,
  beforeEach() {
    this.set('user', {
      name: 'Test User',
      photoThumbUrl: '/assets/images/icons/test.png',
      userRoles
    });
    page.setContext(this);
    page.render(hbs`{{volunteer-headshot volunteer=user}}`);
  }
});

test('it renders the volunteer\'s name', function(assert) {
  assert.expect(1);
  assert.equal(page.name, this.get('user.name'));
});

test('it computes username if name is not present', function(assert) {
  let username = 'Ace';

  this.set('user.name', null);
  this.set('user.username', username);
  assert.equal(page.name, `${username}`);
});

test('it randomly selects one of the available roles', function(assert) {
  assert.expect(1);

  let roles = userRoles.map((userRole) => {
    return userRole.role.name;
  });
  assert.ok(roles.includes(page.role));
});

test('it sets the image alt text', function(assert) {
  assert.expect(1);
  assert.equal(page.image.alt, `${this.get('user.name')}`);
});

test('it sets the image src', function(assert) {
  assert.expect(1);
  assert.equal(page.image.src, this.get('user.photoThumbUrl'));
});
