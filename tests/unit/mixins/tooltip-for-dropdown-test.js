import EmberObject from '@ember/object';
import TooltipForDropdownMixin from 'code-corps-ember/mixins/tooltip-for-dropdown';
import { module, test } from 'qunit';
import { set } from '@ember/object';

module('Unit | Mixin | tooltip for dropdown');

test('default properties are set as expected', function(assert) {
  assert.expect(2);
  let TooltipForDropdownObject = EmberObject.extend(TooltipForDropdownMixin);
  let subject = TooltipForDropdownObject.create();
  assert.equal(subject.dropdownOpen, false);
  assert.equal(subject.tooltipShown, false);
});

test('when mouseEnter called and dropdownOpen is true', function(assert) {
  assert.expect(1);
  let TooltipForDropdownObject = EmberObject.extend(TooltipForDropdownMixin);
  let subject = TooltipForDropdownObject.create();
  set(subject, 'dropdownOpen', true);
  subject.mouseEnter();
  assert.equal(subject.tooltipShown, false);
});

test('when mouseEnter called and dropdownOpen is false', function(assert) {
  assert.expect(1);
  let TooltipForDropdownObject = EmberObject.extend(TooltipForDropdownMixin);
  let subject = TooltipForDropdownObject.create();
  set(subject, 'dropdownOpen', false);
  subject.mouseEnter();
  assert.equal(subject.tooltipShown, true);
});

test('when mouseLeave called', function(assert) {
  assert.expect(1);
  let TooltipForDropdownObject = EmberObject.extend(TooltipForDropdownMixin);
  let subject = TooltipForDropdownObject.create();
  set(subject, 'tooltipShown', true);
  subject.mouseLeave();
  assert.equal(subject.tooltipShown, false);
});

test('when dropdownOpen changed to true', function(assert) {
  assert.expect(1);
  let TooltipForDropdownObject = EmberObject.extend(TooltipForDropdownMixin);
  let subject = TooltipForDropdownObject.create();
  set(subject, 'dropdownOpen', false);
  set(subject, 'tooltipShown', true);
  set(subject, 'dropdownOpen', true);
  assert.equal(subject.tooltipShown, false);
});

test('when dropdownOpen changed to false', function(assert) {
  assert.expect(1);
  let TooltipForDropdownObject = EmberObject.extend(TooltipForDropdownMixin);
  let subject = TooltipForDropdownObject.create();
  set(subject, 'dropdownOpen', true);
  set(subject, 'tooltipShown', false);
  set(subject, 'dropdownOpen', false);
  assert.equal(subject.tooltipShown, null);
});
