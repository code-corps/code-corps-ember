import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/error-wrapper';

let page = PageObject.create(component);

moduleForComponent('error-wrapper', 'Integration | Component | error wrapper', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders all required elements for the 404 case', function(assert) {
  assert.expect(6);

  let error = {
    errors: [{
      status: 404
    }]
  };

  this.set('model', error);
  page.render(hbs`{{error-wrapper error=model}}`);

  assert.ok(page.has404Image, 'The 404 image renders');
  assert.equal(page.title, '404 Error', 'The title renders');
  assert.equal(page.body, "We can't find the page you're looking for.", 'The body renders');
  assert.equal(page.button.text, 'Go Home', 'The button renders');
  assert.ok($('html').hasClass('warning'), 'The html element has the right class');
  assert.notEqual($('html').css('background-color'), 'rgba(0, 0, 0, 0)', 'The html element does not have a white background');
});

test('it renders all required elements for the general error case', function(assert) {
  assert.expect(6);

  let error = {
    errors: [{
      status: 500
    }]
  };

  this.set('model', error);
  page.render(hbs`{{error-wrapper error=model}}`);

  assert.ok(page.hasServerErrorImage, 'The general error image renders');
  assert.equal(page.title, 'Server Error', 'The title renders');
  assert.equal(page.body, 'Something went wrong. Try again and if the problem persists, please report your problem and mention what caused it.', 'The body renders');
  assert.equal(page.button.text, 'Go Home', 'The button renders');
  assert.ok($('html').hasClass('danger'), 'The html element has the right class');
  assert.notEqual($('html').css('background-color'), 'rgba(0, 0, 0, 0)', 'The html element does not have a white background');
});
