import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  skill: belongsTo('skill', { async: true }),
  project: belongsTo('project', { async: true }),
});
