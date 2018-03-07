import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { mockRouter } from 'code-corps-ember/tests/helpers/mock-routing';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/slugged-route-model-details';

let page = PageObject.create(component);

moduleForComponent('slugged-route-model-details', 'Integration | Component | slugged route model details', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    mockRouter(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('when the slugged route is an organization, it renders the organization component', function(assert) {
  assert.expect(1);

  let sluggedRoute = { organization: {} };

  this.set('sluggedRoute', sluggedRoute);
  this.render(hbs`
    {{slugged-route-model-details
      sluggedRoute=sluggedRoute
      organization=sluggedRoute.organization
      user=sluggedRoute.user
    }}`
  );

  assert.ok(page.organizationProfile.isVisible, 'organization component is rendered.');
});

test('when the slugged route is a user, it renders the user component', function(assert) {
  assert.expect(1);

  let sluggedRoute = { user: {} };

  this.set('sluggedRoute', sluggedRoute);
  this.render(hbs`
    {{slugged-route-model-details
      sluggedRoute=sluggedRoute
      organization=sluggedRoute.organization
      user=sluggedRoute.user
    }}`
  );

  assert.ok(page.userDetails.isVisible, 'the user component is rendered.');
});
