import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('error-wrapper', 'Integration | Component | error wrapper', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{error-wrapper}}`);
  assert.equal(this.$('.error-wrapper').length, 1, 'The component element is rendered');
});

test('it renders all required elements', function(assert) {
  assert.expect(3);

  var model = {
    errors: [{
      id: "RECORD_NOT_FOUND",
      title: "Record not found",
      detail: "Couldn't find SluggedRoute",
      status: 404
    }]
  };

  this.set('model', model);
  this.render(hbs`{{error-wrapper model=model}}`);

  assert.equal(this.$('img')[0].src.split('/').pop(), 'bmo.gif', 'The BMO 404 gif renders');
  assert.equal(this.$('h1').text().trim(), 'Error (404)', 'The title renders');
  assert.equal(this.$('p').text().trim(), "We can't find the page you're looking for.", 'The body renders');
});