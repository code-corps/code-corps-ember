import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  project: {
    description: 'Test project description',
    title: 'Test Project',
    iconThumbUrl: '/assets/images/icons/categories.png'
  }
  /* BEGIN-FREESTYLE-USAGE donation--project-header--notes
  ```
  import Component from '@ember/component';

  export default Component.extend({
    tagName: '',

    project: {
      description: 'Test project description',
      title: 'Test Project',
      iconThumbUrl: '/assets/images/icons/categories.png'
    }
  });
  ```
  END-FREESTYLE-USAGE */
});
