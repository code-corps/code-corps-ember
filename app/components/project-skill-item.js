import Ember from 'ember';

const {
  Component,
  getProperties
} = Ember;

export default Component.extend({
  classNames: ['skill', 'has-spinner', 'default', 'small'],
  tagName: 'button',

  click() {
    let { skill, onClicked } = getProperties(this, 'skill', 'onClicked');
    onClicked(skill);
  }
});
