import Ember from 'ember';

const {
  Component,
  get
} = Ember;

export default Component.extend({
  attributeBindings: ['disabled', 'name', 'type', 'value'],
  classNames: ['button', 'default'],
  classNameBindings: ['hasError'],
  disabled: false,
  name: null,
  type: 'submit',
  tagName: 'input',
  value: null,

  click() {
    get(this, 'submitAction')();
  }
});
