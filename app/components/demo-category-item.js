import Ember from 'ember';

const { Component, computed, get } = Ember;

export default Component.extend({
  classNames: ['category-item'],

  iconClass: computed('category.slug', 'selected', function() {
    let slug = get(this, 'category.slug');
    if (get(this, 'selected')) {
      return `category-item__icon--${slug}--selected`;
    } else {
      return `category-item__icon--${slug}`;
    }
  })
});
