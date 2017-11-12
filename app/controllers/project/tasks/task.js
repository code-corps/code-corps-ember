import { filterBy, alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { set, getProperties, get } from '@ember/object';
import { isNonValidationError } from 'code-corps-ember/utils/error-utils';
import { task as concurrentTask } from 'ember-concurrency';

export default Controller.extend({
  currentUser: service(),
  store: service(),
  taskSkillsList: service(),

  comments: filterBy('task.comments', 'isNew', false),
  user: alias('currentUser.user'),

  archiveTask: concurrentTask(function* () {
    let task = get(this, 'task');
    set(task, 'archived', true);
    yield task.save();
  }).drop(),

  actions: {
    saveTask(task) {
      return task.save()
        .catch((payload) => this._onError(payload));
    },

    saveComment(markdown) {
      let comment = get(this, 'newComment');
      set(comment, 'markdown', markdown);
      return comment.save()
        .then((comment) => this._initComment(comment))
        .catch((payload) => this._onError(payload));
    },

    onSaveError(payload) {
      this._onError(payload);
    },

    removeTaskSkill(taskSkill) {
      return taskSkill.destroyRecord();
    },

    toggleSkill(skill) {
      let list = get(this, 'taskSkillsList');
      return list.toggle(skill);
    }
  },

  _onError(payload) {
    if (isNonValidationError(payload)) {
      set(this, 'error', payload);
    }
  },

  _initComment() {
    let { store, task, user } = getProperties(this, 'store', 'task', 'user');
    let newComment = store.createRecord('comment', { task, user });

    set(this, 'newComment', newComment);
  }
});
