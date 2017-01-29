import Ember from 'ember';
import CanAnimateMixin from 'code-corps-ember/mixins/can-animate';

const {
  Component,
  computed,
  get,
  set,
  String: { htmlSafe }
} = Ember;

export default Component.extend(CanAnimateMixin, {
  attributeBindings: ['style'],
  classNames: ['landing-subsection'],
  classNameBindings: ['animated:animated'],

  animated: computed('canAnimate', function() {
    let canAnimate = get(this, 'canAnimate');
    if (canAnimate) {
      set(this, '_hasAnimated', true);
    }
    return get(this, '_hasAnimated');
  }),

  style: computed('minHeight', function() {
    let css = `min-height: ${get(this, 'minHeight')}px;`;
    return htmlSafe(css);
  })
});
