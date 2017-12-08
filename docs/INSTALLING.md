# How do I install the Code Corps Ember app?

### Requirements

You will need to install the following:

- [Node.js/npm](https://docs.npmjs.com/getting-started/installing-node) we use the LTS branch
- bower: `npm install -g bower`
- ember-cli: `npm install -g ember-cli`

Do you use other versions of node.js? Check out [nvm](https://github.com/creationix/nvm)

## Clone this repository

You'll want to [clone this repository](https://help.github.com/articles/cloning-a-repository/) with `git clone https://github.com/code-corps/code-corps-ember.git`. If you plan on contributing, you'll want to fork it too!

The directory structure will look like the following:

```shell
code-corps-ember/    # → Root folder for this project
├── app/
    ├── abilities/   # → Used by `ember-can` to manage user access
    ├── components/  # → Specialized components used by routes
    ├── controllers/ # → Handles UI Behavior
    ├── models/      # → persistent data
    ├── routes/      # → Routes for URL handling
    ├── styles/      # → Style Sheets (we use Sass)
    ├── templates/   # → HTMLbars templates
    ├── router.js    # → Route configuration
    └── ...
    ...
├── docs/            # → Documentation (USAGE.md, INSTALLING.md, etc.)
├── tests/           # → the tests
└── ...              # → More standard Ember.js files
.gitignore           # → Git configuration  for ignored files.
bower.json           # → Bower configuration and dependency list
circle.yml           # → Circle CI configuration
package.json         # → Npm configuration and dependency list
...
```

## Install your dependencies

> Note: We bind to ports 4200 for Ember and 49152 for livereloading. Make sure you aren't running anything else on these ports.

Go to the `code-corps-ember` directory.

If you use [`yarn`](https://yarnpkg.com), run:

```shell
yarn
```

If you use `npm`, run:

```shell
npm install
```

Then run:

```shell
bower install
```

Both commands will install the necessary dependencies and will display output regarding those.

### Troubleshooting

If you receive any errors like the following during `npm install`:

```shell
npm ERR! Command failed: git -c core.longpaths=true fetch -a origin
npm ERR! Permission denied (publickey).
npm ERR! fatal: Could not read from remote repository.
npm ERR!
npm ERR! Please make sure you have the correct access rights
npm ERR! and the repository exists.
```

you will need to [associate your ssh key with GitHub](https://help.github.com/articles/generating-an-ssh-key/)

## Verify it worked

Start your server:

```shell
ember serve
```

Now point your browser (or make a direct request) to `http://localhost:4200`. You should see the Code Corps website!

### Next steps

Now that you're set up, you should [read more about how to use the app](USAGE.md).

## Issues installing?

Having trouble?

Create an issue in this repo and we'll look into it.

Feel free to drop by our [slack](https://codecorps.slack.com) with your questions!
