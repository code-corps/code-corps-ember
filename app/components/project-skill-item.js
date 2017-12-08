import Component from '@ember/component';
import { getProperties } from '@ember/object';

export default Component.extend({
  classNames: ['skill', 'has-spinner', 'small'],
  tagName: 'button',

  click() {
    let { skill, onClicked } = getProperties(this, 'skill', 'onClicked');
    onClicked(skill);
  }
});
