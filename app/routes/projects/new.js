import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get, setProperties } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Route.extend(AuthenticatedRouteMixin, {
  currentUser: service(),
  flashMessages: service(),
  projectSkillsList: service(),

  async model() {
    let { slugged_route_slug: slug } = this.paramsFor('projects');
    let sluggedRoute = await this.store.queryRecord('slugged-route', { slug });
    let organization = await get(sluggedRoute, 'organization');
    let categories = await this.store.findAll('category');
    let project = this._initProject(organization);
    return { categories, project };
  },

  setupController(controller, { categories, project }) {
    setProperties(controller, { categories, project });
  },

  afterModel({ project }) {
    get(this, 'projectSkillsList').setProject(project);
  },

  _initProject(organization) {
    return get(this, 'store').createRecord('project', { organization });
  },

  actions: {
    willTransition(transition) {
      let project = get(this, 'controller.project');
      // prompt to confirm if the user did not save
      if (get(project, ('isNew'))) {
        let confirmed = window.confirm('You will lose any unsaved information if you leave this page. Are you sure?');
        if (confirmed) {
          project.destroyRecord();
        } else {
          transition.abort();
        }
      }
    }
  }
});
