import Ember from 'ember';
import DS from 'ember-data';

const { typeOf } = Ember;
const { Transform } = DS;

export default Transform.extend({
  deserialize(serialized) {
    let type = typeOf(serialized);
    return (type === 'array')  ? serialized  : [];
  },

  serialize(deserialized) {
    let type = typeOf(deserialized);
    if (type === 'array') {
      return deserialized;
    } else if (type === 'string') {
      return deserialized.split(',').map(function(item) {
        return item.trim();
      });
    } else {
      return [];
    }
  }
});
