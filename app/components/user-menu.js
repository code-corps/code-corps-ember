import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['user-menu'],
  classNameBindings: ['menuHidden:menu-hidden:menu-visible'],

  session: Ember.inject.service(),

  menuHidden: true,

  actions: {
    toggle: function() {
      this.toggleProperty('menuHidden');
    },
    hide: function() {
      this.set('menuHidden', true);
    },
    invalidateSession: function() {
      this.get('session').invalidate();
    }
  }
});
