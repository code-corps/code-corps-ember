import Service from '@ember/service';
import { typeOf } from '@ember/utils';
import Ember from 'ember';

const {
  Logger: { error }
} = Ember;

let stubService = (scope, name, hash = {}) => {
  if (typeOf(name) !== 'string') {
    error('The name of the service must be a string');
  }

  if (typeOf(scope) !== 'object') {
    error('You must pass the test object to the stubService helper');
  }

  let stubbedService = Service.extend(hash);
  scope.register(`service:${name}`, stubbedService);
  scope.inject.service(name, { as: name });
};

export default stubService;
