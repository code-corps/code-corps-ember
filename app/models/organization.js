import DS from 'ember-data';
// import Model from 'code-corps-ember/models/model';

var attr = DS.attr;

export default DS.Model.extend({
  name: attr(),
});
