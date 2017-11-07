import EmberObject from '@ember/object';
import TooltipForDropdownMixin from 'code-corps-ember/mixins/tooltip-for-dropdown';
import { module, test } from 'qunit';

module('Unit | Mixin | tooltip for dropdown');

// Replace this with your real tests.
test('it works', function(assert) {
  let TooltipForDropdownObject = EmberObject.extend(TooltipForDropdownMixin);
  let subject = TooltipForDropdownObject.create();
  assert.ok(subject);
});
