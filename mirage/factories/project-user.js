import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  role: 'owner',

  // ensures creation of associated records if they were not otherwise specified
  afterCreate(projectUser, server) {
    if (!projectUser.user) {
      projectUser.user  = server.create('user');
      projectUser.save();
    }

    if (!projectUser.project) {
      projectUser.project = server.create('project');
      projectUser.save();
    }
  }
});
