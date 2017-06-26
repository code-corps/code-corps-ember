import Ember from 'ember';

const {
  Component
} = Ember;

export default Component.extend({
  classNames: ['demo-projects'],
  projects: [
    {
      title: 'Code Corps',
      description: 'Building a better future together. Contribute to public software for social good.',
      iconLargeUrl: 'https://d3pgew4wbk2vb1.cloudfront.net/images/cc-demo.png',
      organizationName: 'Code Corps',
      categories: [
        {
          name: 'Society',
          selected: false,
          slug: 'society',
          className: 'category-item__icon--small--society',
          selectedClassName: 'category-item__icon--small--society--selected'
        },
        {
          name: 'Technology',
          selected: true,
          slug: 'technology',
          className: 'category-item__icon--small--technology',
          selectedClassName: 'category-item__icon--small--technology--selected'
        }
      ],
      skills: [
        {
          title: 'Ember.js',
          matched: true
        },
        {
          title: 'HTML',
          matched: true
        },
        {
          title: 'Rails',
          matched: true
        },
        {
          title: 'Ruby',
          matched: true
        },
        {
          title: 'Copywriting',
          matched: false
        },
        {
          title: 'CSS',
          matched: false
        }
      ]
    },
    {
      title: 'Movement',
      description: 'We help people elect their representatives and then hold them accountable.',
      iconLargeUrl: 'https://d3pgew4wbk2vb1.cloudfront.net/images/movement-demo.png',
      organizationName: 'Movement',
      categories: [
        {
          name: 'Government',
          selected: true,
          slug: 'government',
          className: 'category-item__icon--small--government',
          selectedClassName: 'category-item__icon--small--government--selected'
        },
        {
          name: 'Politics',
          selected: false,
          slug: 'politics',
          className: 'category-item__icon--small--politics',
          selectedClassName: 'category-item__icon--small--politics--selected'
        },
        {
          name: 'Society',
          selected: false,
          slug: 'society',
          className: 'category-item__icon--small--society',
          selectedClassName: 'category-item__icon--small--society--selected'
        }
      ],
      skills: [
        {
          title: 'Rails',
          matched: true
        },
        {
          title: 'Ruby',
          matched: true
        },
        {
          title: 'Amazon S3',
          matched: false
        },
        {
          title: 'iOS',
          matched: false
        },
        {
          title: 'PostgreSQL',
          matched: false
        },
        {
          title: 'Swift',
          matched: false
        }
      ]
    }
  ]
});
