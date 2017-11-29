/* eslint-env node */
'use strict';

module.exports = {
  name: 'styleguide',
  included: function(/* app */) {
    this._super.included.apply(this, arguments);
  },
  isDevelopingAddon() {
    return true;
  }
};
