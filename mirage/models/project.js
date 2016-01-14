import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

let ProjectModel = Model.extend({
  user: belongsTo(),
  organization: belongsTo(),

  posts: hasMany(),

  createOwner(attrs, type) {
    if (!type) {
      throw new Error('Type is required');
    }

    if (type === 'user') {
      this.createUser(attrs);
    } else if (type === 'organization') {
      this.createOrganization(attrs);
    }

  }
});

Object.defineProperty(ProjectModel.prototype, 'owner', {
  get () {
    if (this.ownerType === 'user') {
      return this.user;
    } else if (this.ownerType === 'organization') {
      return this.organization;
    }
  },

  set (owner) {
    if (owner.modelName === 'user') {
      this.user = owner;
    } else if (owner.modelName === 'organization') {
      this.organization = owner;
    }
  },
});

Object.defineProperty(ProjectModel.prototype, 'ownerId', {
  get () {
    if (this.ownerType) {
      return this.attrs[this.ownerType + 'Id'];
    }
  },

  set (id) {
    if (id && !schema) {
      var i = 0;
      throw 'Couldn\'t find ' + this.ownerType + ' with id = ' + id;
    } else {
      this.attrs[this.ownerType + 'Id'] = id;
      return this;
    }
  },
});

export default ProjectModel;
