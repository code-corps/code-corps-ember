import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Service.extend({
  currentUser: service(),

  totalSteps: Ember.computed.alias('_steps.length'),

  _steps: [
    {
      number: 1,
      state: 'signed_up',
      currentRoute: 'start.interests',
      nextRoute: 'start.expertise',
      nextStateTransition: 'select_categories',
    },
    {
      number: 2,
      state: 'selected_categories',
      currentRoute: 'start.expertise',
      nextRoute: 'start.skills',
      nextStateTransition: 'select_roles',
    },
    {
      number: 3,
      state: 'selected_roles',
      currentRoute: 'start.skills',
      nextRoute: 'projects-list',
      nextStateTransition: 'select_skills',
    }
  ],

  _currentStep: Ember.computed('currentUser.user.state', function() {
    let state = this.get('currentUser.user.state');
    let steps = this.get('_steps');
    return steps.find((step) => { return step.state === state; });
  }),

  currentStepNumber: Ember.computed.alias('_currentStep.number'),
  currentStepState: Ember.computed.alias('_currentStep.state'),

  isSelectingCategories: Ember.computed.equal('currentStepState', 'signed_up'),
  isSelectingRoles: Ember.computed.equal('currentStepState', 'selected_categories'),
  isSelectingSkills: Ember.computed.equal('currentStepState', 'selected_roles'),

  isOnboarding: Ember.computed.or('isSelectingCategories', 'isSelectingRoles', 'isSelectingSkills'),

  progressPercentage: Ember.computed('currentStepNumber', 'totalSteps', function() {
    return (this.get('currentStepNumber') / this.get('totalSteps')) * 100;
  }),

  currentRoute: Ember.computed.alias('_currentStep.currentRoute'),
  nextRoute: Ember.computed.alias('_currentStep.nextRoute'),
  nextStateTransition: Ember.computed.alias('_currentStep.nextStateTransition'),
  routes: Ember.computed.mapBy('_steps', 'currentRoute'),
});
