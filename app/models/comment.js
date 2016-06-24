import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import Ember from 'ember';

export default Model.extend({
  body: attr('string'),
  createdAt: attr('date'),
  markdown: attr('string'),

  commentUserMentions: hasMany('comment-user-mention', { async: true }),
  post: belongsTo('post', { async: true }),
  user: belongsTo('user', { async: true }),

  containsCode: Ember.computed('body', function() {
    let body = this.get('body');
    if(body) {
      return body.indexOf('<code>') !== -1;
    } else {
      return false;
    }
  }),
});
