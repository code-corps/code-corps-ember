import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import EmberCan from 'ember-can';

export default Component.extend({
  classNames: ['archive-task'],

  // auto-assigns 'task' property from component as ability 'model'
  ability: EmberCan.computed.ability('task'),
  canArchive: alias('ability.canArchive')
});
