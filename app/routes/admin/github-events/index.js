import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    let queryParams = {
      page: {
        page: params.page,
        'page-size': params.size
      }
    };

    if (params.eventAction) {
      queryParams.action = params.eventAction;
    }

    if (params.status) {
      queryParams.status = params.status;
    }

    if (params.type) {
      queryParams.type = params.type;
    }

    return this.store.query('github-event', queryParams);
  },

  queryParams: {
    eventAction: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    },
    size: {
      refreshModel: true
    },
    status: {
      refreshModel: true
    },
    type: {
      refreshModel: true
    }
  }
});
