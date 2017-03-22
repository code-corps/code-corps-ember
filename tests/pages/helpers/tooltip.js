import Ember from 'ember';

const { $ } = Ember;

/**
 * This helper is used to deal with DOM elements inserted by the
 * `ember-tooltips` addon
 *
 * These elements attach themselves to the body instead of any container,
 * so in integration tests, they cannot be accessed through the scope
 * system. Instead, we fall back to jquery selectors to find them. This
 * helper can be used as a single sub-component of a page object, or as
 * an item in a collection.
 */
export default {
  defaultSelector: '.ember-tooltip',

  // selector is dynamic, depending on the component being used directly, or
  // as part of a collection
  selector: {
    isDescriptor: true,
    get() {
      let [, indexSelector] = this.__parentTreeNode.scope.split(':');

      if (indexSelector) {
        return `${this.defaultSelector}:${indexSelector}`;
      } else {
        return this.defaultSelector;
      }
    }
  },

  // tooltips attach outside the integration context
  // so we are forced to use jquery
  element: {
    isDescriptor: true,
    get() {
      return $(this.selector);
    }
  },

  text: {
    isDescriptor: true,
    get() {
      return this.element.text().trim();
    }
  },

  isAriaHidden: {
    isDescriptor: true,
    get() {
      return this.element.attr('aria-hidden') === 'true';
    }
  },

  isAriaVisible: {
    isDescriptor: true,
    get() {
      return this.element.attr('aria-hidden') === 'false';
    }
  }
};
