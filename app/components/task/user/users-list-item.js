import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  classNameBindings: ['assigned:task__user__users-list-item--assigned', 'selected:selected'],
  classNames: ['task__user__users-list-item'],
  tagName: ['li'],

  assigned: computed('user', 'userTask', function() {
    let user = get(this, 'user');
    let existingUser = get(this, 'userTask.user');
    return existingUser && get(existingUser, 'id') == get(user, 'id');
  }),

  mouseDown() {
    let user = get(this, 'user');
    this.sendAction('selectUser', user);
  },

  mouseEnter() {
    let user = get(this, 'user');
    this.sendAction('hover', user);
  }

  // selectedChanged: observer('selected', function() {
  //   once(this, '_scroll');
  // }),
  //
  // target: computed('elementId', function() {
  //   return `#${get(this, 'elementId')}`;
  // }),
  //
  // _scroll() {
  //   let item = this.$();
  //   let itemHeight = item.height();
  //   let itemTop = item.offset().top;
  //   let list = item.parent();
  //   let listHeight = list.height();
  //   let position = itemTop - itemHeight;
  //   list.scrollTop(position);
  // }
});
