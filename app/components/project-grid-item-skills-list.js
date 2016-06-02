import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['project-grid-item-skills-list'],

  showToggle: false,
  overflowHidden: true,

  actions: {
    skillItemHidden() {
      this.set('showToggle', true);
    },
    showMore() {
      this.set('overflowHidden', false);
    },
    showLess() {
      this.set('overflowHidden', true);
    }
  }
});
