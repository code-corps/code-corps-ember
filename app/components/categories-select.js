import { A } from '@ember/array';
import ArrayProxy from '@ember/array/proxy';
import Component from '@ember/component';
import { computed, get, set } from '@ember/object';
import RSVP from 'rsvp';

export default Component.extend({
  categoryOptions: null,
  selectedCategories: null
});
