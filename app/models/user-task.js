import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  task: belongsTo('task', { async: true }),
  user: belongsTo('user', { async: true })
});
