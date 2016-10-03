# Usage

- [How do I interact with the app?](#interacting-with-the-app)
- [How do I stop and start the server?](#stopping-and-starting-the-server)
- [How do I run tests?](#running-tests)
- [How do I rebuild Ember?](#rebuilding-ember)
- [How do I generate and serve documentation?](#generating-documentation)

## Interacting with the app

You'll generally interact with the app using `ember server`. If you are running the [Elixir API](https://github.com/code-corps/code-corps-api/) locally, running `ember server` will make requests to the API by default. 

If you aren't running the API locally, you can use our remote development enviornment by running `ember server --environment=remote-development`.

Once the server has been started, you can visit your app at `http://localhost:4200`.

Note that Ember is able to live-reload as changes are made to the codebase. Ember-CLI will build those changes and apply them. No need to stop and start the server for every change!

## Stopping and starting the server

Need to stop the server? `Ctrl+C` will do the trick.

To start the server again run `ember server`.

## Rebuilding Ember

To rebuild, simply run `ember server`. You can clear cached dependencies with `npm cache clean`, `bower cache clean`, then reinstall.

Or, more simply, use [nombom](https://www.npmjs.com/package/nombom) which automates this process as one command: `nombom`.

## Running tests

We use [ember-exam](https://github.com/trentmwillis/ember-exam) for running tests since it allows for parallel testing, randomized orders, and other neat configurations. You can check out the repository readme there to see the available options. A few handy ones to use when running tests locally are outlined below.

* `ember exam` will run the tests
* `ember exam --split=3 --weighted --parallel` will run tests in 3 PhantomJS instances in parallel with an equal split. Currently, 3 parallel instances will run the tests the quickest.
* `ember exam --random` will run the tests in a random order
* `ember exam --filter='acceptance'` will only run acceptance tests. The same syntax can be used for other types of tests, such as `ember exam --filter='unit'` and `ember exam --filter='integration'`

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
