import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/project-header';
import stubService from 'code-corps-ember/tests/helpers/stub-service';

let page = PageObject.create(component);

moduleForComponent('project-header', 'Integration | Component | project header', {
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

  page.render(hbs`{{project-header project=project}}`);

  assert.equal(page.icon.src, mockProject.iconThumbUrl, 'Icon is rendered');
  assert.equal(page.title.text, mockProject.title, 'Title is rendered');
});

test('it triggers binding when clicking join project button', function(assert) {
  assert.expect(1);
  this.set('project', mockProject);

  stubService(this, 'session', { isAuthenticated: true });
  stubService(this, 'current-user', { user: { id: 'test' } });
  stubService(this, 'project-user', {
    joinProject(joinedProject) {
      assert.deepEqual(joinedProject, mockProject);
    }
  });

  page.render(hbs`{{project-header project=project}}`);

  page.projectJoinModal.openButton.click();
  page.projectJoinModal.modal.joinProjectButton.click();
});
