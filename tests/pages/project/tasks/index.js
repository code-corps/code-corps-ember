import {
  clickable,
  create,
  visitable
} from 'ember-cli-page-object';
import pagerControl from '../../components/pager-control';
import projectDetails from '../../components/project-details';
import projectMenu from '../../components/project-menu';
import projectTaskList from '../../components/project-task-list';

export default create({
  visit: visitable(':organization/:project/tasks'),

  clickNewTask     : clickable('.new-task'),
  clickPreviewTask : clickable('.preview'),

  pagerControl,
  projectDetails,
  projectMenu,
  projectTaskList
});
