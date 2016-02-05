import DS from 'ember-data';
import Model from 'code-corps-ember/models/model';

export default Model.extend({
  name: DS.attr('string'),
  username: DS.attr('string'),
  website: DS.attr('string'),
  twitter: DS.attr('string'),
  biography: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  createdAt: DS.attr('date'),
});
