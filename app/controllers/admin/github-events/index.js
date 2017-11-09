import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: ['page', 'size'],
  page: 1,
  size: 20
});
