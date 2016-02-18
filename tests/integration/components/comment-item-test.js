import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

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

test('it switches between editing and viewing mode', function(assert) {
  assert.expect(3);

  let mockSession = Ember.Service.extend({
    isAuthenticated: true,
    session: {
      authenticated: {
        user_id: 1
      }
    }
  });

  let mockComment = Ember.Object.create({
    title: 'A post',
    body: 'A <strong>body</strong>',
    postType: 'issue',
    user: {
      id: 1
    },
    save() {
      return Ember.RSVP.resolve();
    }
  });

  this.container.registry.register('service:session', mockSession);

  this.set('comment', mockComment);
  this.render(hbs`{{comment-item comment=comment}}`);

  this.$('.edit').click();
  assert.equal(this.$('.comment-item.editing').length, 1, 'Component switched the UI to editing mode');
  this.$('.cancel').click();
  assert.equal(this.$('.comment-item.editing').length, 0, 'Component switched back the UI to view mode on cancel');
  this.$('.edit').click();
  this.$('.save').click();
  assert.equal(this.$('.comment-item.editing').length, 0, 'Component switched back the UI to view mode on save');
});
