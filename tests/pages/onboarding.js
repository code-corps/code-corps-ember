import {
  attribute,
  clickable,
  collection,
  create,
  fillable,
  hasClass,
  text,
  triggerable,
  visitable
} from 'ember-cli-page-object';
import imageDrop from 'code-corps-ember/tests/pages/components/image-drop';
import navMenu from './components/navigation-menu';
import skillsTypeahead from './components/skills-typeahead';

export default create({
  start: visitable('/start'),
  interests: visitable('/start/interests'),
  skills: visitable('/start/skills'),
  expertise: visitable('/start/expertise'),

  firstName: fillable('[name="firstName"]'),
  firstNameEnter: triggerable('keyup', '[name="firstName"]', { eventProperties: { keyCode: 13 } }),
  lastName: fillable('[name="lastName"]'),
  lastNameEnter: triggerable('keyup', '[name="lastName"]', { eventProperties: { keyCode: 13 } }),
  clickCategoryItem: clickable('.category-item button'),

  footer: {
    scope: '.site-footer'
  },

  startButton: {
    scope: '.hello__column--name-input button',
    isDisabled: attribute('disabled')
  },

  startFooterButton: {
    scope: '.start__footer button',
    isDisabled: attribute('disabled')
  },

  imageDrop,

  popularSkillsList: collection('[data-test-popular-skills-list] button', {
    text: text(),
    click: clickable()
  }),

  roleColumns: collection('.expertise__column', {
    hasClass,

    header: {
      scope: 'h3',
      title: text()
    },

    roles: collection('.role-item', {
      button: {
        scope: 'button',
        text: text(),
        hasClass
      }
    })
  }),

  userSkillsList: collection('[data-test-user-skills-list] button', {
    text: text(),
    click: clickable()
  }),

  // select and manipulate .skills-typeahead and various site-chrome nodes to
  // this page
  skillsTypeahead,
  navMenu
});
