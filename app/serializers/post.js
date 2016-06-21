import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  serializeAttribute: function(snapshot, json, key, attribute) {
    // for creating records, just regularly serialize the payload
    if (snapshot.record.get('isNew')) {
      this._super(snapshot, json, key, attribute);
    } else {
      // for updating existing records, we have 2 cases
      // 1. we're editing the title. In that case, we only push the title
      // 2. We're outright editing the post body - we only send markdown
      if (snapshot.changedAttributes().title) {
        if (attribute.name === 'title') {
          this._super(snapshot, json, key, attribute);
        }
      } else {
        if (attribute.name === 'markdown') {
          this._super(snapshot, json, key, attribute);
        }
      }
    }
  },
});
