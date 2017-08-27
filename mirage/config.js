import Mirage from 'ember-cli-mirage';

const {
  Response,
} = Mirage;

export default function() {
  this.namespace = 'api';

  this.post('/users');

  this.post('/oauth/token', (schema, request) => {
    const potentialPasswordMatch = request.requestBody.match(/password=([^&]*)/);
    const potentialEmailMatch = request.requestBody.match(/username=([^&]*)/);
    // example: [
    //   "password=supersecretpassword123",
    //   "supersecretpassword123",
    //   index: 50,
    //   input: "grant_type=password&username=example%40gmail.com&password=supersecretpassword123"
    // ]
    const password = potentialPasswordMatch && potentialPasswordMatch[1];
    const email = potentialEmailMatch && decodeURIComponent(potentialEmailMatch[1]);

    const user = schema.users.findBy({ email });

    if (!user || user.password !== password) {
      return new Response(401, {}, { message: 'invalid credentials' });
    } else {
      return {
        access_token: '123456789',
        token_type: 'bearer',
        user_id: user.id,
      };
    }
  });

  this.post('/oauth/destroy', () => {
    return new Response(204);
  });

  this.resource('rentals');
}
