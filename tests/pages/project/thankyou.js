import { clickable, create, isVisible, visitable } from 'ember-cli-page-object';

export default create({
  visit: visitable(':organization/:project/thankyou'),

  clickProjectLink: clickable('.project-link a'),

  rendersProjectHeader: isVisible('.project-header'),
  rendersIcon: isVisible('.icon img'),
  rendersThankYouHeader: isVisible('.header'),
  rendersText: isVisible('.text')
});
