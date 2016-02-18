import { Model, belongsTo } from 'ember-cli-mirage';

let SluggedRouteModel = Model.extend({
  user: belongsTo(),
  organization: belongsTo(),

  createOwner(attrs, type) {
    if (!type) {
      throw new Error('Type is required');
    }

    this.ownerType = type;

    if (type === 'User') {
      return this.createUser(attrs);
    } else if (type === 'Organization') {
      return this.createOrganization(attrs);
    }

  },

  newOwner(attrs, type) {
    if (!type) {
      throw new Error('Type is required');
    }

    this.ownerType = type;

    if (type === 'User') {
      return this.newUser(attrs);
    } else if (type === 'Organization') {
      return this.newOrganization(attrs);
    }

  }
});

// the following properties serve as an model polymorphic relationship

Object.defineProperty(SluggedRouteModel.prototype, 'model', {
  get () {
    if (this.ownerType === 'user') {
      return this.user;
    } else if (this.ownerType === 'organization') {
      return this.organization;
    }
  },

  set (model) {
    this.ownerType = model.modelName;

    if (model.modelName === 'user') {
      this.user = model;
      this.organization = undefined;
    } else if (model.modelName === 'organization') {
      this.organization = model;
      this.user = undefined;
    }
  },
});

Object.defineProperty(SluggedRouteModel.prototype, 'modelId', {
  get () {
    if (this.ownerType) {
      return this.attrs[this.ownerType + 'Id'];
    }
  }
});

Object.defineProperty(SluggedRouteModel.prototype, 'ownerType', {
  get () {
    return this.attrs.ownerType;
  },

  set (type) {
    this.attrs.ownerType = type;
  }
});

export default SluggedRouteModel;
