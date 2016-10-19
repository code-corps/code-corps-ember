import Ember from 'ember';

const {
  computed,
  inject: { service },
  Service
} = Ember;

export default Service.extend({
  currentUser: service(),
  totalSteps: computed.alias('_steps.length'),

  _steps: [
    {
      number: 1,
      state: 'signed_up',
      currentRoute: 'start.hello',
      nextRoute: 'start.interests',
      nextStateTransition: 'edit_profile'
    },
    {
      number: 2,
      state: 'edited_profile',
      currentRoute: 'start.interests',
      nextRoute: 'start.expertise',
      nextStateTransition: 'select_categories'
    },
    {
      number: 3,
      state: 'selected_categories',
      currentRoute: 'start.expertise',
      nextRoute: 'start.skills',
      nextStateTransition: 'select_roles'
    },
    {
      number: 4,
      state: 'selected_roles',
      currentRoute: 'start.skills',
      nextRoute: 'projects-list',
      nextStateTransition: 'select_skills'
    }
  ],

  _currentStep: computed('currentUser.user.state', function() {
    let state = this.get('currentUser.user.state');
    let steps = this.get('_steps');
    return steps.find((step) => {
      return step.state === state;
    });
  }),

  currentRoute: computed.alias('_currentStep.currentRoute'),
  currentStepNumber: computed.alias('_currentStep.number'),
  currentStepState: computed.alias('_currentStep.state'),
  isEditingProfile: computed.equal('currentStepState', 'signed_up'),
  isOnboarding: computed.or('isEditingProfile', 'isSelectingCategories', 'isSelectingRoles', 'isSelectingSkills'),
  isSelectingCategories: computed.equal('currentStepState', 'edited_profile'),
  isSelectingRoles: computed.equal('currentStepState', 'selected_categories'),
  isSelectingSkills: computed.equal('currentStepState', 'selected_roles'),
  nextRoute: computed.alias('_currentStep.nextRoute'),
  nextStateTransition: computed.alias('_currentStep.nextStateTransition'),
  routes: computed.mapBy('_steps', 'currentRoute'),

  progressPercentage: computed('currentStepNumber', 'totalSteps', function() {
    return (this.get('currentStepNumber') / this.get('totalSteps')) * 100;
  })
});
