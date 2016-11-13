import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  serializeAttribute(snapshot, json, key, attribute) {
    // for creating records, just regularly serialize the payload
    if (snapshot.record.get('isNew')) {
      this._super(snapshot, json, key, attribute);
    } else {
      // for updating existing records, we have 2 cases
      // 1. we're editing the title. In that case, we only push the title
      // 2. we're opening/closing the task. We only push the status
      // 3. We're outright editing the task body - we only send markdown
      if (snapshot.changedAttributes().title) {
        if (attribute.name === 'title') {
          this._super(snapshot, json, key, attribute);
        }
      } else if (snapshot.changedAttributes().status) {
        if (attribute.name === 'status') {
          this._super(snapshot, json, key, attribute);
        }
      } else {
        if (attribute.name === 'markdown') {
          this._super(snapshot, json, key, attribute);
        }
      }
    }
  }
});
