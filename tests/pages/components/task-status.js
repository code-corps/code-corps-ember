import {
  hasClass,
  text
} from 'ember-cli-page-object';

export default {
  scope: '.task-status',
  
  isClosed: hasClass('closed'),
  isOpen: hasClass('open'),
  statusText: text()
};
