import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  name(i) {
    return `Rental ${i}`;
  },

  dailyRate() {
    return faker.random.number();
  },
});
