import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('post-details', 'Integration | Component | post details', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{post-details}}`);

  assert.equal(this.$('.post-details').length, 1, 'The component\'s element is rendered');
});


test('it renders all the ui elements properly bound', function(assert) {
  this.set('post', { title: 'A post', body: 'A body', postType: 'issue' });

  this.render(hbs`{{post-details post=post}}`);

  assert.equal(this.$('.post-details .title').text().trim(), 'A post', 'Title is correctly bound and rendered');
  assert.equal(this.$('.post-details .body').text().trim(), 'A body', 'Body is correctly bound and rendered');
  assert.equal(this.$('.post-details .post-type').text().trim(), 'issue', 'Post type is correctly bound and rendered');
});

