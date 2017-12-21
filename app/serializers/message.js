import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  attrs: {
    conversations: { serialize: true }
  },

  serialize(snapshot) {
    let json = this._super(...arguments);

    // support saving child conversations alongside record
    if (!json.id) {
      json.included = snapshot.hasMany('conversations').map((c) => c.serialize());
    }

    return json;
  }
});
