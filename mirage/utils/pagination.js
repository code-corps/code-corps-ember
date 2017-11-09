let link = function(endpoint, pageNumber, pageSize) {
  return `${endpoint}?page[page]=${pageNumber}&page[page-size]=${pageSize}`;
};

let paginate = function(collection, endpoint, queryParams) {
  let pageNumber = parseInt(queryParams['page[page]']);
  let pageSize = parseInt(queryParams['page[page-size]']);

  let page = collection.filter((p, index) => {
    return (index >= (pageNumber - 1) * pageSize)
        && (index < pageNumber * pageSize);
  });

  let links = {
    'self': link(endpoint, pageNumber, pageSize)
  };

  let lastPageNumber = Math.ceil(collection.length / pageSize);

  if (pageNumber != lastPageNumber) {
    let nextPageNumber = pageNumber + 1;
    links.last = link(endpoint, lastPageNumber, pageSize);
    links.next = link(endpoint, nextPageNumber, pageSize);
  }

  if (pageNumber > 1) {
    let prevPageNumber = pageNumber - 1;
    links.prev = link(endpoint, prevPageNumber, pageSize);
  }

  page.meta = page.meta || {};
  page.meta = links;

  return page;
};

export { link, paginate };
