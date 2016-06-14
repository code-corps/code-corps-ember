import Ember from 'ember';

export function highlightSubstrings([string, substring]) {
  let substrings = substring.split(" ").uniq();
  var positionsToAdd = [];
  var newString = [];
  var count = 0;
  var strongTagLocations = [];

  _findPositionsToAdd(positionsToAdd, string, substrings, newString);
  _assembleArrayOfStrings(positionsToAdd, newString, count, strongTagLocations);
  return _assembleOutputString(newString);
}

function _findPositionsToAdd(positionsToAdd, string, substrings, newString) {
  for (var i = 0; i < string.length; i++) {
    newString.push(string.charAt(i));
    for (var e = 0; e < substrings.length; e++) {
      let stringOfSize = string.substring(i, substrings[e].length + i).toLowerCase();
      let substringToMatch = substrings[e].toLowerCase();
      if(stringOfSize === substringToMatch) {
        positionsToAdd.push({
          index: i,
          stringLength: substringToMatch.length
        });
      }
    }
  }
}

function _assembleArrayOfStrings(positionsToAdd, newString, count, strongTagLocations) {
  for (var i = 0; i < positionsToAdd.length; i++) {
    var canProceed = true;
    let startIndex = positionsToAdd[i].index;
    let stringLength = positionsToAdd[i].stringLength;
    let firstLocation = startIndex + count;
    let lastLocation = firstLocation + (stringLength + 1);

    canProceed = _checkIfLocationInLocations(firstLocation, strongTagLocations);

    if (canProceed) {
      newString.splice(firstLocation, 0, "<strong>");
      newString.splice(lastLocation, 0, "</strong>");
      strongTagLocations.push({ start: firstLocation, end: lastLocation });
      count += 2;
    }
  }
}

function _assembleOutputString(arrayOfStrings) {
  var outputString = "";
  for (var i = 0; i < arrayOfStrings.length; i++) {
    outputString += arrayOfStrings[i];
  }
  return outputString;
}

function _checkIfLocationInLocations(location, locations) {
  var result = true;
  locations.forEach((searchedLocation) => {
    if (location <= searchedLocation.end) {
      result = false;
    }
  });
  return result;
}

export default Ember.Helper.helper(highlightSubstrings);
