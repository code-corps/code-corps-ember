import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  // ensures creation of associated records if they were not otherwise specified
  afterCreate(record, server) {
    if (!record.githubRepo) {
      record.githubRepo  = server.create('github-repo');
      record.save();
    }

    if (!record.project) {
      record.project = server.create('project');
      record.save();
    }
  }
});
