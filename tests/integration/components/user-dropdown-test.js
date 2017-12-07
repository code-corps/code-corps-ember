import { computed } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import PageObject from 'ember-cli-page-object';
import hbs from 'htmlbars-inline-precompile';
import userDropdownComponent from 'code-corps-ember/tests/pages/component/user-dropdown';

let page = PageObject.create(userDropdownComponent);

function renderPage() {
  page.render(hbs`{{user-dropdown user=user action='hide'}}`);
}

moduleForComponent('user-dropdown', 'Integration | Component | user dropdown', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

const stubUser = {
  id: 1,
  username: 'tester',
  photoThumbUrl: '/assets/images/twitter.png',

  atUsername: computed('username', function() {
    return `@${this.get('username')}`;
  }),

  twitterUrl: computed('twitter', function() {
    return `https://twitter.com/${this.get('twitter')}`;
  })
};

test('it renders', function(assert) {
  assert.expect(1);

  this.set('user', stubUser);
  renderPage();

  assert.ok(page.isVisible, 'The component renders');
});

test('it triggers the hide action when clicked', function(assert) {
  assert.expect(1);

  this.set('user', stubUser);
  this.on('hide', function() {
    assert.ok(true, 'It triggers the hide action when clicked');
  });

  renderPage();
  page.click();

});
