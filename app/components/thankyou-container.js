import Ember from 'ember';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  classNames: ['thankyou-container'],

  projectIconAltText: computed('project.title', function() {
    let projectTitle = get(this, 'project.title');

    return `Successfully donated to ${projectTitle}`;
  })
});
