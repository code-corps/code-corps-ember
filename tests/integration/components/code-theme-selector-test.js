import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

const { Service } = Ember;

moduleForComponent('code-theme-selector', 'Integration | Component | code theme selector', {
  integration: true
});

test('it toggles code theme service when clicked', function(assert) {
  assert.expect(1);

  let codeThemeServiceStub = Service.extend({
    toggle() {
      assert.ok(true, 'Code theme service was called');
    }
  });
  this.register('service:code-theme', codeThemeServiceStub);
  this.render(hbs`{{code-theme-selector}}`);

  this.$('.code-theme-selector').click();
});

test('it has the class name from the service', function(assert) {
  assert.expect(1);

  let codeThemeServiceStub = Service.extend({
    className: 'light'
  });
  this.register('service:code-theme', codeThemeServiceStub);
  this.render(hbs`{{code-theme-selector}}`);

  assert.ok(this.$('.code-theme-selector').hasClass('light'));
});
