import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['matched'],
  tagName: 'li',

  didRender() {
    this._super(...arguments);
    let parentBottom = this.$().parent()[0].getBoundingClientRect().bottom;
    let elementBottom = this.$()[0].getBoundingClientRect().bottom;

    if (elementBottom > parentBottom) {
      this.sendAction();
    }
  },
});
