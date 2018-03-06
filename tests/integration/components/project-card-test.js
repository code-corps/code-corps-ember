import { set } from '@ember/object';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import stubService from 'code-corps-ember/tests/helpers/stub-service';
import PageObject from 'ember-cli-page-object';
import pageComponent from 'code-corps-ember/tests/pages/components/project-card';

let page = PageObject.create(pageComponent);

moduleForComponent('project-card', 'Integration | Component | project card', {
  integration: true,
  beforeEach() {
    page.setContext(this);
    set(this, 'onJoin', () => {});
  },
  afterEach() {
    page.removeContext();
  }
});

let user = {
  id: 'user',
  isLoaded: true,
  photoThumbUrl: 'http://lorempixel.com/25/25/'
};

let project = {
  categories: [{ title: 'Test category' }],
  description: 'Test description',
  iconLargeUrl: 'http://lorempixel.com/500/500/',
  projectUsers: [{ user }],
  title: 'Test Project'
};

test('it renders', function(assert) {
  assert.expect(7);

  stubService(this, 'user-categories', { findUserCategory() {} });

  set(this, 'project', project);

  this.render(hbs`{{project-card onJoin=onJoin project=project skills=skills}}`);

  assert.equal(this.$('.icon-container img').attr('src'), project.iconLargeUrl);
  assert.equal(this.$('.details-container h4').text().trim(), project.title);
  assert.equal(this.$('ul.categories li').length, 1, 'It renders categories.');
  assert.equal(this.$('p.description').text().trim(), project.description);
  assert.equal(this.$('.project-card__skills').length, 1, 'It renders skills.');
  assert.equal(this.$('ul.project-card__project-users li').length, 1, 'It renders users.');
  assert.equal(this.$('ul.project-card__project-users li:first img').attr('src'), user.photoThumbUrl);
});

test('it renders the right icon when the user is not loaded', function(assert) {
  assert.expect(1);

  set(user, 'isLoaded', false);
  stubService(this, 'user-categories', { findUserCategory() {} });

  set(this, 'project', project);

  this.render(hbs`{{project-card onJoin=onJoin project=project skills=skills}}`);

  assert.equal(this.$('ul.project-card__project-users li:first img').length, 0);
});
