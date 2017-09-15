import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  email(i) {
    return `example_${i}@gmail.com`;
  },

  password() {
    return `password123`;
  }
});
