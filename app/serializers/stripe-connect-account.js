import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  attrs: {
    legalEntitySsnLast4: { key: 'legal-entity-ssn-last-4' },
    legalEntitySsnLast4Provided: { key: 'legal-entity-ssn-last-4-provided' }
  },

  /**
   * Overrides default serializeAttributes so it only serializes changed attributes,
   * instead of the default behavior, which is all of them.
   */
  serializeAttribute(snapshot, json, key) {
    if (snapshot.changedAttributes()[key] || snapshot.record.get('isNew')) {
      this._super(...arguments);
    }
  }
});
