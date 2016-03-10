import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

let mockPost = Ember.Object.create({
  title: 'A post',
  body: 'A <strong>body</strong>',
  postType: 'issue',
  save() {
    this.set('bodyPreview', this.get('body'));
    return Ember.RSVP.resolve();
  }
});

moduleForComponent('post-header', 'Integration | Component | post header', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(1);

  this.render(hbs`{{post-header}}`);

  assert.equal(this.$('.post-header').length, 1, 'The component\'s element is rendered');
});

test('it renders all the ui elements properly bound', function(assert) {
  assert.expect(2);

  this.set('post', mockPost);

  this.render(hbs`{{post-header post=post}}`);

  assert.equal(this.$('.post-header .title').text().trim(), 'A post', 'Title is correctly bound and rendered');
  assert.equal(this.$('.post-header.issue .post-icon').length, 1, 'Post type is correctly bound and rendered');
});
