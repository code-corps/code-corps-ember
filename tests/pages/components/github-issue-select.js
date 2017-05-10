import { attribute, findElementWithAssert, collection } from 'ember-cli-page-object';
import { clickTrigger, nativeMouseUp } from 'code-corps-ember/tests/helpers/ember-power-select';

export default {
  scope: '.github-issue-select',

  openDropdown() {
    clickTrigger(this.scope);
    return this;
  },

  selectedIssue: {
    scope: '.ember-basic-dropdown-trigger'
  },

  ariaDisabled: attribute('aria-disabled', '.ember-basic-dropdown-trigger'),
  disabled: {
    isDescriptor: true,
    get() {
      return this.ariaDisabled === 'true';
    }
  },

  issues: collection({
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
};
