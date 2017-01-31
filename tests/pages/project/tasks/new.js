import {
  clickable,
  collection,
  create,
  fillable,
  visitable
} from 'ember-cli-page-object';

import projectMenu from 'code-corps-ember/tests/pages/components/project-menu';

export default create({
  clickPreviewTask: clickable('.preview'),
  clickSubmit: clickable('[name=submit]'),

  errors: collection({
    scope: '.error'
  }),

  taskTitle: fillable('[name=title]'),
  taskMarkdown: fillable('[name=markdown]'),
  taskType: fillable('[name=task-type]'),

  projectMenu,

  previewBody: {
    scope: '.body-preview'
  },

  visit: visitable(':organization/:project/tasks/new')
});
