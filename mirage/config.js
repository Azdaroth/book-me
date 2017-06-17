import Mirage from 'ember-cli-mirage';
import ENV from 'book-me/config/environment';

const {
  Response,
} = Mirage;

export default function() {
  this.namespace = 'api';

  this.post('/users');

  this.post('/oauth/token', (schema, request) => {
    const match = request.requestBody.match(/password=([^&]*)/);
    // example: [
    //   "password=supersecretpassword123",
    //   "supersecretpassword123",
    //   index: 50,
    //   input: "grant_type=password&username=azdaroth%40gmail.com&password=supersecretpassword123"
    // ]
    const password = match && match[1];

    if (password !== ENV.validPasswordForLogin) {
      return new Response(401, {}, { message: 'invalid credentials' });
    } else {
      return {
        access_token: '123456789',
        token_type: 'bearer',
        user_id: '1',
      };
    }
  });

  this.post('/oauth/destroy', () => {
    return new Response(204);
  });
}
