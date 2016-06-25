import Ember from 'ember';

export default Ember.Component.extend({
  isHovering: false,

  userSkills: Ember.inject.service(),

  spanClass: Ember.computed('isLoading', 'isHovering', function() {
    if (this.get('isLoading')) {
      return 'button-spinner';
    } else if (this.get('isHovering')) {
      return 'x-mark';
    } else {
      return 'check-mark';
    }
  }),

  actions: {
    hoverButton() {
      this.set('isHovering', true);
    },

    leaveButton() {
      this.set('isHovering', false);
    },

    removeSkill(skill) {
      let userSkills = this.get('userSkills');
      userSkills.removeSkill(skill);
    },
  },
});
