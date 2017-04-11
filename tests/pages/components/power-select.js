import { collection, isVisible } from 'ember-cli-page-object';
import { clickTrigger, nativeMouseUp } from 'code-corps-ember/tests/helpers/ember-power-select';
import { findElementWithAssert } from 'ember-cli-page-object/extend';

// NOTE: The default ember-cli-page-objects do not work properly here
// Instead, ember-power-select exposes the `clickTrigger` and `nativeMouseUp`
// helpers which we used to implement this page object.
//
// Especially of note is the usage of `nativeMouseUp`.
// - `clickable`, `click`, or even `nativeMouseDown` do not work.
// - there is no documentation for this either
// - the `selectChoose` test helper can only be used in acceptance tests
// - using `nativeMouseUp` up for this is undocumented, but I started using it after looking at the code at:
//   https://github.com/cibernox/ember-power-select/blob/master/tests/integration/components/power-select/general-behaviour-test.js#L236

// NOTE: Since the power select is appended to the application root by default,
// We're also using the `testContainer` feature provided by ember-cli-page-object

export default {
  dropdown: {
    resetScope: true,
    testContainer: '.ember-power-select-dropdown',
    options: collection({
      itemScope: '.ember-power-select-option',
      item: {
        select() {
          // this.scope is a jQuery selector, so we can't use that because
          // nativeMouseUp needs either a plain old js selector or a plain old
          // DOM element, so we fetch the element first
          let [domElement] = findElementWithAssert(this);
          nativeMouseUp(domElement);
          return this;
        }
      }
    })
  },

  trigger: {
    scope: '.ember-power-select-trigger',
    assigned: {
      isDescriptor: true,
      get() {
        return !this.unassigned;
      }
    },
    open: clickTrigger,
    unassigned: {
      isDescriptor: true,
      get() {
        return this.text === 'No one yet';
      }
    }
  },

  triggerRenders: isVisible('.ember-power-select-trigger')
};
