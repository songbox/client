import BaseSerializer from './application';

export default BaseSerializer.extend({
  include() {
    return ['room'];
  }
});
