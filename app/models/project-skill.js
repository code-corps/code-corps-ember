import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  project: belongsTo('project', { async: true }),
  skill: belongsTo('skill', { async: true })
});
