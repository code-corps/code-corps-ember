import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['project-grid-item-skills-list'],
  showToggle: false,
  overflowHidden: true,

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
