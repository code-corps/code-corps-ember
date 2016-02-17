import DS from 'ember-data';

export default DS.Model.extend({
  markdown: DS.attr('string'),
  markdownPreview: DS.attr('string'),
  body: DS.attr('string'),
  bodyPreview: DS.attr('string'),

  preview: DS.attr('boolean'),

  post: DS.belongsTo('post', { async: true }),
  user: DS.belongsTo('user', { async: true })
});
