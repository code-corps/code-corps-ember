import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  category: belongsTo('category', { async: true }),
  user: belongsTo('user', { async: true })
});
