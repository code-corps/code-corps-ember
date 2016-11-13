import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('organization-members', 'Integration | Component | organization members', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{organization-members}}`);

  assert.equal(this.$('.organization-members').length, 1, 'The component\'s element is rendered');
});

test('it renders an item for each member in the list', function(assert) {
  assert.expect(2);

  let mockMembers = [];
  for (let i = 1; i <= 3; i++) {
    mockMembers.push({
      id: i,
      photoThumbUrl: `image_${i}.png`
    });
  }

  this.set('members', mockMembers);
  this.render(hbs`{{organization-members members=members}}`);

  assert.equal(this.$('li').length, 3, 'The correct number of members are rendered');
  assert.equal(this.$('li:eq(0) img').attr('src'), 'image_1.png', 'The correct photo renders');
});
