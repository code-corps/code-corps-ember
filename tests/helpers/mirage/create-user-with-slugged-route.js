export default function createUserWithSluggedRoute() {
  let user = server.create('user');
  server.create('sluggedRoute', { slug: user.username, user });
  return user;
}
