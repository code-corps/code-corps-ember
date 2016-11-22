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
    if (snapshot.adapterOptions.stripePlatformCardId) {
      payload.data.attributes.stripePlatformCardId = snapshot.adapterOptions.stripePlatformCardId;
    }
  }
});
