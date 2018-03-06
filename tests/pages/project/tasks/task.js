import {
  clickable,
  collection,
  create,
  fillable,
  text,
  value,
  visitable
} from 'ember-cli-page-object';
import commentItem from '../../components/comment-item';
import createCommentForm from '../../components/create-comment-form';
import skillsTypeahead from 'code-corps-ember/tests/pages/components/skills-typeahead';
import taskCommentList from 'code-corps-ember/tests/pages/components/task-comment-list';

export default create({
  commentItem,
  createCommentForm,
  taskCommentList,

  visit: visitable(':organization/:project/tasks/:number'),

  clickSave: clickable('.save'),

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

  errors: collection('.error'),

  skillsTypeahead,

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

  taskSkillsList: collection('.task-skills-list button', {
    text: text(),
    click: clickable()
  }),

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
