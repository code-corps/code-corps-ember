import DS from 'ember-data';

export default DS.Model.extend({
  model: DS.belongsTo('organization'),
  model: DS.belongsTo('user'),
  type: DS.attr()
});
