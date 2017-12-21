import {
  clickable,
  create,
  visitable
} from 'ember-cli-page-object';
import projectHeader from 'code-corps-ember/tests/pages/components/project-header';
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

  siteContentContainer: {
    scope: '.site-content.fill-height'
  },

  clickNewTask: clickable('.new-task'),
  clickCancel: clickable('.cancel'),

  projectHeader,
  projectMenu,
  taskBoard
});
