import Ember from 'ember';

const {
  Component,
  computed,
  inject: { service }
} = Ember;

export default Component.extend({
  isHovering: false,

  userSkills: service(),

  spanClass: computed('isLoading', 'isHovering', function() {
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
    }
  }
});
