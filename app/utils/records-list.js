import Ember from 'ember';

const { get } = Ember;

export default {
  /**
    Returns `true` or `false` depending on whether an array of models contains
    the target model instance.
    @method contains
    @param {[DS.Model]} records The records to search
    @param {DS.Model} target The target model
    @return {Boolean} `true` if found, otherwise `false`
    @public
  */
  contains(records, target) {
    if (records) {
      return records.any((found) => {
        let targetId = get(target, 'id');
        let targetModelName = get(target, 'content.constructor.modelName');
        let foundId = found.belongsTo(targetModelName).id();

        return (foundId === targetId);
      });
    } else {
      false;
    }
  },

  /**
    Returns the first record within an array of join model relationships
    for the given target and relationship. For example given `user-skill`
    records, we can pass in a `skill` as `target` and a `user` as the
    relationship.
    @method find
    @param {[DS.Model]} records The relationship records to search
    @param {DS.Model} target The target model
    @param {DS.Model} relationship The relationship model
    @return {DS.Model} Found item or `undefined`
    @public
  */
  find(records, target, relationship) {
    if (records) {
      return records.find((found) => {
        // Get relationship id and model name
        let relationshipId = get(relationship, 'id');
        let relationshipModelName = get(relationship, 'constructor.modelName');

        // Get target id and model name
        let targetId = get(target, 'id');
        let targetModelName = get(target, 'content.constructor.modelName');

        // Exit early with `false` if we're missing values
        if (!(relationshipId && relationshipModelName && targetId && targetModelName)) {
          return false;
        }

        // Get the id of the found model instance and
        // get the id of the found model's relationship model instance
        let foundId = found.belongsTo(targetModelName).id();
        let foundRelationshipId = found.belongsTo(relationshipModelName).id();

        return (foundRelationshipId === relationshipId) // relationships match
            && (foundId             === targetId);      // found matches target
      });
    }
  }
};
