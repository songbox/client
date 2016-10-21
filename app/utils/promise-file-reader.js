// https://github.com/jahredhope/promise-file-reader

import RSVP from 'rsvp';

function readAs(file, as) {
  if (!(file instanceof Blob)) {
    throw new TypeError('Must be a File or Blob')
  }
  return new RSVP.Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = e => resolve(e.target.result)
    reader.onerror = e => reject(`Error reading ${file.name}: ${e.target.result}`)
    reader['readAs' + as](file)
  })
}

export const readAsDataURL = (file) => {
  return readAs(file, 'DataURL')
}

export const readAsText = (file) => {
  return readAs(file, 'Text')
}

export const readAsArrayBuffer = (file) => {
  return readAs(file, 'ArrayBuffer')
}

export default {
  readAsDataURL, readAsText, readAsArrayBuffer
};
