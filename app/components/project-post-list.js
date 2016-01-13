import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['project-post-list'],

  filteredPosts: Ember.computed('posts', 'type', function() {
    let posts = this.get('posts');
    let filter = this.get('type');

    console.log('filtered');

    if (filter) {
      return posts.filterBy('postType', filter);
    } else {
      return posts;
    }
  }),

  actions: {
    filterBy(type) {
      this.set('filter', type);
      console.log('filtering by ', type);
    }
  }
});
