import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  attrs: {
    legalEntitySsnLast4: { key: 'legal-entity-ssn-last-4' },
    legalEntitySsnLast4Provided: { key: 'legal-entity-ssn-last-4-provided' }
  }
});
