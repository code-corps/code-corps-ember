import DS from 'ember-data';

export default DS.Model.extend({
  comment: DS.belongsTo('comment', { async: true }),
  user: DS.belongsTo('user', { async: true })
});
