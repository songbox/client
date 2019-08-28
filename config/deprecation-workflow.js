self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "ember-polyfills.deprecate-merge" },
    { handler: "silence", matchId: "ember-simple-auth.oauth2-password-grant-authenticator.client-id-as-authorization" },
    { handler: "silence", matchId: "computed-property.volatile" },
    { handler: "silence", matchId: "computed-property.override" }
  ]
};
