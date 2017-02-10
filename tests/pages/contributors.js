import {
  create,
  visitable,
  collection,
  isVisible,
  text,
  clickable
} from 'ember-cli-page-object';

function buildContributorsDefinitionForIndex(index) {
  return {
    scope: `.contributors-list:eq(${index})`,
    emptyMessageVisible: isVisible('.contributors-list--empty'),
    members: collection({
      itemScope: '.member-list-item',
      item: {
        approveMembership: clickable('button.default'),
        denyMembership: clickable('button.danger')
      }
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
