import DS from 'ember-data';

export default DS.Model.extend({
  model: DS.belongsTo('model', { polymorphic: true }),
  modelType: DS.attr('string'),
  slug: DS.attr('string'),
});
