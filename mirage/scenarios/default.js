export default function(server) {
  let usersToPopulate = [
    {
      username: "joshsmith"
    },
    {
      username: "begedin"
    },
    {
      username: "caligoanimus"
    },
    {
      username: "cstyles"
    }
  ];

  for(var i = 0; i < usersToPopulate.length; i++) {
    let user = server.create('user', { username: usersToPopulate[i].username });
    let userRoute = server.create('slugged-route', {
      ownerType: 'user',
      slug: user.username
    });
    userRoute.owner = user;
    userRoute.save();
  }

  let users = server.db.users;

  let organizations = [
    {
      name: "Code Corps",
      slug: "code_corps"
    },
    {
      name: "Movement",
      slug: "movement"
    },
    {
      name: "Watsi",
      slug: "watsi"
    },
    {
      name: "Really Very Long Name Intended to Break UI Some",
      slug: "really_very_long_name_intended_to_break_ui_some"
    }
  ];

  for(var i = 0; i < organizations.length; i++) {
    let sluggedRoute = server.create('slugged-route', {
      ownerType: 'organization',
      slug: organizations[i].slug
    });

    let organization = server.create('organization', {
      name: organizations[i].name,
      slug: organizations[i].slug
    });

    debugger;

    sluggedRoute.owner = organization;
    sluggedRoute.save();

    let project = server.create('project', {
      organization: organization,
      title: organizations[i].name
    });

    let posts = server.createList('post', 33, {
      project: project,
      userId: users[Math.floor(Math.random()*users.length)].id
    });
  }
}
