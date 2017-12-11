import { create, collection, visitable } from 'ember-cli-page-object';

export default create({
  visit: visitable(':organization/:project/conversations'),

  conversations: collection({
    itemScope: '.conversation-list-item'
  })
});
