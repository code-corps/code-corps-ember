import { collection } from 'ember-cli-page-object';
import { fullScope } from 'ember-cli-page-object/extend';
import { select } from 'code-corps-ember/tests/helpers/x-select';

export default {
  scope: '.select-github-repo',

  select: {
    scope: 'select:eq(0)',

    fillIn(text) {
      let scope = fullScope(this, this.scope);
      select(scope, text);
      return this;
    },

    options: collection({
      itemScope: 'option'
    })
  }
};
