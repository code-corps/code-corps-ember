export default function createOrganizationWithSluggedRoute() {
  let organization = server.create('organization');

  server.create('sluggedRoute', {
    slug: organization.slug,
    organization
  });

  return organization;
}
