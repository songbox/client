import { helper } from '@ember/component/helper';

export function hostUrl(/*params, hash*/) {
  if (window && window.location) {
    return window.location.origin;
  } else {
    return "";
  }
}

export default helper(hostUrl);
