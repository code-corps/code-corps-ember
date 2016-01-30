import DS from 'ember-data';
// import Model from 'code-corps-ember/models/model';

export default DS.Model.extend({
  name: DS.attr('string'),
  username: DS.attr('string'),
  website: DS.attr('string'),
  twitter: DS.attr('string'),
  biography: DS.attr('string'),
  email: DS.attr('string'),
  password: DS.attr('string'),
  base64_photo_data: DS.attr('string'),
  photo_large_url: DS.attr('string'),
  photo_thumb_url: DS.attr('string')
});
