import DS from 'ember-data';

export default DS.Model.extend({
  indices: DS.attr('array'),

  post: DS.belongsTo('post', { async: true }),
  user: DS.belongsTo('user', { async: true })
});
