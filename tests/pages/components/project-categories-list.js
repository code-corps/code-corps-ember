import {
  collection
} from 'ember-cli-page-object';
import projectCategoryItem from 'code-corps-ember/tests/pages/components/project-category-item';

export default {
  scope: '.categories',

  projectCategoryItems: collection('.project-category-item', projectCategoryItem)
};
