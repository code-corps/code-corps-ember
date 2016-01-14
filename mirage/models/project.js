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
  },

  newOwner(attrs, type) {
    if (!type) {
      throw new Error('Type is required');
    }

    if (type === 'user') {
      this.newUser(attrs);
    } else if (type === 'organization') {
      this.newOrganization(attrs);
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
  },

  set (id) {
    if (id && !this._schema[this.ownerType].find(id)) {
      throw 'Couldn\'t find ' + this.ownerType + ' with id = ' + id;
    } else {
      if (this.ownerType === 'user') {
        this.userId = id;
        this.organizationId = undefined;
      } else if (this.ownerType === 'organization') {
        this.organizationId = id;
        this.userId = undefined;
      }
      return this;
    }
  },
});

Object.defineProperty(ProjectModel.prototype, 'ownerType', {
  get () {
    if (this.user) {
      return 'user';
    } else if (this.organization) {
      return 'organization';
    }
  }
});

export default ProjectModel;
