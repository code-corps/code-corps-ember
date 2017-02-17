import Ember from 'ember';
import { getCode } from 'ember-keyboard';

const {
  Component,
  computed,
  computed: { alias, not },
  get,
  getProperties,
  inject: { service },
  isEmpty,
  observer,
  run: { bind, once },
  set
} = Ember;

export default Component.extend({
  classNames: ['select-dropdown', 'task__user__users-list'],
  tagName: 'div',
  cursorAt: 0,
  cursorWas: 0,
  lastQuery: null,
  limit: 5,
  results: [],

  store: service(),
  taskAssignment: service(),

  numberOfResults: alias('results.length'),
  queryChanged: observer('query', function() {
    once(this, '_search');
  }),

  _isNewQuery: not('_sameQuery'),
  _sameQuery: computed('query', 'lastQuery', function() {
    return get(this, 'query') === get(this, 'lastQuery');
  }),

  init() {
    this._super(...arguments);
    let limit = get(this, 'limit');
    set(this, 'keyboardActivated', true);
    set(this, 'boundKeyHandler', bind(this, this.keyHandler));
    this._searchUsers('', limit);
  },

  didInsertElement() {
    this.$(window).on('keydown', this.boundKeyHandler);
  },

  willDestroyElement() {
    this.$(window).off('keydown', this.boundKeyHandler);
  },

  keyHandler(e) {
    let key = getCode(e);
    switch (key) {
      case 'Escape':
        this.send('getKeyDown', key);
        break;
      default:
        break;
    }
  },

  actions: {
    getKeyDown(key) {
      let cursorAt;
      switch (key) {
        case 'ArrowDown':
          cursorAt = get(this, 'cursorAt');
          this._setPosition(++cursorAt);
          break;
        case 'ArrowUp':
          cursorAt = get(this, 'cursorAt');
          this._setPosition(--cursorAt);
          break;
        case 'Enter':
          this._selectUser();
          break;
        case 'Escape':
          this._reset();
          break;
        default:
          break;
      }
    },

    hide() {
      this.sendAction();
    },

    hoverUser(user) {
      get(this, 'results').forEach((item, index) => {
        if (item === user) {
          set(this, 'cursorAt', index);
          set(item, 'selected', true);
        } else {
          set(item, 'selected', false);
        }
      });
    },

    selectUser(user) {
      this._selectUser(user);
      this.sendAction();
    }
  },

  _clearQuery() {
    set(this, 'query', '');
    set(this, 'lastQuery', '');
  },

  _reset() {
    this._clearQuery();
    set(this, 'results', []);
    this.sendAction();
  },

  _search() {
    let { limit, query } = getProperties(this, 'limit', 'query');

    if (isEmpty(query)) {
      this._clearQuery();
    } else if (get(this, '_isNewQuery')) {
      this._searchUsers(query, limit);
    }
  },

  _searchUsers(query, limit) {
    let store = get(this, 'store');
    set(this, 'lastQuery', query);
    store.query('user', { query, limit }).then((users) => {
      set(this, 'results', users);
      set(this, 'cursorAt', 0);
      this._updateSelected();
    });
  },

  async _selectUser(user) {
    let { task, taskAssignment }
      = getProperties(this, 'task', 'taskAssignment');

    let taskIsAssignedToUser = await taskAssignment.isAssignedTo(task, user);

    if (taskIsAssignedToUser) {
      return taskAssignment.unassign(task);
    } else {
      return taskAssignment.assign(task, user);
    }

  },

  _setPosition(position) {
    let numberOfResults = get(this, 'numberOfResults');
    let numberOfResultsIndexed = numberOfResults - 1;

    set(this, 'cursorWas', get(this, 'cursorAt'));

    if (numberOfResults > 0) {
      if (position < 0) {
        set(this, 'cursorAt', numberOfResultsIndexed);
      } else if (position > numberOfResultsIndexed) {
        set(this, 'cursorAt', 0);
      } else {
        set(this, 'cursorAt', position);
      }
    }

    this._updateSelected();
  },

  _updateSelected() {
    let cursorAt = get(this, 'cursorAt');

    get(this, 'results').forEach((item, index) => {
      if (index === cursorAt) {
        set(item, 'selected', true);
      } else {
        set(item, 'selected', false);
      }
    });
  }
});
