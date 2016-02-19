import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),

  body: DS.attr('string'),
  bodyPreview: DS.attr('string'),

  markdown: DS.attr('string'),
  markdownPreview: DS.attr('string'),

  preview: DS.attr('boolean'),

  postType: DS.attr('string'),
  likesCount: DS.attr('number'),
  number: DS.attr('number'),
  createdAt: DS.attr('date'),

  project: DS.belongsTo('project', { async: true }),
  user: DS.belongsTo('user', { async: true }),
  comments: DS.hasMany('comment', { async: true }),

  postUserMentions: DS.hasMany('post-user-mention', { asnyc: false })
});
