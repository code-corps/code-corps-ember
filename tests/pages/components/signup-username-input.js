import {
  fillable,
  triggerable
} from 'ember-cli-page-object';

import suggestionsArea from 'code-corps-ember/tests/pages/components/_suggestions-area';

export default {
  fillIn: fillable('input'),
  keydown: triggerable('keydown', 'input'),

  suggestionsArea
};
