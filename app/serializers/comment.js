import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  serializeAttribute: function(snapshot, json, key, attribute) {
    // for creating records, just regularly serialize the payload
    if (snapshot.record.get('isNew')) {
      if (snapshot.attr('preview')) {
        if (this._attributeIsPreviewOnly(attribute)) {
          this._super(snapshot, json, key, attribute);
        }
      } else {
        this._super(snapshot, json, key, attribute);
      }
    } else {
      // for updating existing records, we have 2 cases
      // we're editing or requesting a preview of the post body. In that
      // case, we only need to push markdownPreview and the preview flag itself

      if (this._attributeIsPreviewOnly(attribute)) {
        this._super(snapshot, json, key, attribute);
      }
    }
  },

  _attributeIsPreviewOnly(attribute) {
    return ['preview', 'markdownPreview'].indexOf(attribute.name) > -1;
  },
});
