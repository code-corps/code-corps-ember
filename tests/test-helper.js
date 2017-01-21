import resolver from './helpers/resolver';
import registerSelectHelper from './helpers/register-select-helper';
registerSelectHelper();
import './helpers/flash-message';

import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);
