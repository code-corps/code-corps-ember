import { get } from '@ember/object';
import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({
  siteFooter: service(),

  actions: {
    didTransition() {
      get(this, 'siteFooter').enlarge();
      return true;
    },

    willTransition() {
      get(this, 'siteFooter').reduce();
      return true;
    }
  }
});
