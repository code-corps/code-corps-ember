import {
  clickable,
  create,
  visitable
} from 'ember-cli-page-object';
import projectDetails from '../../components/project-details';
import projectMenu from '../../components/project-menu';

export default create({
  visit: visitable(':organization/:project/tasks'),

  flexboxSpacer: {
    scope: '.flexbox-spacer'
  },

  footer: {
    scope: '.site-footer'
  },

  mainContainer: {
    scope: '.main.container.for-project-tasks'
  },

  clickNewTask: clickable('.new-task'),

  projectDetails,
  projectMenu
});
