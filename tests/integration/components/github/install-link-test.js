import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { set } from '@ember/object';
import component from 'code-corps-ember/tests/pages/components/github/install-link';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';

let page = PageObject.create(component);

moduleForComponent('github/install-link', 'Integration | Component | github/install link', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it tracks clicking the link', function(assert) {
  assert.expect(1);

  let organization = { id: 1, name: 'Code Corps' };
  let project = { id: 1, title: 'Code Corps' };

  let mockMetrics = {
    trackEvent(data) {
      assert.deepEqual(data, {
        event: 'Clicked Install GitHub Application',
        organization: organization.name,
        organization_id: organization.id,
        project: project.title,
        project_id: project.id
      }, 'Event tracking was called with proper attributes.');
    }
  };
  stubService(this, 'metrics', mockMetrics);

  set(this, 'organization', organization);
  set(this, 'project', project);

  this.render(hbs`{{github/install-link organization=organization project=project}}`);

  page.click();
});
