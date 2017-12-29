import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.query('github-event', {
      page: {
        page: params.page,
        'page-size': params.size
      },
      status: params.status
    });
  },

  queryParams: {
    page: {
      refreshModel: true
    },
    size: {
      refreshModel: true
    },
    status: {
      refreshModel: true
    }
  }
});
