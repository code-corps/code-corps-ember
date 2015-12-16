import DS from 'ember-data';

export default DS.Model.extend({
  username: DS.attr('string'),
  website: DS.attr('string'),
  twitter: DS.attr('string'),
  biography: DS.attr('string')
});
