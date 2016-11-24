import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  /**
   * A stripe subscription is not directly related to a stripe platform card,
   * but we do have to specify which stripe platform card was used in order to
   * correctly create a subscription.
   *
   * We achieve this by assiging it as a "fake" attribute through adapter options.
   * TODO: There may be a cleaner way to do this.
   *
   * @return {undefined} Function returns nothing. Instead, it modifies the payload object.
   */
  serializeIntoHash(payload, type, snapshot, options) {
    this._super(payload, type, snapshot, options);
    // TODO: We should reconsider our subscription relationships and handle it that way.
    // Right now, stripeConnectSubscription belongsTo user and stripeConnectPlan
    // It should instead belong to user, and project
    payload.data.attributes['project-id'] = snapshot.adapterOptions.projectId;
  }
});
