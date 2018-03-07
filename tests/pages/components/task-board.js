import { collection } from 'ember-cli-page-object';
import taskListCards from 'code-corps-ember/tests/pages/components/task-list-cards';

export default {
  scope: '.task-board',
  taskLists: collection('', taskListCards)
};
