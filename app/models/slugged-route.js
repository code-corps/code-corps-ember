import DS from 'ember-data';

export default DS.Model.extend({
  owner: DS.belongsTo('owner', { polymorphic: true }),
  slug: DS.attr('string')
});
