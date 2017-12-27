import {
  clickable,
  collection,
  create,
  fillable,
  text,
  value,
  visitable
} from 'ember-cli-page-object';

import categoryCheckboxes from 'code-corps-ember/tests/pages/components/category-checkboxes';
import imageDrop from 'code-corps-ember/tests/pages/components/image-drop';
import navigationMenu from 'code-corps-ember/tests/pages/components/navigation-menu';
import skillsTypeahead from 'code-corps-ember/tests/pages/components/skills-typeahead';

export default create({
  visit: visitable(':organization/projects/new'),

  flashMessages: collection({
    scope: '.flash-messages--full-width',
    itemScope: '.flash-message'
  }),

  navigationMenu,

  projectForm: {
    scope: '[data-test-project-form]',

    callout: {
      scope: '[data-test-callout]',

      copyButton: {
        scope: '[data-test-copy]'
      }
    },

    categoryCheckboxes,

    clickSubmit: clickable('[data-test-submit]'),

    errors: collection({
      itemScope: '.input-group.has-error'
    }),

    descriptionValue: value('[name=description]'),

    imageDrop,

    inputDescription: fillable('[name=description]'),
    inputTitle: fillable('[name=title]'),

    skillsList: collection({
      scope: '.project-skills-list',
      itemScope: 'button',
      item: {
        text: text(),
        click: clickable()
      }
    }),

    skillsTypeahead,

    slugValue: value('[name=slug]'),
    titleValue: value('[name=title]')
  }
});
