import { collection, text } from 'ember-cli-page-object';

export default {
  scope: '.error-formatter',

  errors: collection({
    itemScope: '.error',

    item: {
      message: text()
    }
  })
};
