import createUserWithSluggedRoute from 'code-corps-ember/mirage/helpers/create-user-with-slugged-route';

export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  let categories = [
    {
      name: 'Arts',
      description: 'You want to improve the arts.'
    },
    {
      name: 'Economy',
      description: 'You want to improve finance and the economic climate.'
    },
    {
      name: 'Education',
      description: 'You want to improve literacy, schools, and training.'
    },
    {
      name: 'Environment',
      description: 'You want to improve your environment.'
    },
    {
      name: 'Government',
      description: 'You want to improve government responsiveness.'
    },
    {
      name: 'Health',
      description: 'You want to improve prevention and treatment.'
    },
    {
      name: 'Justice',
      description: 'You want to improve your judicial system.'
    },
    {
      name: 'Politics',
      description: 'You want to improve elections and voting.'
    },
    {
      name: 'Public Safety',
      description: 'You want to improve crime prevention and safety.'
    },
    {
      name: 'Science',
      description: 'You want to improve tools for advancing science.'
    },
    {
      name: 'Security',
      description: 'You want to improve tools like encryption.'
    },
    {
      name: 'Society',
      description: 'You want to improve our communities.'
    },
    {
      name: 'Technology',
      description: 'You want to improve software tools and infrastructure.'
    },
    {
      name: 'Transportation',
      description: 'You want to improve how people travel.'
    }
  ];

  categories.forEach(({ name, ability, kind }) => {
    server.create('category', { name, ability, kind });
  });

  let roles = [
    {
      name: 'Accountant',
      ability: 'Accounting',
      kind: 'support'
    },
    {
      name: 'Administrator',
      ability: 'Administrative',
      kind: 'support'
    },
    {
      name: 'Donor',
      ability: 'Donations',
      kind: 'support'
    },
    {
      name: 'Backend Developer',
      ability: 'Backend Development',
      kind: 'technology'
    },
    {
      name: 'Data Scientist',
      ability: 'Data Science',
      kind: 'technology'
    },
    {
      name: 'Designer',
      ability: 'Design',
      kind: 'creative'
    },
    {
      name: 'DevOps',
      ability: 'DevOps',
      kind: 'technology'
    },
    {
      name: 'Front End Developer',
      ability: 'Front End Development',
      kind: 'technology'
    },
    {
      name: 'Lawyer',
      ability: 'Legal',
      kind: 'support'
    },
    {
      name: 'Marketer',
      ability: 'Marketing',
      kind: 'creative'
    },
    {
      name: 'Mobile Developer',
      ability: 'Mobile Development',
      kind: 'technology'
    },
    {
      name: 'Product Manager',
      ability: 'Product Management',
      kind: 'technology'
    },
    {
      name: 'Photographer',
      ability: 'Photography',
      kind: 'creative'
    },
    {
      name: 'Researcher',
      ability: 'Research',
      kind: 'support'
    },
    {
      name: 'Tester',
      ability: 'Testing',
      kind: 'technology'
    },
    {
      name: 'Video Producer',
      ability: 'Video Production',
      kind: 'creative'
    },
    {
      name: 'Writer',
      ability: 'Writing',
      kind: 'creative'
    }
  ];

  roles.forEach(({ name, ability, kind }) => {
    server.create('role', { name, ability, kind });
  });

  let organization = server.create('organization', {
    description: 'Help build and fund public software projects for social good.',
    name: 'Code Corps',
    slug: 'code-corps'
  });

  server.create('sluggedRoute', {
    slug: organization.slug,
    organization
  });

  let project = server.create('project', {
    description: 'Help build and fund public software projects for social good.',
    organization,
    slug: 'code-corps',
    title: 'Code Corps'
  });

  let owner = createUserWithSluggedRoute(server, {
    email: 'owner@codecorps.org',
    password: 'password',
    username: 'codecorps-owner'
  });

  server.create('organization-membership', {
    member: owner,
    organization,
    role: 'owner'
  });

  let admin = createUserWithSluggedRoute(server, {
    email: 'admin@codecorps.org',
    password: 'password',
    username: 'codecorps-admin'
  });

  server.create('organization-membership', {
    member: admin,
    organization,
    role: 'admin'
  });

  let contributor = createUserWithSluggedRoute(server, {
    email: 'contributor@codecorps.org',
    password: 'password',
    username: 'codecorps-contributor'
  });

  server.create('organization-membership', {
    member: contributor,
    organization,
    role: 'contributor'
  });

  let pending = createUserWithSluggedRoute(server, {
    email: 'pending@codecorps.org',
    password: 'password',
    username: 'codecorps-pending'
  });

  server.create('organization-membership', {
    member: pending,
    organization,
    role: 'pending'
  });

  createUserWithSluggedRoute(server, {
    email: 'random@user.com',
    password: 'password',
    username: 'random'
  });

  server.createList('task', 10, { project, taskType: 'idea', user: owner });
  server.createList('task', 10, { project, taskType: 'issue', user: owner });
  server.createList('task', 10, { project, taskType: 'task', user: owner });

  let skillTitles = ['CSS', 'Ember.js', 'HTML'];

  skillTitles.forEach((title) => {
    let skill = server.create('skill', { title });
    server.create('project-skill', { project, skill });
  });

  let categoryNames = ['Society', 'Technology'];
  categoryNames.forEach((name) => {
    let [category] = server.schema.categories.where({ name }).models;
    server.create('project-category', { category, project });
  });

  server.createList('stripe-platform-card', 6, { user: owner });
}
