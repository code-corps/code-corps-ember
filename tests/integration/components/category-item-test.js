import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import wait from 'ember-test-helpers/wait';

moduleForComponent('category-item', 'Integration | Component | category item', {
  integration: true,
  beforeEach() {
    this.container.registry.register('service:user-categories', mockUserCategoriesService);
  },
});

let mockUserCategoriesService = Ember.Service.extend({
  hasCategory(category) {
    return category.id === mockUserCategory.get('categoryId');
  },
});

let mockUserCategory = Ember.Object.create({
  id: 1,
  categoryId: 2,
  userId: 1,
});

let unselectedCategory = Ember.Object.create({
  id: 1,
  name: 'Technology',
  slug: 'technology',
  description: 'You want to help technology.',
});

let selectedCategory = Ember.Object.create({
  id: 2,
  name: 'Society',
  slug: 'society',
  description: 'You want to help society.',
});

test('it works for selecting unselected categories', function(assert) {
  assert.expect(6);

  this.set('category', unselectedCategory);
  this.set('addCategory', (clickedCategory) => {
    assert.deepEqual(clickedCategory, unselectedCategory);
    return new Ember.RSVP.Promise((fulfill) => {
      Ember.run.next(() => {
        fulfill();
      });
    });
  });
  this.render(hbs`{{category-item category=category addCategory=(action addCategory)}}`);

  assert.ok(this.$('.category-icon').hasClass('technology'));
  assert.equal(this.$('.category-icon').hasClass('selected'), false);
  assert.equal(this.$('p').text().trim(), 'You want to help technology.');
  assert.equal(this.$('p').hasClass('selected'), false);
  assert.equal(this.$('button').text().trim(), 'Technology');

  this.$('button').click();
});

test('it works for removing selected categories', function(assert) {
  assert.expect(4);

  this.set('category', selectedCategory);
  this.set('removeCategory', (clickedCategory) => {
    assert.deepEqual(clickedCategory, selectedCategory);
    return new Ember.RSVP.Promise((fulfill) => {
      Ember.run.next(() => {
        fulfill();
      });
    });
  });
  this.render(hbs`{{category-item category=category removeCategory=(action removeCategory)}}`);

  assert.equal(this.$('.category-icon').hasClass('selected'), true);
  assert.equal(this.$('p').hasClass('selected'), true);
  assert.equal(this.$('button').text().trim(), 'Society');

  this.$('button').click();
});

test('it creates a flash message on an error when adding', function(assert) {
  assert.expect(7);

  this.set('category', unselectedCategory);
  this.set('addCategory', (clickedCategory) => {
    assert.deepEqual(clickedCategory, unselectedCategory);
    return new Ember.RSVP.Promise((fulfill, reject) => {
      Ember.run.next(() => {
        reject();
      });
    });
  });

  let mockFlashMessages = Ember.Service.extend({
    clearMessages() {
      assert.ok(true);
    },
    add(object) {
      assert.ok(object.message.indexOf(unselectedCategory.name) !== -1);
      assert.equal(object.type, 'danger');
      assert.equal(object.fixed, true);
      assert.equal(object.sticky, false);
      assert.equal(object.timeout, 5000);
    }
  });
  this.container.registry.register('service:flash-messages', mockFlashMessages);

  this.render(hbs`{{category-item category=category addCategory=(action addCategory)}}`);

  this.$('button').click();
});

test('it creates a flash message on an error when removing', function(assert) {
  assert.expect(7);

  this.set('category', selectedCategory);
  this.set('removeCategory', (clickedCategory) => {
    assert.deepEqual(clickedCategory, selectedCategory);
    return new Ember.RSVP.Promise((fulfill, reject) => {
      Ember.run.next(() => {
        reject();
      });
    });
  });

  let mockFlashMessages = Ember.Service.extend({
    clearMessages() {
      assert.ok(true);
    },
    add(object) {
      assert.ok(object.message.indexOf(selectedCategory.name) !== -1);
      assert.equal(object.type, 'danger');
      assert.equal(object.fixed, true);
      assert.equal(object.sticky, false);
      assert.equal(object.timeout, 5000);
    }
  });
  this.container.registry.register('service:flash-messages', mockFlashMessages);

  this.render(hbs`{{category-item category=category removeCategory=(action removeCategory)}}`);

  this.$('button').click();
});

test('it sets and unsets loading state when adding', function(assert) {
  let done = assert.async();

  assert.expect(4);

  this.set('category', unselectedCategory);
  this.set('addCategory', (clickedCategory) => {
    assert.deepEqual(clickedCategory, unselectedCategory);
    return new Ember.RSVP.Promise((fulfill) => {
      Ember.run.next(() => {
        fulfill();
        assert.ok(this.$('span').hasClass('button-spinner'));
        assert.notOk(this.$('span').hasClass('check-area'));
        wait().then(() => {
          assert.notOk(this.$('span').hasClass('button-spinner'));
          done();
        });
      });
    });
  });

  this.render(hbs`{{category-item category=category addCategory=(action addCategory)}}`);

  this.$('button').click();
});

test('it sets and unsets loading state when removing', function(assert) {
  let done = assert.async();

  assert.expect(4);

  this.set('category', selectedCategory);
  this.set('removeCategory', (clickedCategory) => {
    assert.deepEqual(clickedCategory, selectedCategory);
    return new Ember.RSVP.Promise((fulfill) => {
      Ember.run.next(() => {
        fulfill();
        assert.ok(this.$('span').hasClass('button-spinner'));
        assert.notOk(this.$('span').hasClass('check-area'));
        wait().then(() => {
          assert.notOk(this.$('span').hasClass('button-spinner'));
          done();
        });
      });
    });
  });

  this.render(hbs`{{category-item category=category removeCategory=(action removeCategory)}}`);

  this.$('button').click();
});
