import Ember from 'ember';
import { faker } from 'ember-cli-mirage';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('project-card-members', 'Integration | Component | project card members', {
  integration: true
});

function createMembers(count) {
  let members = [];
  for (let i = 1; i <= count; i++) {
    members.push(Ember.Object.create({
      photoThumbUrl: faker.internet.avatar()
    }));
  }
  return members;
}

const allMembersVisible = createMembers(6);
const someMembersHidden = createMembers(9);

test('it shows all members if less than 8', function(assert) {
  this.set('members', allMembersVisible);

  this.render(hbs`{{project-card-members members=members}}`);

  assert.equal(this.$('.icon.tiny.circle').length, 6, 'All 6 icons are rendered');
  assert.equal(this.$('.count').length, 0, "The 'more' text isn't rendered");
});

test('it shows all members if more than 8', function(assert) {
  this.set('members', someMembersHidden);

  this.render(hbs`{{project-card-members members=members}}`);

  assert.equal(this.$('.icon.tiny.circle').length, 8, '8 icons are rendered');
  assert.equal(this.$('.count').text().trim(), '+1 more', "The '+1 more' text is rendered");
});
