Contributing
============

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

Never done this before? No problem. We'll walk you through it, and you can read [a deeper guide about rewriting history to understand more](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History).

On your command line you'll want to do:

```
git rebase -i origin/develop
```

This says to rebase your work off of develop. If you use an editor like Sublime Text, you'll want to [be sure your editor doesn't close without a response](https://gist.github.com/geekmanager/9939cf67598efd409bc7).

From here, you'll see something like:

```
pick f48d47c The first commit I did
pick fd4e046 The second commit I did
```

You'll want to change everything after your first commit from `pick` to `squash`. This tells git you want to squash these commits into the first one.

From here, you'll get an editor that will let you change the commit messages.

```
# This is a combination of 2 commits.
# The first commit's message is:
The first commit I did

# This is the 2nd commit message:

The second commit I did
```

You'll want to remove or comment out everything except for the first message, which you can edit to be a more complete summary of your changes.

To finish, you'll force push this new commit with the following command:

```
git push origin [my-feature-branch] --force-with-lease
```

The `--force-with-lease` flag will refuse to update a branch if someone else has updated it upstream, making your force push a little safer.
