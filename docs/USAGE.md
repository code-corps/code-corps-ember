# Usage

- [How should I run the app?](#running-the-app)
  - [With a fake API](#with-a-fake-api)
  - [With a local API](#with-a-local-api)
  - [With a remote API](#with-a-remote-api)
- [How do I run tests?](#running-tests)
- [How do I rebuild Ember?](#rebuilding-ember)
- [How do I generate and serve documentation?](#generating-documentation)

## Interacting with the app

You can run the Ember app several different ways.

_Note: We expect the default port of `4200`, which is required to serve up fingerprinted assets with our `ember-cli-build.js`._

### With a fake API

Don't want to worry about setting up an API? This is best for work that's happening without needing a backend.

You can use our [`ember-cli-mirage`](http://www.ember-cli-mirage.com/) server by running:

```shell
ember server --environment=mirage-development
```

(Be careful about copying and pasting this line, as on some machines the `--` might get converted into a `–`).

The data in the application will be generated for you using the file `mirage/scenarios/default.js`. This includes several different accounts for you to login. We recommend that you read a bit more about Mirage to familiarize yourself with how it works.

### With a local API

Want to work directly with a Code Corps API running on your machine?

You can work with our [Elixir API](https://github.com/code-corps/code-corps-api/) server by running

```shell
ember server
```

Doing so will try to connect to the API under the port settings found under the API's documentation.

### With a remote API

Want to work with an environment that's similar to staging?

You can use our remote development server by running:

```shell
ember server --environment=remote-development
```

(Be careful about copying and pasting this line, as on some machines the `--` might get converted into a `–`).

### Viewing the Ember app

Once the server has been started, you can visit your app at `http://localhost:4200`.

Note that Ember is able to live-reload as changes are made to the codebase. Ember-CLI will build those changes and apply them. No need to stop and start the server for every change!

### Stopping the app

Need to stop the Ember server? `Ctrl+C` will do the trick.

To start the server again run `ember server`, with whichever environment flag you prefer.

## Rebuilding Ember

To rebuild, simply run `ember server`. You can clear cached dependencies with `npm cache clean`, `bower cache clean`, then reinstall.

Or, more simply, use [nombom](https://www.npmjs.com/package/nombom) which automates this process as one command: `nombom`.

## Running tests

We use [ember-exam](https://github.com/trentmwillis/ember-exam) for running tests since it allows for parallel testing, randomized orders, and other neat configurations. You can check out the repository readme there to see the available options. A few handy ones to use when running tests locally are outlined below.

* `ember exam` will run the tests
* `ember exam --split=3 --weighted --parallel` will run tests in 3 PhantomJS instances in parallel with an equal split. Currently, 3 parallel instances will run the tests the quickest.
* `ember exam --random` will run the tests in a random order
* `ember exam --filter='acceptance'` will only run acceptance tests. The same syntax can be used for other types of tests, such as `ember exam --filter='unit'` and `ember exam --filter='integration'`

We also take advantage of [ember-try](https://github.com/ember-cli/ember-try), which allows us to test against different versions of packages. We have a few set up in the [configuration file](../config/ember-try.js), which can be used as follows:
* `ember try:one default` will run the tests with everything currently listed in `package.json` and `bower.json`
* `ember try:one ember-release` will run the tests using the current release version of ember
* `ember try:one ember-beta` will run the tests using the current beta release of ember
* `ember try:one ember-canary` will run the tests using the current canary release of ember
* `ember try:each` will run all configurations in `config/ember-try.js`
You'll notice that all of these will run using `ember exam`.

## Generating Documentation

The Code Corps Ember application uses [YUIDoc](http://yui.github.io/yuidoc/) for documentation.

When contributing to the documentation please follow our [style guide](docs/STYLEGUIDE.md) and [YUIDoc's syntax guidelines](http://yui.github.io/yuidoc/syntax/index.html).

To compile documentation from accross the app, install and run YUIDoc:

```shell
npm install -g yuidocjs
yuidoc -c yuidoc.json
```

The documentation will be generated in the `/docs` folder.

Now that it has been generated, you can run the server to view it:

```shell
yuidoc --server
```

Then you can visit `localhost:3000` in your browser. YUIDoc defaults to port 3000. However, you can specify another port if that conflicts with something else via `yuidoc --server [another port here]`.
