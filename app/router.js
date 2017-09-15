import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('signup')
  this.route('login');
  this.route('admin');

  this.route('rentals', function() {
    this.route('new');
  });

  this.route('rental', { path: '/rentals/:rental_id' }, function() {
    this.route('edit');
    this.route('show', function() {
      this.route('createBooking');
    });
  });
});

export default Router;
