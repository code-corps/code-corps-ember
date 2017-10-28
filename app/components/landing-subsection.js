import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';
import CanAnimateMixin from 'code-corps-ember/mixins/can-animate';

export default Component.extend(CanAnimateMixin, {
  attributeBindings: ['style'],
  classNames: ['landing-subsection'],
  classNameBindings: ['animated:animated'],

  animated: computed('canAnimate', function() {
    let canAnimate = this.get('canAnimate');
    if (canAnimate) {
      this.set('_hasAnimated', true);
    }
    return this.get('_hasAnimated');
  }),

  style: computed('minHeight', function() {
    let css = `min-height: ${this.get('minHeight')  }px;`;
    return htmlSafe(css);
  })
});
