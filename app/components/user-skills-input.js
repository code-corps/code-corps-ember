import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias, and, equal, not, notEmpty },
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
  userSkills: service(),

  canShow: and('hasResults', 'notHidden'),
  hasResults: notEmpty('results'),
  notHidden: not('hidden'),
  numberOfResults: alias('results.length'),
  queryString: alias('query'),

  queryStringChanged: observer('queryString', function() {
    once(this, '_search');
  }),

  keyDown(e) {
    set(this, 'keyCode', e.keyCode);

    let cursorAt = get(this, 'cursorAt');
    let isCommaKey = get(this, '_isCommaKey');
    let isDownKey = get(this, '_isDownKey');
    let isEnterKey = get(this, '_isEnterKey');
    let isEscKey = get(this, '_isEscKey');
    let isUpKey = get(this, '_isUpKey');

    if (isDownKey) {
      e.preventDefault();
      this._setPosition(++cursorAt);
      set(this, 'hidden', false);
    } else if (isUpKey) {
      e.preventDefault();
      this._setPosition(--cursorAt);
      set(this, 'hidden', false);
    } else if (isCommaKey || isEnterKey) {
      e.preventDefault();
      this._selectSkill();
    } else if (isEscKey) {
      set(this, 'hidden', true);
    } else {
      set(this, 'hidden', false);
    }
  },

  _isCommaKey: equal('keyCode', 188),
  _isDownKey: equal('keyCode', 40),
  _isEnterKey: equal('keyCode', 13),
  _isEscKey: equal('keyCode', 27),
  _isUpKey: equal('keyCode', 38),
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
      let userSkills = get(this, 'userSkills');

      let foundSkill = userSkills.findUserSkill(skill);

      this._reset();

      if (isEmpty(foundSkill)) {
        userSkills.addSkill(skill);
      } else {
        userSkills.removeSkill(skill);
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
