
/**
 * Uses native javascript to click an element. Required in some cases where
 * the default clickable helper does not work due to relying on jQuery .click
 *
 * Right now, this is used in:
 *
 * - tests/pages/components/project-join-modal
 */
function clickable() {
  let selector =  `${this.testContainer} ${this.scope}`;
  document.querySelector(selector).click();
}

export { clickable };
