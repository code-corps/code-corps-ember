import { create, visitable } from 'ember-cli-page-object';
import donationProgress from '../components/donations/donation-progress';
import donationStatus from '../components/donations/donation-status';
import editorWithPreview from '../components/editor-with-preview';
import projectLongDescription from '../components/project-long-description';
import projectNotifications from '../components/project-notifications';

export default create({
  visit: visitable(':organization/:project'),

  donationProgress,
  donationStatus,
  editorWithPreview,
  projectLongDescription,
  projectNotifications
});
