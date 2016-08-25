import {
  clickable,
  collection,
  create,
  fillable,
  visitable
} from 'ember-cli-page-object';

export default create({
  visitIndex: visitable(':organization/:project/posts'),
  visitNew: visitable(':organization/:project/posts/new'),

  clickNewPost: clickable('.new-post'),
  clickPreviewPost: clickable('.preview'),

  postTitle: fillable('[name=title]'),
  postMarkdown: fillable('[name=markdown]'),
  postType: fillable('[name=post-type]'),

  clickSubmit: clickable('[name=submit]'),
  
  previewBody: {
    scope: '.body-preview'
  },

  errors: collection({
    scope: '.error'
  })
});
