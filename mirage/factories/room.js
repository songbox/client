import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  uid() {
    return faker.random.uuid();
  }
});
