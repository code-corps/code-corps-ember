import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('error-wrapper', 'Integration | Component | error wrapper', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{error-wrapper}}`);
  assert.equal(this.$('.error-wrapper').length, 1, 'The component element is rendered');
});

test('it renders all required elements for the 404 case', function(assert) {
  assert.expect(6);

  var model = {
    errors: [{
      status: 404
    }]
  };

  this.set('model', model);
  this.render(hbs`{{error-wrapper model=model}}`);

  assert.equal(this.$('.not-found-img').length, 1, 'The 404 image renders');
  assert.equal(this.$('h1').text().trim(), '404 Error', 'The title renders');
  assert.equal(this.$('p:first').text().trim(), "We can't find the page you're looking for.", 'The body renders');
  assert.equal(this.$('a.button').text().trim(), "Go Home", 'The button renders');
  assert.equal($('html').attr('class'), "warning", 'The html element has the right class');
  assert.notEqual($('html').css('background-color'), "rgba(0, 0, 0, 0)", 'The html element does not have a white background');
});

test('it renders all required elements for the general error case', function(assert) {
  assert.expect(6);

  var model = {
    errors: [{
      status: 500
    }]
  };

  this.set('model', model);
  this.render(hbs`{{error-wrapper model=model}}`);

  assert.equal(this.$('.server-error-img').length, 1, 'The general error image renders');
  assert.equal(this.$('h1').text().trim(), 'Server Error', 'The title renders');
  assert.equal(this.$('p:first').text().trim(), "Something went wrong. Try again and if the problem persists, please report your problem and mention what caused it.", 'The body renders');
  assert.equal(this.$('a.button').text().trim(), "Go Home", 'The button renders');
  assert.equal($('html').attr('class'), "danger", 'The html element has the right class');
  assert.notEqual($('html').css('background-color'), "rgba(0, 0, 0, 0)", 'The html element does not have a white background');
});