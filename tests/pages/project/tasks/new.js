import {
  clickable,
  collection,
  create,
  fillable,
  visitable
} from 'ember-cli-page-object';

export default create({
  visit: visitable(':organization/:project/tasks/new'),

  clickPreviewTask: clickable('.preview'),

  taskTitle: fillable('[name=title]'),
  taskMarkdown: fillable('[name=markdown]'),
  taskType: fillable('[name=task-type]'),

  clickSubmit: clickable('[name=submit]'),

  previewBody: {
    scope: '.body-preview'
  },

  errors: collection({
    scope: '.error'
  })
});
