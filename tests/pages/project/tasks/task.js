import {
  clickable,
  collection,
  create,
  fillable,
  value,
  visitable
} from 'ember-cli-page-object';
import commentItem from '../../components/comment-item';
import createCommentForm from '../../components/create-comment-form';

export default create({
  commentItem,
  createCommentForm,

  visit: visitable(':organization/:project/tasks/:number'),

  clickSave: clickable('.save'),

  comments: collection({
    scope: '.task-comment-list',
    itemScope: '.comment-item'
  }),

  editor: {
    scope: '.editor-with-preview',

    bodyPreview: {
      scope: '.body-preview p'
    },

    fillInMarkdown: fillable('textarea[name=markdown]'),

    previewButton: {
      scope: '.preview'
    }
  },

  errors: collection({
    itemScope: '.error'
  }),

  taskBody: {
    scope: '.task-body',

    commentBody: {
      scope: '.comment-body p'
    },

    editButton: {
      scope: '.edit'
    }
  },

  taskStatusButton: {
    scope: '.task-status-button',

    close: {
      scope: '[name=close]'
    },

    open: {
      scope: '[name=open]'
    }
  },

  taskTitle: {
    scope: '.task-title',

    editButton: {
      scope: '.edit'
    },

    fillInTitle: fillable('input[name=title]'),

    inputValue: value('input[name=title]'),

    saveButton: {
      scope: '.save'
    },

    title: {
      scope: 'h2.title'
    }
  }
});
