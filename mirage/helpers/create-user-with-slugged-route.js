export default function createUserWithSluggedRoute(server, params = {}) {
  let user = server.create('user', params);
  server.create('sluggedRoute', { slug: user.username, user });
  return user;
}
