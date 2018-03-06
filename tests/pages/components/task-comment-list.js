import {
  collection
} from 'ember-cli-page-object';

export default {
  comments: collection('.task-comment-list  .comment-item')
};
