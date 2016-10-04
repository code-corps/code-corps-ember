import createOrganizationWithSluggedRoute from 'code-corps-ember/tests/helpers/mirage/create-organization-with-slugged-route';

export default function createProjectWithSluggedRoute() {
  let organization = createOrganizationWithSluggedRoute();
  return server.create('project', { organization });
}
