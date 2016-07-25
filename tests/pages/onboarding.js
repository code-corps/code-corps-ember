import {
  attribute,
  clickable,
  collection,
  create,
  fillable,
  hasClass,
  text,
  visitable,
} from 'ember-cli-page-object';
import userSkillsInput from './components/user-skills-input';
import navMenu from './components/navigation-menu';

export default create({
  start: visitable('/start'),
  interests: visitable('/start/interests'),
  skills: visitable('/start/skills'),
  expertise: visitable('/start/expertise'),

  firstName: fillable('[name="firstName"]'),
  lastName: fillable('[name="lastName"]'),
  clickCategoryItem: clickable('.category-item button'),
  footer: {
    scope: '.site-footer',
  },

  startButton: {
    scope: '.start-actions button',
    isDisabled: attribute('disabled')
  },

  roles: collection({
    itemScope: '.roles-column',

    item: {
      title: text('h3'),
      header: {
        scope: '.roles-column-header',
        hasClass
      },
      button: {
        scope: 'button',
        text: text(),
        hasClass
      }
    }
  }),

  userSkillsList: collection({
    scope: '.user-skills-list',
    itemScope: 'button',
    item: {
      text: text(),
      click: clickable()
    }
  }),

  // select and manipulate .user-skills-input and various site-chrome nodes to
  // this page
  userSkillsInput,
  navMenu
});
