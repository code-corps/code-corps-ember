import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias, and, not, notEmpty },
  get,
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

  store: service(),
  userSkillsService: service('userSkills'),

  canShow: and('hasResults', 'notHidden'),
  hasResults: notEmpty('results'),
  notHidden: not('hidden'),
  numberOfResults: alias('results.length'),
  queryString: alias('query'),
  queryStringChanged: observer('queryString', function() {
    once(this, '_search');
  }),

  _isNewQuery: not('_sameQuery'),
  _sameQuery: computed('queryString', 'lastQuery', function() {
    return get(this, 'queryString') === get(this, 'lastQuery');
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

    selectSkill() {
      this._selectSkill();
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
    set(this, 'queryString', '');
    this.$('input').focus();
  },

  _search() {
    let limit = get(this, 'limit');
    let queryString = get(this, 'queryString');
    let store = get(this, 'store');

    if (isEmpty(queryString)) {
      set(this, 'results', []);
    } else if (get(this, '_isNewQuery')) {
      set(this, 'lastQuery', queryString);
      store.query('skill', { query: queryString, limit }).then((skills) => {
        set(this, 'results', skills);
        set(this, 'cursorAt', 0);
        this._updateSelected();
      });
    }
  },

  _selectSkill() {
    if (get(this, 'hasResults')) {
      let cursorAt = get(this, 'cursorAt');
      let results = get(this, 'results');
      let skill = results.objectAt(cursorAt);
      let userSkillsService = get(this, 'userSkillsService');

      let foundSkill = userSkillsService.findUserSkill(skill);

      this._reset();

      if (isEmpty(foundSkill)) {
        userSkillsService.addSkill(skill);
      } else {
        userSkillsService.removeSkill(skill);
      }
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
