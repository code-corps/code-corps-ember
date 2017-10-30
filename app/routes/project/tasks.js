import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.modelFor('project').reload();
  },

  renderTemplate() {
    this.render('project/tasks', { into: 'application' });
  }
});
