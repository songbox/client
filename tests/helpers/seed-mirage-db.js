/* global server */

export default function () {
  const user = server.create('user');
  const room = server.create('room', { user });
  user.update({ room });

  server.loadFixtures();
  let song = server.db.songs.find(2);

  return {
    user,
    room,
    song
  };
}
