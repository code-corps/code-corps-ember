import sinon from 'sinon';
import jQuery from 'jquery';

export default function fillInFileInput(selector, file) {
  // Get the input
  let input = jQuery(selector);

  // Get out file options
  let { name, type, content } = file;

  // Create a custom event for change and inject target
  let event = jQuery.Event('change', {
    target: {
      files: [{
        name, type
      }]
    }
  });

  // Stub readAsDataURL function
  let stub = sinon.stub(FileReader.prototype, 'readAsDataURL', function() {
    this.onload({ target: { result: content } });
  });

  // Trigger event
  input.trigger(event);

  // We don't want FileReader to be stubbed for all eternity
  stub.restore();
}
