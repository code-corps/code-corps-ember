import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  iconThumbUrl: DS.attr('string'),
  iconLargeUrl: DS.attr('string'),
});
