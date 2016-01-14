import { Model, belongsTo } from 'ember-cli-mirage';

let MemberModel = Model.extend({
  user: belongsTo(),
  organization: belongsTo(),

  createModel(attrs, type) {
    if (!type) {
      throw new Error('Type is required');
    }

    this.modelType = type;

    if (type === 'user') {
      return this.createUser(attrs);
    } else if (type === 'organization') {
      return this.createOrganization(attrs);
    }

  },

  newModel(attrs, type) {
    if (!type) {
      throw new Error('Type is required');
    }

    this.modelType = type;

    if (type === 'user') {
      return this.newUser(attrs);
    } else if (type === 'organization') {
      return this.newOrganization(attrs);
    }

  }
});

// the following properties serve as an model polymorphic relationship

Object.defineProperty(MemberModel.prototype, 'model', {
  get () {
    if (this.modelType === 'user') {
      return this.user;
    } else if (this.modelType === 'organization') {
      return this.organization;
    }
  },

  set (model) {
    this.modelType = model.modelName;

    if (model.modelName === 'user') {
      this.user = model;
      this.organization = undefined;
    } else if (model.modelName === 'organization') {
      this.organization = model;
      this.user = undefined;
    }
  },
});

Object.defineProperty(MemberModel.prototype, 'modelId', {
  get () {
    if (this.modelType) {
      return this.attrs[this.modelType + 'Id'];
    }
  }
});

Object.defineProperty(MemberModel.prototype, 'modelType', {
  get () {
    return this.attrs.modelType;
  },

  set (type) {
    this.attrs.modelType = type;
  }
});

export default MemberModel;
