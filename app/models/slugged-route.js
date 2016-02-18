import DS from 'ember-data';

export default DS.Model.extend({
  owner: DS.belongsTo('owner', { async: true, polymorphic: true }),
  ownerType: DS.attr('string'),
  slug: DS.attr('string'),
});
