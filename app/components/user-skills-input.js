import Ember from 'ember';

const {
  Component,
  computed,
  computed: { alias, and, equal, not, notEmpty },
  inject: { service },
  isEmpty,
  run: { once },
  observer
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
    this.set('keyCode', e.keyCode);

    let cursorAt = this.get('cursorAt');
    let isCommaKey = this.get('_isCommaKey');
    let isDownKey = this.get('_isDownKey');
    let isEnterKey = this.get('_isEnterKey');
    let isEscKey = this.get('_isEscKey');
    let isUpKey = this.get('_isUpKey');

    if (isDownKey) {
      e.preventDefault();
      this._setPosition(++cursorAt);
      this.set('hidden', false);
    } else if (isUpKey) {
      e.preventDefault();
      this._setPosition(--cursorAt);
      this.set('hidden', false);
    } else if (isCommaKey || isEnterKey) {
      e.preventDefault();
      this._selectSkill();
    } else if (isEscKey) {
      this.set('hidden', true);
    } else {
      this.set('hidden', false);
    }
  },

  _isCommaKey: equal('keyCode', 188),
  _isDownKey: equal('keyCode', 40),
  _isEnterKey: equal('keyCode', 13),
  _isEscKey: equal('keyCode', 27),
  _isUpKey: equal('keyCode', 38),
  _isNewQuery: not('_sameQuery'),
  _sameQuery: computed('queryString', 'lastQuery', function() {
    return this.get('queryString') === this.get('lastQuery');
  }),

  actions: {
    blur() {
      this.set('hidden', true);
    },

    focus() {
      this.set('hidden', false);
    },

    hoverSkill(skill) {
      this.get('results').forEach((item, index) => {
        if (item === skill) {
          this.set('cursorAt', index);
          item.set('selected', true);
        } else {
          item.set('selected', false);
        }
      });
    },

    selectSkill() {
      this._selectSkill();
    }
  },

  _reset() {
    this.set('results', []);
    this.set('queryString', '');
    this.$('input').focus();
  },

  _search() {
    let limit = this.get('limit');
    let queryString = this.get('queryString');
    let store = this.get('store');

    if (isEmpty(queryString)) {
      this.set('results', []);
    } else if (this.get('_isNewQuery')) {
      this.set('lastQuery', queryString);
      store.query('skill', { query: queryString, limit }).then((skills) => {
        this.set('results', skills);
        this.set('cursorAt', 0);
        this._updateSelected();
      });
    }
  },

  _selectSkill() {
    if (this.get('hasResults')) {
      let cursorAt = this.get('cursorAt');
      let results = this.get('results');
      let skill = results.objectAt(cursorAt);
      let userSkills = this.get('userSkills');

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
    let numberOfResults = this.get('numberOfResults');
    let numberOfResultsIndexed = numberOfResults - 1;

    this.set('cursorWas', this.get('cursorAt'));

    if (numberOfResults > 0) {
      if (position < 0) {
        this.set('cursorAt', numberOfResultsIndexed);
      } else if (position > numberOfResultsIndexed) {
        this.set('cursorAt', 0);
      } else {
        this.set('cursorAt', position);
      }
    }

    this._updateSelected();
  },

  _updateSelected() {
    let cursorAt = this.get('cursorAt');

    this.get('results').forEach((item, index) => {
      if (index === cursorAt) {
        item.set('selected', true);
      } else {
        item.set('selected', false);
      }
    });
  }
});
