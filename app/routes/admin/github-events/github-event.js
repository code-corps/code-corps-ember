import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.find('github-event', params.id);
  }
});
