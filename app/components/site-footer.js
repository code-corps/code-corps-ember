import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: 'footer',
  classNames: ['site-footer', 'container'],
  classNameBindings: ['isMedium:site-footer--is-medium'],

  media: service(),
  siteFooter: service(),

  isMedium: alias('media.isMedium')
});
