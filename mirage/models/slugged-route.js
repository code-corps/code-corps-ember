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
      let user = this.createUser(attrs);
      this.owner = user;
      return user;
    } else if (type === 'Organization') {
      let organization = this.createOrganization(attrs);
      this.owner = organization;
      return organization;
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

// the following properties serve as an owner polymorphic relationship

Object.defineProperty(SluggedRouteModel.prototype, 'owner', {
  get () {
    if (this.ownerType === 'User') {
      return this.user;
    } else if (this.ownerType === 'Organization') {
      return this.organization;
    }
  },

  set (owner) {
    this.ownerType = owner.modelName.capitalize();

    if (owner.modelName === 'user') {
      this.user = owner;
      this.organization = undefined;
    } else if (owner.modelName === 'organization') {
      this.organization = owner;
      this.user = undefined;
    }
  },
});

Object.defineProperty(SluggedRouteModel.prototype, 'ownerId', {
  get () {
    return this.attrs.ownerId;
  },

  set (id) {
    this.attrs.ownerId = id;
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
