import Ember from 'ember';

const {
  get,
  isPresent
} = Ember;

function parse(body, mentions) {
  if (isPresent(body) && isPresent(mentions)) {
    return _parseMentions(body, mentions);
  } else {
    return body;
  }
}

function _generateLink(mention) {
  let username = get(mention, 'username');
  return `<a href="/${username}" class="username">@${username}</a>`;
}

function _parseMentions(body, mentions) {
  let parsedBody = '';
  let currentPosition = 0;

  mentions.forEach((mention) => {
    let indices = get(mention, 'indices');
    let [startIndex, endIndex] = indices;

    parsedBody += body.slice(currentPosition, startIndex);
    parsedBody += _generateLink(mention);
    currentPosition = endIndex + 1;
  });

  parsedBody += body.slice(currentPosition, body.length);

  return parsedBody;
}

export { parse };
