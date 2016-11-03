import { authenticateSession } from 'code-corps-ember/tests/helpers/ember-simple-auth';

export function authenticateAsMemberOfRole(application, server, organization, role) {
  let member = server.schema.create('user');
  server.schema.create('organization-membership', { member, organization, role });
  authenticateSession(application, { user_id: member.id });
}
