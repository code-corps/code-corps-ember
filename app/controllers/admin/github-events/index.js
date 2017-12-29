import Controller from '@ember/controller';
import { set } from '@ember/object';

export default Controller.extend({
  queryParams: ['page', 'size', 'status'],

  page: 1,
  size: 20,
  status: null,

  actions: {
    changeStatus(status) {
      set(this, 'status', status);
    }
  }
});
