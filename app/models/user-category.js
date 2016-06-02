import Model from 'ember-data/model';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  user: belongsTo('user', { async: true }),
  category: belongsTo('category', { async: true }),
});
