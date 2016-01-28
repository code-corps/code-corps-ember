import DS from 'ember-data';

export default DS.Model.extend({
  markdown: DS.attr('string'),
  body: DS.attr('string'),

  post: DS.belongsTo('post'),
  user: DS.belongsTo('user')
});
