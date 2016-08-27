# Code Corps Ember

![Code Corps Ember Logo](https://d3pgew4wbk2vb1.cloudfront.net/images/github/code-corps-ember.png)

[![Code Climate](https://codeclimate.com/github/code-corps/code-corps-ember/badges/gpa.svg)](https://codeclimate.com/github/code-corps/code-corps-ember) [![CircleCI](https://circleci.com/gh/code-corps/code-corps-ember.svg?style=svg)](https://circleci.com/gh/code-corps/code-corps-ember) [![Dependency Status](https://david-dm.org/code-corps/code-corps-ember.svg)](https://david-dm.org/code-corps/code-corps-ember) [![devDependency Status](https://david-dm.org/code-corps/code-corps-ember/dev-status.svg)](https://david-dm.org/code-corps/code-corps-ember#info=devDependencies) [![Inline docs](http://inch-ci.org/github/code-corps/code-corps-ember.svg?branch=develop&style=shields)](http://inch-ci.org/github/code-corps/code-corps-ember) [![Slack Status](http://slack.codecorps.org/badge.svg)](http://slack.codecorps.org)

This Code Corps Ember application powers the front-end website for the Code Corps platform, consuming our Rails JSON API.

Contributing
------------

We'd love to have you contribute to Code Corps directly!

To do so, please read the guidelines in our [`CONTRIBUTING.md`](CONTRIBUTING.md).

Then check out some GitHub issues to see where you can help out.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development (with Rails)

If you're running the Rails API with Docker, then `ember-cli-deploy` will automatically watch for changes to your file tree and deploy new revisions to your running `redis` instance. Your API running on `http://api.lvh.me` will then serve the Ember app's `index.html`.

* `ember server`
* Visit your app at [http://lvh.me](http://lvh.me).

## Running / Development (without Rails)

If you'd like to run the app without having to set up the server, you can simply hit our `remote-development` endpoint.

* `ember server --environment=remote-development`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Style Guide

You should refer to our [style guide](STYLEGUIDE.md) for writing Ember.js, HTML/Handlebars, and SCSS that makes it easier for everyone to work on Code Corps together.

### Deploying

The app uses Circle for continuous integration and deploys automatically to a staging server when merging into `develop` and to production when merging into `master`.

## Documentation

The Code Corps Ember application uses [YUIDoc](http://yui.github.io/yuidoc/) for documentation. When contributing to the documentation please follow the [YUIDoc syntax](http://yui.github.io/yuidoc/syntax/index.html) and our [style guide](STYLEGUIDE.md) for application specific documenation standards.

### Generating Documentation

* `npm install -g yuidocjs`
* `yuidoc -c yuidoc.json`

The documentation will be generated in the `/docs` folder.

### Serving Documentation

* Generate the docs
* `yuidoc --server [your port of choice]`
* Visit `localhost:[your port of choice]` in your browser.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)
