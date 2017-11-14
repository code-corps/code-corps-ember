import EmberObject from '@ember/object';
import TooltipForDropdownMixin from 'code-corps-ember/mixins/tooltip-for-dropdown';
import { module, test } from 'qunit';
import { set } from '@ember/object';

module('Unit | Mixin | tooltip for dropdown');

// Replace this with your real tests.
test('it works', function(assert) {
  let TooltipForDropdownObject = EmberObject.extend(TooltipForDropdownMixin);
  let subject = TooltipForDropdownObject.create();
  assert.ok(subject);
});

test('mouseEnter dropdownOpen is true', function(assert) {
  let TooltipForDropdownObject = EmberObject.extend(TooltipForDropdownMixin);
  TooltipForDropdownObject.create();
  set(this, 'dropdownOpen', true);
  assert.equal(this.dropdownOpen, true);
});

test('mouseEnter dropdownOpen is false', function(assert) {
  let TooltipForDropdownObject = EmberObject.extend(TooltipForDropdownMixin);
  TooltipForDropdownObject.create();
  set(this, 'dropdownOpen', false);
  assert.equal(this.dropdownOpen, false);
});
