import Controller from '@ember/controller';
import { computed, get, set } from '@ember/object';

export default Controller.extend({
  queryParams: ['eventAction', 'page', 'size', 'status', 'type'],

  eventAction: '',
  page: 1,
  size: 20,
  status: '',
  type: '',

  statuses: [
    'errored',
    'processing',
    'processed',
    'reprocessing',
    'unprocessed',
    'unsupported'
  ],

  types: [
    'installation',
    'installation_repositories',
    'issue_comment',
    'issues',
    'pull_request'
  ],

  actionOptions: {
    'installation': [
      'created',
      'deleted'
    ],
    'installation_repositories': [
      'added',
      'removed'
    ],
    'issue_comment': [
      'created',
      'deleted',
      'edited'
    ],
    'issues': [
      'assigned',
      'closed',
      'demilestoned',
      'edited',
      'labeled',
      'milestoned',
      'opened',
      'reopened',
      'unassigned',
      'unlabeled'
    ],
    'pull_request': [
      'assigned',
      'closed',
      'edited',
      'labeled',
      'opened',
      'reopened',
      'review_requested',
      'review_request_removed',
      'synchronize',
      'unassigned',
      'unlabeled'
    ]
  },

  selectableActions: computed('type', function() {
    let type = get(this, 'type');

    if (type) {
      return get(this, 'actionOptions')[type];
    } else {
      return [];
    }
  }),

  actions: {
    changeAction(action) {
      set(this, 'eventAction', action);
    },

    changeStatus(status) {
      set(this, 'status', status);
    },

    changeType(type) {
      set(this, 'eventAction', null);
      set(this, 'type', type);
    },

    clearFilters() {
      set(this, 'eventAction', null);
      set(this, 'status', null);
      set(this, 'type', null);
    }
  }
});
