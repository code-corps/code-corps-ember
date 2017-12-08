import Controller from '@ember/controller';
import { get, set } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  flashMessages: service(),

  async approve(project) {
    set(project, 'approved', true);
    let title = get(project, 'title');
    project.save().then(() => {
      get(this, 'flashMessages').clearMessages().success(`You approved ${title}.`);
    }).catch(() => {
      project.rollbackAttributes();
      get(this, 'flashMessages').clearMessages().danger(`An error occurred while approving ${title}.`);
    });
  }
});
