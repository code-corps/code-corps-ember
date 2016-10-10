import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  role: belongsTo('role', { async: true }),
  user: belongsTo('user', { async: true })
});
