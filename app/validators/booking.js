import {
  validatePresence,
  validateFormat,
  validateNumber,
} from 'ember-changeset-validations/validators';

import Ember from 'ember';

const {
  get,
} = Ember;

export default function createBookingValidator(bookings) {
  return {
    clientEmail: [
      validatePresence(true),
      validateFormat({ type: 'email' })
    ],
    price: validateNumber({ integer: true, gt: 0 }),
    dates: validateNoOverlapping({ bookings }),
  }
}

function validateNoOverlapping({ bookings }) {
  return (_key, _value, _oldValue, _changes, content) => {
    const overlappingBookings = bookings.filter((booking) => {
      return content !== booking &&
             get(booking, 'beginsAt').isBefore(get(content, 'finishesAt')) &&
             get(booking, 'finishesAt').isAfter(get(content, 'beginsAt'))
    });

    if (overlappingBookings.length === 0) {
      return true;
    } else {
      return 'Dates must not overlap with other bookings';
    }
  };
}

