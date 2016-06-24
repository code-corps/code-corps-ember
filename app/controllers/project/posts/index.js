import Ember from 'ember';

export default Ember.Controller.extend({
  page: 1,
  postStatus: 'open',
  postType: null,
  types: [
    Ember.Object.create({
      name: "Tasks",
      param: "task",
      slug: "tasks",
      selected: false,
    }),
    Ember.Object.create({
      name: "Issues",
      param: "issue",
      slug: "issues",
      selected: false,
    }),
    Ember.Object.create({
      name: "Ideas",
      param: "idea",
      slug: "ideas",
      selected: false,
    }),
  ],

  status: Ember.computed.alias('postStatus'),

  isFilteringClosedPosts: Ember.computed.equal('status', 'closed'),
  isFilteringOpenPosts: Ember.computed.equal('status', 'open'),
  isFilteredByType: Ember.computed.notEmpty('postTypes'),
  isFiltered: Ember.computed.or('isFilteredByType'),

  postTypes: Ember.computed('postType', function() {
    var postTypes;
    let array = this.get('postType');

    if (array) {
      postTypes = array.split(',');
    } else {
      postTypes = [];
    }

    return postTypes;
  }),

  selectedTypes: Ember.computed('types', 'postTypes', function() {
    let types = this.get('types');
    types.forEach((type) => {
      let postTypes = this.get('postTypes');

      if(postTypes.contains(type.get('param'))) {
        type.set('selected', true);
      } else {
        type.set('selected', false);
      }
      return type;
    });
    return types;
  }),

  resetPage() {
    this.set('page', 1);
  },

  actions: {
    filterByType(type) {
      let postTypes = this.get('postTypes');
      let typeParam = type.get('param');

      if(postTypes.contains(typeParam)) {
        postTypes.removeObject(typeParam);
      } else {
        postTypes.pushObject(typeParam);
      }

      if(Ember.isEmpty(postTypes)) {
        this.set('postType', null);
      } else {
        let types = postTypes.join(',');
        this.set('postType', types);
      }

      this.resetPage();
    },

    removeTypeFilter(type) {
      let postTypes = this.get('postTypes');
      let typeParam = type.get('param');

      if(postTypes.contains(typeParam)) {
        postTypes.removeObject(typeParam);
      }

      if(Ember.isEmpty(postTypes)) {
        this.set('postType', null);
      } else {
        let types = postTypes.join(',');
        this.set('postType', types);
      }

      this.resetPage();
    },

    filterByStatus(status) {
      this.set('postStatus', status);
    },
  }
});
