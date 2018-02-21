import { JSONAPISerializer } from 'ember-cli-mirage';

export default JSONAPISerializer.extend({
  // TODO: check with
  // http://www.ember-cli-mirage.com/blog/2018/02/01/changing-mirages-default-linkage-data-behavior/
  alwaysIncludeLinkageData: true
});
