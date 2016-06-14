import MirageApplicationSerializer from './application';

import _isFunction from 'lodash/lang/isFunction';
import _isString from 'lodash/lang/isString';
import _get from 'lodash/object/get';
import _flatten from 'lodash/array/flatten';
import _trim from 'lodash/string/trim';
import _ from 'lodash';

import { singularize, pluralize, camelize } from 'ember-cli-mirage/utils/inflector';
import Collection from 'ember-cli-mirage/orm/collection';

export default MirageApplicationSerializer.extend({
  isCollection(object) {
    return object instanceof Collection;
  },

  _resourceObjectFor(model, _request) {
    let attrs = this._attrsForModel(model, _request, true, false);

    let obj = {
      type: this.typeKeyForModel(model),
      id: model.id,
      attributes: attrs
    };

    let linkData = this._linkDataFor(model);

    model.associationKeys.forEach(camelizedType => {
      let relationship = this._getRelatedValue(model, camelizedType);
      let relationshipKey = this.keyForRelationship(camelizedType);

      if (this.isCollection(relationship)) {
        if (!obj.relationships) {
          obj.relationships = {};
        }

        obj.relationships[relationshipKey] = {
          data: relationship.models.map(model => {
            return {
              type: this.typeKeyForModel(model),
              id: model.id
            };
          })
        };
      } else if (relationship) {
        if (!obj.relationships) {
          obj.relationships = {};
        }

        obj.relationships[relationshipKey] = {
          data: {
            type: this.typeKeyForModel(relationship),
            id: relationship.id
          }
        };
      }

      if (linkData && linkData[camelizedType]) {
        this._addLinkData(obj, relationshipKey, linkData[camelizedType]);
      }
    });

    return obj;
  },

  _getRelatedValue(model, key) {
    let camelizedKey = camelize(key);
    if (_isFunction(this[camelizedKey])) {
      return this[camelizedKey](model);
    } else {
      return model[camelizedKey];
    }
  },

  _getRelationshipNames(request = {}) {
    let requestRelationships = _get(request, 'queryParams.include');
    let relationships;

    if (_isString(requestRelationships)) {
      relationships = requestRelationships;
    } else {
      relationships = _get(this, 'include', []).join(',');
    }

    if (relationships.length) {
      let expandedRelationships = relationships
        .split(',')
        .map(_trim)
        .map((r) => r.split('.').map((_, index, elements) => elements.slice(0, index + 1).join('.')));

      return _flatten(expandedRelationships);
    }
    return [];
  },

  _getRelatedWithPath(parentModel, path) {
    return path
      .split('.')
      .reduce((related, relationshipName) => {
        return _(related)
          .map(r => this._getRelatedValue(r.reload(), relationshipName))
          .map(r => this.isCollection(r) ? r.models : r) // Turning Collections into Arrays for lodash to recognize
          .flatten()
          .filter()
          .value();
      }, [parentModel]);
  }
});
