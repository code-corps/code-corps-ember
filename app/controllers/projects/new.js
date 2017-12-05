import Controller from '@ember/controller';
import { get, getProperties, observer, set, setProperties } from '@ember/object';
import { alias, lte } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { isNonValidationError } from 'code-corps-ember/utils/error-utils';
import recordsList from 'code-corps-ember/utils/records-list';

const COPY_SUCCESS = 'Your project now has the details from your organization.';
const PROJECT_SUCCESS = 'Your project was created successfully.';

export default Controller.extend({
  flashMessages: service(),
  loadingBar: service(),
  projectSkillsList: service(),
  store: service(),

  categories: null,
  project: null,
  showCallout: true,

  isFirstProject: lte('organizationProjectsCount', 1),
  organization: alias('project.organization'),
  organizationProjectsCount: alias('organization.projects.length'),
  projectCategories: alias('project.projectCategories'),
  projectSkills: alias('project.projectSkills'),

  projectTitleChanged: observer('project.title', function() {
    let title = get(this, 'project.title');
    let slug = title ? title.dasherize() : '';
    set(this, 'project.slug', slug);
  }),

  addCategory(category) {
    let { project, store } = getProperties(this, 'project', 'store');
    let projectCategory = store.createRecord('project-category', { project, category });
    project.get('projectCategories').pushObject(projectCategory);
  },

  removeCategory(category) {
    let { project, projectCategories }
      = getProperties(this, 'project', 'projectCategories');

    let projectCategory = recordsList.find(projectCategories, category, project);
    projectCategory.destroyRecord();
  },

  removeProjectSkill(projectSkill) {
    return projectSkill.destroyRecord();
  },

  toggleSkill(skill) {
    let list = get(this, 'projectSkillsList');
    return list.toggleWithoutSave(skill);
  },

  updateCategories(newSelection, value, operation) {
    if (operation === 'added') {
      this.addCategory(value);
    }

    if (operation === 'removed') {
      this.removeCategory(value);
    }
  },

  uploadDone(cloudinaryPublicId) {
    let project = get(this, 'project');
    set(project, 'cloudinaryPublicId', cloudinaryPublicId);
    this._stopLoadingBar();
  },

  uploadErrored() {
    this._stopLoadingBar();
    get(this, 'flashMessages').clearMessages().danger('Upload failed');
  },

  uploadStarted() {
    this._startLoadingBar();
  },

  actions: {
    copyOrganizationData(organization) {
      let { cloudinaryPublicId, description, iconLargeUrl, name, slug }
        = getProperties(organization, 'cloudinaryPublicId', 'description', 'iconLargeUrl', 'name', 'slug');
      let project = get(this, 'project');
      let attrs = { cloudinaryPublicId, description, iconLargeUrl, slug, title: name };
      setProperties(project, attrs);
    },

    dismissCallout() {
      set(this, 'showCallout', false);
    },

    flashCopySuccess() {
      get(this, 'flashMessages').clearMessages().success(COPY_SUCCESS);
    },

    save() {
      let project = get(this, 'project');

      let onCreated = (project) => {
        get(this, 'flashMessages').clearMessages().success(PROJECT_SUCCESS);
        this.transitionToRoute('project.index', project);
      };

      let onFailedSave = (payload) => {
        if (isNonValidationError(payload)) {
          // TODO: Just a temporary handler. We should parse specific messages instead
          let { message } = payload;
          get(this, 'flashMessages').clearMessages().danger(message);
        }
      };

      project.save().then(onCreated).catch(onFailedSave);
    }
  },

  _startLoadingBar() {
    get(this, 'loadingBar').start();
  },

  _stopLoadingBar() {
    get(this, 'loadingBar').stop();
  }
});
