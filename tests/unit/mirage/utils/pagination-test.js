import { link, paginate } from 'code-corps-ember/mirage/utils/pagination';
import { module, test } from 'qunit';

module('Unit | Mirage Utility | pagination');

let range = function(n) {
  return [...Array(n).keys()];
};

test('paginate returns a page based on queryParams for a collection', function(assert) {
  assert.expect(8);

  let endpoint = '/github-events';

  let singlePageParams = { 'page[page]': 1, 'page[page-size]': 1 };
  let singlePageCollection = range(1);
  let singlePage = paginate(singlePageCollection, endpoint, singlePageParams);
  assert.equal(singlePage.meta.self, link(endpoint, 1, 1));
  assert.notOk('prev' in singlePage.meta);
  assert.notOk('next' in singlePage.meta);
  assert.notOk('last' in singlePage.meta);

  let multiPageParams = { 'page[page]': 2, 'page[page-size]': 1 };
  let multiPageCollection = range(4);
  let multiPage = paginate(multiPageCollection, endpoint, multiPageParams);
  assert.equal(multiPage.meta.self, link(endpoint, 2, 1));
  assert.equal(multiPage.meta.prev, link(endpoint, 1, 1));
  assert.equal(multiPage.meta.next, link(endpoint, 3, 1));
  assert.equal(multiPage.meta.last, link(endpoint, 4, 1));
});
