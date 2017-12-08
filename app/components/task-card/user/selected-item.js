import Component from '@ember/component';
import TooltipForDropdownMixin from 'code-corps-ember/mixins/tooltip-for-dropdown';

export default Component.extend(TooltipForDropdownMixin, {
  classNames: ['select-inline', 'select-inline__selected-item'],

  dropdownOpen: false,
  tooltipShown: false
});
