# Code Corps Style Guide

## Table of contents

+ [Ember.js](#ember.js)
+ [HTML and Handlebars](#html-and-handlebars)
+ [SCSS](#scss)

## Ember.js

+ [Ember models](#ember-models)
+ [Ember modules](#ember-modules)

### Ember models

Models will follow the same basic rules as [Ember modules](#ember-modules) with some important notes.

Models should be organized with the following hierarchy, by groups:

* attributes `attr()`
* virtual attributes (those not persisted)
* relationships
* computed properties

Within each hierarchy, the items (attributes, relationships, etc.) should themselves be alphabetized for easy scanning.

An example model with the organization style follows:

```js
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import Ember from 'ember';

export default Model.extend({
  body: attr('string'),
  bodyPreview: attr('string'),
  createdAt: attr('date'),
  markdown: attr('string'),
  markdownPreview: attr('string'),

  preview: attr('boolean'), // virtual attribute, will not persist

  commentUserMentions: hasMany('commentUserMention', { async: true }),
  post: belongsTo('post', { async: true }),
  user: belongsTo('user', { async: true }),

  containsCode: Ember.computed('body', function() {
    let body = this.get('body');
    if(body) {
      return body.indexOf('<code>') !== -1;
    } else {
      return false;
    }
  }),
});
```

### Ember modules

When laying out an Ember.js module, the module should be organized with the following hierarchy:

* static attributes
* service attributes
* aliased/one-line computed attributes
* computed properties
* methods
  * lifecycle methods
  * other methods
* actions
  * lifecyle actions
  * other actions
* private methods

Within each hierarchy, the items (attributes, properties, etc.) should themselves be alphabetized for easy scanning.

An example component with the organization style follows:

```js
import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['example-component'],
  type: 'task',

  session: Ember.inject.service(),

  editing: Ember.computed.equal('mode', 'editing'),
  previewing: Ember.computed.equal('mode', 'previewing'),
  selectedItem: Ember.computed.alias('post')

  value: Ember.computed('selectedItem', function() {
    // ...
  }),

  didInitAttrs() {
    this._super(...arguments);
    this.mode = 'editing';
  },

  didRender() {
    this._super(...arguments);
    Ember.run.scheduleOnce('afterRender', this, 'attemptFocus');
  },

  attemptFocus() {
    this.$('textarea').focus();
  },

  attemptFocus()

  actions: {
    willTransition(transition) {
      // doesn't really happen in a component, but in a route it might
    },

    edit() {
      this.set('mode', 'editing');
    },

    preview() {
      this.set('mode', 'previewing');
      this.set('preview', 'Loading preview...');
      let content = this.get('input');
      this._generatePreview(content);
    }
  },

  _generatePreview(content) {
    this.sendAction('generatePreview', content);
  }
});
```

## HTML and Handlebars

Needs expanded.

## SCSS

Needs expanded.
