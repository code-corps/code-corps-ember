# Contributing

Thanks for thinking about helping! How would you like to help?

- [I want to build a new feature.](#how-to-tackle-a-new-feature)
- [I want to improve the documentation.](#what-kind-of-documentation-are-you-writing)
- [I want to fix a bug.](#how-to-fix-a-bug)
- [I want to refactor some code.](#how-to-refactor-code)
- [I don't know how to help.](#what-if-i-dont-know-how-to-help)

Also, check out our [workflow](#using-git-effectively) and [recommended tools](#recommended-tools).

## Before you get started

1. [Fork the repo](https://help.github.com/articles/fork-a-repo/).

2. Read and work through [the installation guide](../docs/INSTALLING.md).

3. Run the tests. We only take pull requests with passing tests, and it's great to know that you have a clean slate: `ember exam`. More information on testing commands can be found [here](../docs/USAGE.md#running-tests)

Okay, you're ready to go!

## How to tackle a new feature

If there's already an issue for the feature you want to tackle, how complete is the description? Do you know what to do next? Are you confident you know what "done" looks like?

If there's not an issue yet, write one.

Whether you're writing a new issue or improving on an existing issue, be sure to clarify exactly how you expect the finished change to look and work.

One of the best ways to write a feature is in user story format:

> As an [actor], I want to do [action], so that [benefit].

For example, let's say we wanted to write some Slack integration for new comments posted to a Code Corps project. That user story might look something like:

> As a project maintainer, I want to see new comments on my project task in my Slack channel so that everyone can see and react to some of the latest changes in the project.

You may want to go deeper into detail. Posting screenshots of designs or expected test cases and scenarios are even more helpful. Place yourself in the shoes of the person who's going to accomplish the task – even if that person is you. What steps should I be taking next to finish this task?

Once you've created the issue, you can [make your changes and push them up](#how-to-write-new-code).

New to git? Check out [Using Git effectively](#using-git-effectively).

## What kind of documentation are you writing?

- [I want to document the codebase](#improving-ember-docs).
- [I want to improve the docs on GitHub.](#improving-the-readme)

### Improving Ember docs

You can see how much code is documented on [Inch CI](http://inch-ci.org/github/code-corps/code-corps-ember).

We use YUIDoc to document our code.

You can learn about how to write documentation with YUIDoc from these places:

- Our [style guide](../docs/STYLEGUIDE.md#Documentation)
- YUIDoc's [syntax guide](http://yui.github.io/yuidoc/syntax/index.html)

[Done with your changes?](#i-finished-my-changes)

### Improving the README

If you're just looking to improve the README, there's a couple things you should know:

- Open an issue first. It's better if we discuss your proposed changes.
- We try to keep the main `README.md` lightweight and use it as a jumping point to other docs.
- Most other docs can be placed in `/docs`.
- Try to make it easy for people to jump around in your doc.

[Done with your changes?](#i-finished-my-changes)

## How to fix a bug

If you're fixing a bug that's already been added to the issues, ask yourself whether the bug description is clear. Do you know what circumstances led to the bug? Does it seem easy to reproduce?

If you've spotted a bug yourself, open an issue and try to answer those questions.

Then start writing some code:

1. Make the tests fail.

Identify what's happening in the bug with a test. This way the bug is reproducible for everyone else in the project, and we won't regress into making the bug ever again (hopefully!).

2. Make the tests pass again.

Write your code that fixes the bug and makes it pass.

[Done with your changes?](#i-finished-my-changes)

## How to refactor code

Refactoring code shouldn't require any new tests, but you should [make sure the tests still pass](../docs/USAGE.md#running-tests).

[Done with your refactoring?](#i-finished-my-changes)

## How to write new code

When you're ready to write some new code, you should do the following:

1. Write some documentation for your change.

Why do this first? Well, if you know the behavior you want to see, then it's easier to validate if it works as expected. Think of this as documentation-driven development.

[What kind of documentation are you writing?](#what-kind-of-documentation-are-you-writing)

2. Add a test for your change. [Here's how to run tests.](../docs/USAGE.md#running-tests)

3. Make the test pass.

Try to keep your changes to a max of around 200 lines of code whenever possible. Why do this? Apparently the more changes incurred in a pull request, the likelier it is that people who review your code will just gloss over the details. Smaller pull requests get more comments and feedback than larger ones. Crazy, right?

[Done with your changes and ready for a review?](#i-finished-my-changes)

## What if I don't know how to help?

Not a problem! You can try looking around for issues that say `good for new contributors`. Documentation really is a good place to start. If you're still not sure, just [join our Slack](http://slack.codecorps.org) and flag someone down. Someone can help point you in the right direction.

## I finished my changes

Now you just need to push your finished code to your fork and submit a pull request.

Your pull request will be run through a continuous integration server to test your changes, [as described here](#continuous-integration).

At this point you're waiting on us. We like to at least comment on, if not
accept, pull requests within a week's time. We may suggest some changes or improvements or alternatives.

Some things that will increase the chance that your pull request is accepted:

* Use Ember.js idioms
* Include tests that fail without your code, and pass with it
* Update the documentation, the surrounding one, examples elsewhere, guides,
  whatever is affected by your contribution

Has your code been reviewed? [Here's what we need before we can merge.](#before-we-can-merge)

## Continuous Integration

We use [CircleCI](https://circleci.com/) to test your branches and continuously deploy branches merged into `develop` to our staging API and branches merged into `master` to our production API.

If your test fails on Circle, you should re-check your tests. Sometimes this indicates a mismatch between your environment and our expected environment.

The `circle.yml` file specifies what happens in the builds. You can [read more about that in Circle's documentation](https://circleci.com/docs/configuration/).

The CircleCI builds also rely on some environment variables for reporting, deployments, and other requirements.

## Before We Can Merge

If you've had a pull request reviewed and accepted, congratulations! Before we can merge your changes, we'll need you to rebase off `origin/develop` and squash your commits into one. This will give us a cleaner git history.

Never done this before? No problem. [We'll walk you through it in our guide](../docs/SQUASHING.md), and you can read [a deeper guide about rewriting history to understand more](https://git-scm.com/book/en/v2/Git-Tools-Rewriting-History).

## Using Git effectively

When making code changes with Git, it is best to develop a workflow. Every 'feature', which can be anything from a 1-line change to an entire component, should be done on a seperate feature branch.

Let's say you are working on issue 6000, which requests that the `needs_coffee` property of `programmer` be changed to a constant that always returns `true`. You'll make the following steps:

1. Check out the code, or fetch any updates from github.
2. Assign yourself the issue (if you aren't a contributor yet, comment that you are working on it)
3. Create a new feature branch:

```shell
git branch <feature-name>
```

For the `<feature-name>`, use our naming standard: `[issue#]-[adds|removes|updates]-[description]`

So, for the issue you just assigned yourself, the feature name would be `6000-updates-programmer-coffee-property`. In most cases, adds, removes, and updates will suffice. If none of those options make sense use another present-tense verb. The description component of the feature name should also be in present-tense. Note the use of hyphens (-) to seperate all words.

4. Checkout your feature branch:

```shell
git checkout <your-feature-branch>
```

5. Make your changes and push commits to your feature branch often
6. Once you've finished, make a [pull request](#i-finished-my-changes).

To learn more about this workflow, check out [GitHub Flow](http://scottchacon.com/2011/08/31/github-flow.html).

## Recommended Tools

### Hub

GitHub has released a tool that can aid working with GitHub via the command line. [Check it out!](https://github.com/github/hub) It's called `hub` and it makes cloning repositories and making pull requests a breeze.

### Bash Git Completion

Bash user? Check out [bash git completion](https://git-scm.com/book/en/v2/Git-in-Other-Environments-Git-in-Bash) which adds helpful information to your prompt about which branch you are currently in, adds tab completion of git commands, and gives you helpful status information on your files.

### Windows/PowerShell

If you are a Windows user, you should really be using Powershell as your command line (especially since it adopts bash aliases for most cmd.exe functions).

[Install `posh-git`](https://github.com/dahlbyk/posh-git) which, like bash git completion, provides tab completion and helpful repository info in your prompt.

You'll probably want to keep some sort of Bash emulator on hand. Git comes with it's own bash shell, but its not very good. Fortunately there are a few other great options:

- [ConEmu](http://conemu.github.io/) is a fantastic console emulator that comes with two bash options.
- [Cmder](http://cmder.net/) is ConEmu on steroids with Monokai console coloring and git bash completion, Posh-git, and oh-my-posh already installed
- [Windows Subsystem for Linux](https://blogs.msdn.microsoft.com/wsl/2016/04/22/windows-subsystem-for-linux-overview/) More complex to use, but it gives you a full bash shell in an Ubuntu enviornment.