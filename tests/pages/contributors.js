import {
  collection,
  create,
  visitable,
  isVisible,
  text
} from 'ember-cli-page-object';
import memberListItem from './components/member-list-item';

function buildContributorsDefinitionForIndex(index) {
  return {
    scope: `.contributors-list:eq(${index})`,
    emptyMessageVisible: isVisible('.contributors-list--empty'),
    members: collection({
      itemScope: 'li',
      item: memberListItem
    })
  };
}

export default create({
  visit: visitable('/:project_organization_slug/:project_slug/settings/contributors'),

  pendingContributors: buildContributorsDefinitionForIndex(0),
  owners: buildContributorsDefinitionForIndex(1),
  admins: buildContributorsDefinitionForIndex(2),
  others: buildContributorsDefinitionForIndex(3),
  projectMenu: {
    scope: '.project__menu',
    contributors: {
      scope: '.contributors',
      infoText: text('.info'),
      infoVisible: isVisible('.info')
    }
  }
});
