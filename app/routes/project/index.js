import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

export default Route.extend({
  currentUser: service(),
  userSubscriptions: service(),

  async model() {
    let project = await this.modelFor('project').reload();
    let subscription = await this.get('userSubscriptions').fetchForProject(project);

    // Fetch the project users to load abilities
    await project.get('projectUsers');

    return { project, subscription };
  },

  setupController(controller, { project, subscription }) {
    controller.setProperties({ project, subscription });
  }
});
