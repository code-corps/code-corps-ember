import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['user-skills-input'],
  cursorAt: 0,
  cursorWas: 0,
  hidden: true,
  lastQuery: null,
  limit: 5,
  results: [],

  store: Ember.inject.service(),
  userSkills: Ember.inject.service(),

  canShow: Ember.computed.and('hasResults', 'notHidden'),
  hasResults: Ember.computed.notEmpty('results'),
  notHidden: Ember.computed.not('hidden'),
  numberOfResults: Ember.computed.alias('results.length'),
  queryString: Ember.computed.alias('query'),

  queryStringChanged: Ember.observer('queryString', function() {
    Ember.run.once(this, '_search');
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

  _isCommaKey: Ember.computed.equal('keyCode', 188),
  _isDownKey: Ember.computed.equal('keyCode', 40),
  _isEnterKey: Ember.computed.equal('keyCode', 13),
  _isEscKey: Ember.computed.equal('keyCode', 27),
  _isUpKey: Ember.computed.equal('keyCode', 38),
  _isNewQuery: Ember.computed.not('_sameQuery'),
  _sameQuery: Ember.computed('queryString', 'lastQuery', function() {
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
    },
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

    if (Ember.isEmpty(queryString)) {
      this.set('results', []);
    } else if (this.get('_isNewQuery')) {
      this.set('lastQuery', queryString);
      store.query('skill', { query: queryString, limit: limit }).then((skills) => {
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

      if (Ember.isEmpty(foundSkill)) {
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
  },
});
