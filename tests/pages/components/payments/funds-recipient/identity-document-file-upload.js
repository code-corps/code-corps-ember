import { findElementWithAssert } from 'ember-cli-page-object/extend';

export default {
  scope: '.identity-document-file-upload',

  /**
   * Simulates selecting a file from a file input.
   * Since this should not be programmatically possible due to security issues,
   * we do the next best thing.
   *
   * We find the input element, through it's id find the rendered component
   * instance, then call the `change` function within that instance manually.
   *
   * The `change` function is defined in the base EmberUploader.TextField
   * component and its behavior is well tested by the addon itself.
   */
  selectFile(file) {
    let [{ id }] = findElementWithAssert(this);
    let renderedInstance = this.context.container.lookup('-view-registry:main')[id];

    let mockEvent = { target: { files: [file] } };
    renderedInstance.change(mockEvent);
  }
};
