import CookieStore from 'ember-simple-auth/session-stores/cookie';

export default CookieStore.extend({
  cookieName: 'songbox:session',
  cookieExpirationTime: 60 * 60 * 24 * 365; // expire cookie after 1 year
});
