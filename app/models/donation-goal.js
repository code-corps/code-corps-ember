import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  achieved: attr(),
  /**
   * Donation amount, in cents
   *
   * @property amount
   * @type { Number }
   */
  amount: attr('dollar-cents'),
  current: attr(),
  description: attr(),

  project: belongsTo('project', { async: true })
});
