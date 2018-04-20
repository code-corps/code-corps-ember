import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get, setProperties } from '@ember/object';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Confirm from 'code-corps-ember/mixins/confirm';

export default Route.extend(AuthenticatedRouteMixin, Confirm, {
  modelName: 'project',

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
  }
});
