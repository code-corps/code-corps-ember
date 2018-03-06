import { moduleForComponent, test } from 'ember-qunit';
import { set } from '@ember/object';
import hbs from 'htmlbars-inline-precompile';
import PageObject from 'ember-cli-page-object';
import component from 'code-corps-ember/tests/pages/components/conversations/conversation-list-item-with-project';
import moment from 'moment';

let page = PageObject.create(component);

moduleForComponent('conversations/conversation-list-item-with-project', 'Integration | Component | conversations/conversation list item with project', {
  integration: true,
  beforeEach() {
    page.setContext(this);
  },
  afterEach() {
    page.removeContext();
  }
});

test('it renders the conversation details', function(assert) {
  assert.expect(3);

  let project = {
    iconThumbUrl: 'http://lorempixel.com/25/25/',
    title: 'Code Corps'
  };

  let message = {
    project
  };

  let conversation = {
    message,
    updatedAt: moment().subtract(2, 'days')
  };

  set(this, 'conversation', conversation);

  this.render(hbs`
    {{conversations/conversation-list-item-with-project
      conversation=conversation
    }}
  `);

  assert.equal(page.project.photo.url, project.iconThumbUrl, 'The project icon renders');
  assert.equal(page.project.title.text, project.title, 'The project title renders');
  assert.equal(page.updatedAt.text, '2 days ago', 'The updated at timestamp renders');
});
