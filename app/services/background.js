import $ from 'jquery';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import Service from '@ember/service';

export default Service.extend({
  reset() {
    $('html').removeClass('warning danger');
  },

  setBackgroundClass: computed(function() {
    return () => {
      $('html').addClass(this.get('class'));
    };
  }),

  updateBackgroundClass() {
    run.once(this, this.get('setBackgroundClass'));
  }
});
