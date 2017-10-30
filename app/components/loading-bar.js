import Component from '@ember/component';
import { alias } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({
  classNameBindings: ['isLoading'],
  classNames: ['loading-bar'],

  loadingBar: service(),

  isLoading: alias('loadingBar.isLoading')
});
