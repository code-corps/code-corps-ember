export default function projectUser(user, role = 'owner') {
  return {
    belongsTo() {
      return {
        id() {
          return user.id;
        }
      };
    },
    role,
    user
  };
}
