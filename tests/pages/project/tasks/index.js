import {
  clickable,
  create,
  visitable
} from 'ember-cli-page-object';
import projectDetails from 'code-corps-ember/tests/pages/components/project-details';
import projectMenu from 'code-corps-ember/tests/pages/components/project-menu';
import taskBoard from 'code-corps-ember/tests/pages/components/task-board';

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
  clickCancel: clickable('.cancel'),

  projectDetails,
  projectMenu,
  taskBoard
});
