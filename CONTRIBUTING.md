Contributing
============

**Contributions are managed on [Code Corps](https://codecorps.org).**

We love pull requests from everyone.

Here's a quick guide for contributing:

1. [Fork the repo](https://help.github.com/articles/fork-a-repo/).

2. Run the tests. We only take pull requests with passing tests, and it's great
to know that you have a clean slate: `ember test`

3. Add a test for your change. Only refactoring and documentation changes
require no new tests. If you are adding functionality or fixing a bug, we need
a test!

4. Make the test pass.

5. Push to your fork and submit a pull request.

At this point you're waiting on us. We like to at least comment on, if not
accept, pull requests within a week's time. We may suggest some changes or improvements or alternatives.

Some things that will increase the chance that your pull request is accepted:

* Use Ember idioms
* Include tests that fail without your code, and pass with it
* Update the documentation, the surrounding one, examples elsewhere, guides,
  whatever is affected by your contribution

Before We Can Merge
-------------------

If you've had a pull request reviewed and accepted, congratulations! Before we can merge your changes, we'll need you to rebase off `origin/develop` and squash your commits into one. This will give us a cleaner git history.

Never done this before? No problem. [We'll walk you through it in our guide](docs/SQUASHING.md), and you can read [a deeper guide about rewriting history to understand more](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History).
