import Ember from 'ember';
import skillsList from 'code-corps-ember/utils/skills-list';

const {
  Component,
  computed,
  computed: { alias, and, not, notEmpty },
  get,
  getProperties,
  inject: { service },
  isEmpty,
  observer,
  run: { once },
  set
} = Ember;

export default Component.extend({
  classNames: ['user-skills-input'],
  cursorAt: 0,
  cursorWas: 0,
  hidden: true,
  lastQuery: null,
  limit: 5,
  results: [],

  currentUser: service(),
  store: service(),

  canShow: and('hasResults', 'notHidden'),
  hasResults: notEmpty('results'),
  notHidden: not('hidden'),
  numberOfResults: alias('results.length'),
  queryChanged: observer('query', function() {
    once(this, '_search');
  }),
  user: alias('currentUser.user'),

  _isNewQuery: not('_sameQuery'),
  _sameQuery: computed('query', 'lastQuery', function() {
    return get(this, 'query') === get(this, 'lastQuery');
  }),

  actions: {
    blur() {
      set(this, 'hidden', true);
    },

    focus() {
      set(this, 'hidden', false);
    },

    hoverSkill(skill) {
      get(this, 'results').forEach((item, index) => {
        if (item === skill) {
          set(this, 'cursorAt', index);
          set(item, 'selected', true);
        } else {
          set(item, 'selected', false);
        }
      });
    },

    getKeyDown(key) {
      let cursorAt;
      switch (key) {
        case 'ArrowDown':
          cursorAt = get(this, 'cursorAt');
          this._setPosition(++cursorAt);
          set(this, 'hidden', false);
          break;
        case 'ArrowUp':
          cursorAt = get(this, 'cursorAt');
          this._setPosition(--cursorAt);
          set(this, 'hidden', false);
          break;
        case 'Comma':
        case 'Enter':
          this._selectSkill();
          break;
        case 'Escape':
          set(this, 'results', []);
          set(this, 'hidden', true);
          break;
        default:
          // Any other alphanumeric character
          if (/^Key\w(?!.)/.test(key)) {
            set(this, 'hidden', false);
          }
      }
    }
  },

  _reset() {
    set(this, 'results', []);
    set(this, 'query', '');
    this.$('input').focus();
  },

  _search() {
    let limit = get(this, 'limit');
    let query = get(this, 'query');
    let store = get(this, 'store');

    if (isEmpty(query)) {
      set(this, 'results', []);
    } else if (get(this, '_isNewQuery')) {
      set(this, 'lastQuery', query);
      store.query('skill', { query: query, limit }).then((skills) => {
        set(this, 'results', skills);
        set(this, 'cursorAt', 0);
        this._updateSelected();
      });
    }
  },

  _selectSkill() {
    if (get(this, 'hasResults')) {
      let { cursorAt, results } = getProperties(this, 'cursorAt', 'results');
      let skill = results.objectAt(cursorAt);
      this._reset();
      get(this, 'selectSkill')(skill);
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
