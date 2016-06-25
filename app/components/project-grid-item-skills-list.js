import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['project-grid-item-skills-list'],
  overflowHidden: true,
  showToggle: false,

  actions: {
    showLess() {
      this.set('overflowHidden', true);
    },

    showMore() {
      this.set('overflowHidden', false);
    },

    skillItemHidden() {
      this.set('showToggle', true);
    },
  },
});
