import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import thankYouContainerComponent from '../../pages/components/thank-you-container';

let page = PageObject.create(thankYouContainerComponent);

moduleForComponent('thank-you-container', 'Integration | Component | thank-you container', {
  integration: true,
  beforeEach() {
    this.set('project', {
      id: 42,
      title: 'A Test Project'
    });

    page.setContext(this);
    page.render(hbs`{{thank-you-container project=project}}`);
  }
});

test('it renders the thank you text', function(assert) {
  assert.expect(1);

  assert.equal(page.thankYouText, `From all the volunteers on the ${this.get('project.title')} team.`);
});
