import {
  create,
  visitable
} from 'ember-cli-page-object';

import sidebar from './parts/sidebar';

export default create({
  visit: visitable('/a/songs'),

  sidebar
});
