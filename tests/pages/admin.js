import {
  collection,
  create,
  visitable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/admin'),

  flashMessages: collection({
    scope: '.flash-messages--full-width',
    itemScope: '.flash-message'
  })
});
