import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/user-details';

let page = PageObject.create(component);

moduleForComponent('user-details', 'Integration | Component | user details', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders subcomponents', function(assert) {
  assert.expect(3);

  let user = {
    userSkills: [
      {
        skill: {
          title: 'Ember.js'
        }
      }
    ]
  };
  set(this, 'user', user);

  this.render(hbs`{{user-details user=user}}`);

  assert.ok(page.userProjectsList.isVisible);
  assert.ok(page.userSidebar.isVisible);
  assert.ok(page.userSkillsList.isVisible);
});
