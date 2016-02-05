import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  body: DS.attr('string'),
  markdown: DS.attr('string'),
  state: DS.attr('string'),
  postType: DS.attr('string'),
  likesCount: DS.attr('number'),
  project: DS.belongsTo('project'),
  user: DS.belongsTo('user', { async: true }),
  comments: DS.hasMany('comment'),
  number: DS.attr('number'),
  createdAt: DS.attr('date')
});
