import Mixin from '@ember/object/mixin';
import { get, observer, set } from '@ember/object';

export default Mixin.create({
  dropdownOpen: false,
  tooltipShown: false,

  mouseEnter() {
    let dropdownOpen = get(this, 'dropdownOpen');
    if (dropdownOpen) {
      return;
    } else {
      set(this, 'tooltipShown', true);
    }
  },

  mouseLeave() {
    set(this, 'tooltipShown', false);
  },

  dropdownOpened: observer('dropdownOpen', function() {
    let tooltipShown = get(this, 'dropdownOpen') ? false : null;
    set(this, 'tooltipShown', tooltipShown);
  })
});
