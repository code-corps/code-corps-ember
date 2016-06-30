import Ember from 'ember';
import { faker } from 'ember-cli-mirage';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('project-grid-item-members-list', 'Integration | Component | project grid item members list', {
  integration: true
});

function createMembers(count) {
  let members = [];
  for (let i = 1; i <= count; i++) {
    members.push(Ember.Object.create({
      photoThumbUrl: faker.internet.avatar
    }));
  }
  return members;
}

const allMembersVisible = createMembers(6);
const someMembersHidden = createMembers(9);

test('it shows all members if less than 7', function(assert) {
  this.set('members', allMembersVisible);

  this.render(hbs`{{project-grid-item-members-list members=members}}`);

  assert.equal(this.$('.icon.tiny.circle').length, 6, 'All 6 icons are rendered');
  assert.ok(this.$().text().trim().indexOf('more') === -1, "The 'more' text isn't rendered");
});

test('it shows all members if more than 7', function(assert) {
  this.set('members', someMembersHidden);

  this.render(hbs`{{project-grid-item-members-list members=members}}`);

  assert.equal(this.$('.icon.tiny.circle').length, 7, '7 icons are rendered');
  assert.ok(this.$().text().trim().indexOf('+ 2 more') === -1, "The '+ 2 more' text is rendered");
});
