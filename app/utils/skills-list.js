import Ember from 'ember';

const {
  get
} = Ember;

let skillsList = {
  find(skills, skill, relationship) {
    if (skills) {
      let userSkill = skills.find((item) => {
        let model = get(item, 'constructor.modelName');
        return _matchForModel(model, item, skill, relationship);
      });
      return userSkill;
    }
  },

  contains(skills, skill) {
    if (skills) {
      let matchedSkill = skills.find((item) => {
        let itemSkillId = item.belongsTo('skill').id();
        let skillId = get(skill, 'id');
        return (itemSkillId === skillId);
      });
      return !isEmpty(matchedSkill);
    } else {
      false;
    }
  }
}

function _matchForModel(model, item, skill, relationship) {
  switch(model) {
    case 'user-skill':
      return _matchWithRelationship(item, skill, relationship, 'user');
    default:
      return undefined;
  }
};

function _matchWithRelationship(item, skill, relationship, relationshipName) {
  let itemRelationshipId = item.belongsTo(relationshipName).id();
  let itemSkillId = item.belongsTo('skill').id();
  let relationshipId = get(relationship, 'id');
  let skillId = get(skill, 'id');
  return (itemRelationshipId === relationshipId) && (itemSkillId === skillId);
};

export default skillsList;
