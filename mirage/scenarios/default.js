export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.

    Make sure to define a factory for each model you want to create.
  */

  const user = server.create('user');
  const room = server.create('room', { user });
  user.update({ room });

  server.loadFixtures()
  // server.createList('post', 10);
}
