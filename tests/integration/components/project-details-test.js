import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/project-details';
import stubService from 'code-corps-ember/tests/helpers/stub-service';

let page = PageObject.create(component);

moduleForComponent('project-details', 'Integration | Component | project details', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

let mockProject = {
  title: 'Test Project',
  iconThumbUrl: 'icon.png',
  projectUsers: []
};

test('it renders title', function(assert) {
  assert.expect(2);

  this.set('project', mockProject);

  page.render(hbs`{{project-details project=project}}`);

  assert.equal(page.icon.src, mockProject.iconThumbUrl, 'Icon is rendered');
  assert.equal(page.title.text, mockProject.title, 'Title is rendered');
});

test('it triggers binding when clicking join project button', function(assert) {
  assert.expect(4);
  this.set('project', mockProject);

  // this is complex due to needing to mock the store and several
  // mock records from within
  // Once we move the joinProject action outside, it can be simplified
  stubService(this, 'store', {
    createRecord(type, { user, project, role }) {
      assert.deepEqual(user, { id: 'test' }, 'User was assigned.');
      assert.deepEqual(project, mockProject, 'Project was assigned.');
      assert.equal(role, 'pending', 'Role was assigned.');
      return {
        save() {
          assert.ok(true, 'Record was saved.');
        }
      };
    }
  });
  stubService(this, 'session', { isAuthenticated: true });
  stubService(this, 'current-user', { user: { id: 'test' } });

  page.render(hbs`{{project-details project=project}}`);

  page.joinProjectButton.click();
});
