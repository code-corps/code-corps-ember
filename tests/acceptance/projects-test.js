import Ember from "ember";
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

let application;

module('Acceptance: Projects', {
  beforeEach: function() {
    application = startApp();
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('It renders all the required ui elements', (assert) => {
  assert.expect(2);

  let sluggedRoute = server.schema.sluggedRoute.create({ slug: 'test_organization' });
  let organization = sluggedRoute.createModel({ slug: 'test_organization' }, 'organization');
  sluggedRoute.save();
  for (let i = 0; i < 5; i++) {
    organization.createProject({
      slug: `test_project_${i}`,
      title: `Test project ${i}`
    });
  }
  organization.save();

  visit('/test_organization/projects');

  andThen(function() {
    assert.equal(find('.project-list').length, 1, 'project-list component is rendered');
    assert.equal(find('.project-list .project-item').length, 5, 'correct number of project-items is rendered');
  });
});
