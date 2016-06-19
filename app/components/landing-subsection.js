import Ember from 'ember';
import CanAnimateMixin from 'code-corps-ember/mixins/can-animate';

export default Ember.Component.extend(CanAnimateMixin, {
  attributeBindings: ['style'],
  classNames: ['landing-subsection'],
  classNameBindings: ['animated:animated'],

  animated: Ember.computed('canAnimate', function() {
    let canAnimate = this.get('canAnimate');
    if (canAnimate) {
      this.set('_hasAnimated', true);
    }
    return this.get('_hasAnimated');
  }),

  style: Ember.computed('minHeight', function() {
    let css = 'min-height: ' + this.get('minHeight') + 'px;';
    return Ember.String.htmlSafe(css);
  }),
});
