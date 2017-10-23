import Ember from 'ember';
import { clickable, isVisible } from 'ember-cli-page-object';

const { $, run } = Ember;

export default {
  scope: '.verification-document',

  clickSubmit: clickable('button'),

  error: {
    scope: '.error'
  },

  rendersFileUpload: isVisible('input[type=file]'),

  // since it's near impossible to simulate selecting a file with a filepicker
  // this does the "next best" thing and triggers the "upload done" action on the component
  triggerDocumentSubmitted(context, stripeFileId = 'fil_test') {
    let id = $(this.scope).attr('id');
    let component = context.container.lookup('-view-registry:main')[id];

    run(component, () => {
      component.get('onUploadDone').call(component, stripeFileId);
    });
  }
};
