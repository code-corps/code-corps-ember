import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'code-corps-ember/tests/helpers/stub-service';

moduleForComponent('code-theme-selector', 'Integration | Component | code theme selector', {
  integration: true
});

test('it toggles code theme service when clicked', function(assert) {
  assert.expect(1);

  stubService(this, 'code-theme', {
    toggle() {
      assert.ok(true, 'Code theme service was called');
    }
  });
  this.render(hbs`{{code-theme-selector}}`);

  this.$('.code-theme-selector').click();
});

test('it has the class name from the service', function(assert) {
  assert.expect(1);

  stubService(this, 'code-theme', {
    className: 'light'
  });
  this.render(hbs`{{code-theme-selector}}`);

  assert.ok(this.$('.code-theme-selector').hasClass('light'));
});
