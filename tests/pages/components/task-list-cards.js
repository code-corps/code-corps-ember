import {
  collection
} from 'ember-cli-page-object';
import taskCard from './task-card';

export default {
  taskCards: collection('.task-card', taskCard)
};
