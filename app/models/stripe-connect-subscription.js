import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';

export default Model.extend({
  quantity: attr('dollar-cents'),

  stripeConnectPlan: belongsTo('stripe-connect-plan', { async: true }),
  user: belongsTo('user', { async: true }),

  // TODO: Virtual attributes. We should reconsider our API relationships to get rid of these
  // Subscription should belong to a project
  projectId: attr()
});
