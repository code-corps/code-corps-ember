import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  base64IconData: DS.attr('string'),
  iconThumbUrl: DS.attr('string'),
  iconLargeUrl: DS.attr('string'),
  slug: DS.attr('string'),

  categories: DS.hasMany('categories', { async: true }),
  posts: DS.hasMany('posts', { async: true }),
  organization: DS.belongsTo('organization', { async: true }),

  // skills: [
  //   {
  //     name: 'Ruby'
  //   },
  //   {
  //     name: 'Rails'
  //   },
  //   {
  //     name: 'Adobe Photoshop'
  //   },
  //   {
  //     name: 'HTML'
  //   },
  //   {
  //     name: 'CSS'
  //   },
  //   {
  //     name: 'Ember.js'
  //   },
  //   {
  //     name: 'JavaScript'
  //   },
  //   {
  //     name: 'PostgreSQL'
  //   },
  //   {
  //     name: 'ActiveModel::Serializers'
  //   },
  //   {
  //     name: 'JSON API'
  //   },
  // ]
});
