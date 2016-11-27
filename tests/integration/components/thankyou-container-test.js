import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import thankyouContainerComponent from '../../pages/components/thankyou-container';

let page = PageObject.create(thankyouContainerComponent);

moduleForComponent('thankyou-container', 'Integration | Component | thankyou container', {
  integration: true,
  beforeEach() {
    this.set('project', {
      id: 42,
      title: 'A Test Project',
      iconLargeUrl: 'http://fillmurray.com/500/500'
    });

    page.setContext(this);
    page.render(hbs`{{thankyou-container project=project}}`);
  }
});

test('it sets the project icon alt attribute', function(assert) {
  assert.expect(1);
  assert.equal(page.icon.alt, 'Successfully donated to A Test Project');
});

test('it sets the project icon src attribute', function(assert) {
  assert.expect(1);
  assert.equal(page.icon.src, this.get('project.iconLargeUrl'));
});

test('it renders the thank you text', function(assert) {
  assert.expect(1);

  assert.equal(page.thankYouText, `From all the volunteers on the ${this.get('project.title')} team.`);
});
