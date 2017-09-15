export default function(server) {
  server.createList('rental', 10);

  server.create('user', { email: 'email@example.com', password: 'password123' });
}
