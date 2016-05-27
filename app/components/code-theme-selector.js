import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['code-theme-selector'],
  classNameBindings: ['themeClass'],

  codeTheme: Ember.inject.service(),

  themeClass: Ember.computed.alias('codeTheme.className'),

  click() {
    this.get('codeTheme').toggle();
  }
});
