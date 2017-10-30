import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import OnboardingControllerMixin from '../../mixins/onboarding-controller';

export default Controller.extend(OnboardingControllerMixin, {
  userRoles: service()
});
