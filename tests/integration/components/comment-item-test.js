import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('comment-item', 'Integration | Component | comment item', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);
  this.render(hbs`{{comment-item}}`);

  assert.equal(this .$('.comment-item').length, 1, 'Component\' element is rendered');
});


test('it renders all required comment elements properly', function(assert) {
  assert.expect(3);

  let user = { id: 1, username: 'tester' };
  let comment = { id: 1, body: 'A <b>comment</b>', user: user };

  this.set('comment', comment);
  this.render(hbs`{{comment-item comment=comment}}`);

  assert.equal(this.$('.comment-item .body').html(), 'A <b>comment</b>', 'The comment\'s body is rendered');
  assert.equal(this.$('.comment-item .body b').length, 1, 'The comment\'s body is rendered unescaped');
  assert.equal(this.$('.comment-item .username').text().trim(), 'tester');
});
