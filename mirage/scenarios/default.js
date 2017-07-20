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

  let owner = server.create('user', {
    email: 'owner@codecorps.org',
    githubId: 12345,
    githubUsername: 'codecorps-owner',
    password: 'password',
    username: 'codecorps-owner'
  });

  let organization = server.create('organization', {
    owner,
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
    title: 'Code Corps',
    website: 'https://www.codecorps.org'
  });

  server.create('project-user', { user: owner, project, role: 'owner' });

  let admin = server.create('user', {
    email: 'admin@codecorps.org',
    password: 'password',
    username: 'codecorps-admin'
  });

  server.create('project-user', { user: admin, project, role: 'admin' });

  let contributor = server.create('user', {
    email: 'contributor@codecorps.org',
    password: 'password',
    username: 'codecorps-contributor'
  });

  server.create('project-user', { user: contributor, project, role: 'contributor' });

  let pending = server.create('user', {
    email: 'pending@codecorps.org',
    password: 'password',
    username: 'codecorps-pending'
  });

  server.create('project-user', { user: pending, project, role: 'pending' });

  server.create('user', {
    email: 'random@user.com',
    password: 'password',
    username: 'random'
  });

  let connectedInstallation = server.create('github-app-installation', {
    githubAccountAvatarUrl: 'https://avatars0.githubusercontent.com/u/12991115?v=4',
    githubAccountLogin: 'code-corps',
    project,
    user: owner
  });

  server.create('organization-github-app-installation', {
    githubAppInstallation: connectedInstallation,
    organization
  });

  let githubRepo = server.create('github-repo', {
    githubAppInstallation: connectedInstallation,
    name: 'code-corps-api'
  });

  server.create('project-github-repo', {
    githubRepo,
    project
  });

  server.create('github-repo', {
    githubAppInstallation: connectedInstallation,
    name: 'code-corps-ember'
  });

  let inboxTaskList = server.create('task-list', {
    name: 'Inbox',
    position: 0,
    project
  });

  let backlogTaskList = server.create('task-list', {
    name: 'Backlog',
    position: 1,
    project
  });

  let inProgressTaskList = server.create('task-list', {
    name: 'In Progress',
    position: 2,
    project
  });

  let doneTaskList = server.create('task-list', {
    name: 'Done',
    position: 3,
    project
  });

  server.createList('task', 4, { project, taskList: inboxTaskList, user: owner });

  server.createList('task', 5, { project, taskList: backlogTaskList, user: owner });

  server.createList('task', 3, { project, taskList: inProgressTaskList, user: owner });

  server.createList('task', 2, { project, taskList: doneTaskList, user: owner });

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

  project.createStripeConnectPlan();

  server.create('stripe-platform-customer', { user: owner });

  server.create('stripe-platform-card', { user: owner });

  server.create('donation-goal', {
    amount: 1250000,
    current: true,
    description:`
We can make regular, ongoing improvements with two full-time developers and one full-time community manager. All our overhead costs (like servers, services, etc) will be completely covered. And most importantly, we'll significantly increase the pace of our progress.
`,
    project
  });
}
