import {
  clickable,
  collection,
  create,
  fillable,
  visitable
} from 'ember-cli-page-object';

export default create({
  visitIndex: visitable(':organization/:project/tasks'),
  visitNew: visitable(':organization/:project/tasks/new'),

  clickNewTask: clickable('.new-task'),
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
