import Component from '@ember/component';
import { set } from '@ember/object';

export default Component.extend({
  classNames: ['project-switcher', 'dropdown'],
  classNameBindings: ['hidden:menu-hidden:menu-visible'],
  hidden: true,

  actions: {
    hide() {
      document.body.setAttribute('style', null);
      set(this, 'hidden', true);
    },

    show() {
      document.body.setAttribute('style', 'overflow: hidden;');
      set(this, 'hidden', false);
    }
  }
});
