import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

let ProjectModel = Model.extend({
  user: belongsTo(),
  organization: belongsTo(),

  posts: hasMany(),

  createOwner(attrs, type) {
    if (!type) {
      throw new Error('Type is required');
    }

    this.ownerType = type;

    if (type === 'user') {
      return this.createUser(attrs);
    } else if (type === 'organization') {
      return this.createOrganization(attrs);
    }
  },

  newOwner(attrs, type) {
    if (!type) {
      throw new Error('Type is required');
    }

    this.ownerType = type;

    if (type === 'user') {
      return this.newUser(attrs);
    } else if (type === 'organization') {
      return this.newOrganization(attrs);
    }
  }
});

// the following properties serve as an owner polymorphic relationship

Object.defineProperty(ProjectModel.prototype, 'owner', {
  get () {
    if (this.ownerType === 'user') {
      return this.user;
    } else if (this.ownerType === 'organization') {
      return this.organization;
    }
  },

  set (owner) {
    this.ownerType = owner.modelName;

    if (owner.modelName === 'user') {
      this.user = owner;
      this.organization = undefined;
    } else if (owner.modelName === 'organization') {
      this.organization = owner;
      this.user = undefined;
    }
  },
});

Object.defineProperty(ProjectModel.prototype, 'ownerId', {
  get () {
    if (this.ownerType) {
      return this.attrs[this.ownerType + 'Id'];
    }
  }
});

Object.defineProperty(ProjectModel.prototype, 'ownerType', {
  get () {
    return this.attrs.ownerType;
  },

  set (type) {
    this.attrs.ownerType = type;
  }
});

export default ProjectModel;
