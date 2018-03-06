import {
  collection,
  create,
  visitable
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/admin'),
  flashMessages: collection('.flash-messages--full-width .flash-message')
});
