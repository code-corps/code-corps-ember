import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  serializeAttribute: function(snapshot, json, key, attribute) {
    // for creating records, just regularly serialize the payload
    if (snapshot.record.get('isNew')) {
      if (snapshot.attr('preview')) {
        // if (this._attributeIsPreviewOnly(attribute)) {
          this._super(snapshot, json, key, attribute);
        // }
      } else {
        this._super(snapshot, json, key, attribute);
      }
    } else {
      // for updating existing records, we have 3 cases
      // 1. we're editing or requesting a preview of the post body. In that
      // case, we only need to push markdownPreview and the preview flag itself
      // 2. we're editing the title. In that case, we only push the title
      // 3. We're outright editing the post body - we only send markdownPreview
      if (snapshot.attr('preview') === true) {
        // if (this._attributeIsPreviewOnly(attribute)) {
          this._super(snapshot, json, key, attribute);
        // }
      } else if (snapshot.changedAttributes().title) {
        if (attribute.name === 'title') {
          this._super(snapshot, json, key, attribute);
        }
      } else {
        if (attribute.name === 'markdownPreview') {
          this._super(snapshot, json, key, attribute);
        }
      }
    }
  },

  _attributeIsPreviewOnly(attribute) {
    return ['preview', 'markdownPreview'].indexOf(attribute.name) > -1;
  },
});
