import Ember from 'ember';

const {
  isEmpty
} = Ember;

export function songSectionHeader([abbr]/*, hash*/) {
  const replacements = {
    'C': 'Chorus',
    'V': 'Verse',
    'B': 'Bridge',
    'T': 'Tag',
    'P': 'Pre-Chorus'
  };

  const regexp = new RegExp(`^([${Object.keys(replacements).join("")}])(.*)$`, "i");
  let abbArr = regexp.exec(abbr)

  if (isEmpty(abbArr)) {
    return abbr; // <- !!
  }

  // cleanup match
  abbArr.shift();
  if(isEmpty(abbArr[1])) {
    abbArr.pop();
  }

  // do replacement
  let char = abbArr[0].toUpperCase();
  abbArr[0] = replacements[char];

  /*
  # use i18n if available
  abbArr[0] = i18n.t "header.#{abbArr[0].toLowerCase()}" if i18n?
    */

  return abbArr.join(' ');
}

export default Ember.Helper.helper(songSectionHeader);
