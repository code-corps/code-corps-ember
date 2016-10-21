import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import Ember from 'ember';

const { computed } = Ember;

export default Model.extend({
  body: attr('string'),
  insertedAt: attr('date'),
  markdown: attr('string'),

  commentUserMentions: hasMany('comment-user-mention', { async: true }),
  task: belongsTo('task', { async: true }),
  user: belongsTo('user', { async: true }),

  containsCode: computed('body', function() {
    let body = this.get('body');
    if (body) {
      return body.indexOf('<code>') !== -1;
    } else {
      return false;
    }
  })
});
