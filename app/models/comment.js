import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  markdown: DS.attr('string'),
  markdownPreview: DS.attr('string'),
  body: DS.attr('string'),
  bodyPreview: DS.attr('string'),
  createdAt: DS.attr('date'),

  preview: DS.attr('boolean'),

  post: DS.belongsTo('post', { async: true }),
  user: DS.belongsTo('user', { async: true }),

  commentUserMentions: DS.hasMany('commentUserMention', { async: true }),

  containsCode: Ember.computed('body', function() {
    let body = this.get('body');
    if(body) {
      return body.indexOf('<code>') !== -1;
    } else {
      return false;
    }
  }),
});
