import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  skill: belongsTo('skill', { async: true }),
  user: belongsTo('user', { async: true })
});
