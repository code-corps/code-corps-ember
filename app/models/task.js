import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import Ember from 'ember';

const { computed } = Ember;

export default Model.extend({
  body: attr(),
  insertedAt: attr('date'),
  likesCount: attr('number'),
  markdown: attr(),
  number: attr('number'),
  taskType: attr(),
  status: attr(),
  title: attr(),

  comments: hasMany('comment', { async: true }),
  commentUserMentions: hasMany('comment-user-mention', { asnyc: true }),
  taskUserMentions: hasMany('task-user-mention', { asnyc: true }),
  project: belongsTo('project', { async: true }),
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
