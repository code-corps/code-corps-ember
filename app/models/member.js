import DS from 'ember-data';

export default DS.Model.extend({
  model: DS.belongsTo('model', { polymorphic: true }),
  slug: DS.attr('string')
});
