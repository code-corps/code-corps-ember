import {
  create,
  visitable
} from 'ember-cli-page-object';
import project from '../pages/components/project-list';

export default create({
  visit: visitable('/:slug/projects'),

  project
});
