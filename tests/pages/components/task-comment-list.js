import {
  collection
} from 'ember-cli-page-object';

export default {
  comments: collection({
    scope: '.task-comment-list',
    itemScope: '.comment-item'
  })
};
