import {
  create,
  visitable
} from 'ember-cli-page-object';

import { collection } from 'ember-cli-page-object';

export default create({
  visit: visitable('/github'),

  // we have a component under tests/pages/components/flash-messages.js
  // but it doesn't really seem that flexible for testing
  // this gives us a collection, so we can check count, as well as text for
  // each of them.
  flashMessages: collection({
    itemScope: '.flash>div'
  })
});
