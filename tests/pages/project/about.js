import { create, visitable } from 'ember-cli-page-object';
import donationStatus from '../components/donations/donation-status';
import editorWithPreview from '../components/editor-with-preview';
import projectLongDescription from '../components/project-long-description';

export default create({
  visit: visitable(':organization/:project'),

  donationStatus,
  editorWithPreview,
  projectLongDescription
});
