import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Service.extend({
  currentUser: service(),
  totalSteps: Ember.computed.alias('_steps.length'),

  _steps: [
    {
      number: 1,
      state: 'signed_up',
      currentRoute: 'start.hello',
      nextRoute: 'start.interests',
      nextStateTransition: 'edit_profile',
    },
    {
      number: 2,
      state: 'edited_profile',
      currentRoute: 'start.interests',
      nextRoute: 'start.expertise',
      nextStateTransition: 'select_categories',
    },
    {
      number: 3,
      state: 'selected_categories',
      currentRoute: 'start.expertise',
      nextRoute: 'start.skills',
      nextStateTransition: 'select_roles',
    },
    {
      number: 4,
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

  currentRoute: Ember.computed.alias('_currentStep.currentRoute'),
  currentStepNumber: Ember.computed.alias('_currentStep.number'),
  currentStepState: Ember.computed.alias('_currentStep.state'),
  isEditingProfile: Ember.computed.equal('currentStepState', 'signed_up'),
  isOnboarding: Ember.computed.or('isEditingProfile', 'isSelectingCategories', 'isSelectingRoles', 'isSelectingSkills'),
  isSelectingCategories: Ember.computed.equal('currentStepState', 'edited_profile'),
  isSelectingRoles: Ember.computed.equal('currentStepState', 'selected_categories'),
  isSelectingSkills: Ember.computed.equal('currentStepState', 'selected_roles'),
  nextRoute: Ember.computed.alias('_currentStep.nextRoute'),
  nextStateTransition: Ember.computed.alias('_currentStep.nextStateTransition'),
  routes: Ember.computed.mapBy('_steps', 'currentRoute'),

  progressPercentage: Ember.computed('currentStepNumber', 'totalSteps', function() {
    return (this.get('currentStepNumber') / this.get('totalSteps')) * 100;
  }),
});
