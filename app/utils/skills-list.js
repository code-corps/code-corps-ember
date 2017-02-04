import Ember from 'ember';

const {
  get
} = Ember;

let skillsList = {
  find(skills, skill, relationship) {
    if (skills) {
      return skills.find((item) => {
        let modelName = get(item, 'constructor.modelName');
        return _matchForModelName(modelName, item, skill, relationship);
      });
    }
  },

  contains(skills, skill) {
    if (skills) {
      return skills.any((item) => {
        let itemSkillId = item.belongsTo('skill').id();
        let skillId = get(skill, 'id');
        return (itemSkillId === skillId);
      });
    } else {
      false;
    }
  }
};

function _matchForModelName(modelName, item, skill, relationship) {
  let relationshipName = get(relationship, 'constructor.modelName');
  return _matchWithRelationship(item, skill, relationship, relationshipName);
}

function _matchWithRelationship(item, skill, relationship, relationshipName) {
  let itemRelationshipId = item.belongsTo(relationshipName).id();
  let itemSkillId = item.belongsTo('skill').id();
  let relationshipId = get(relationship, 'id');
  let skillId = get(skill, 'id');
  return (itemRelationshipId === relationshipId) && (itemSkillId === skillId);
}

export default skillsList;
