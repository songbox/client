self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "ember-cli-page-object.old-collection-api" },
    { handler: "silence", matchId: "ember-polyfills.deprecate-merge" },
    { handler: "silence", matchId: "ember-simple-auth.session.authorize" },
    { handler: "silence", matchId: "ember-simple-auth.baseAuthorizer" },
    { handler: "silence", matchId: "deprecate-router-events" },
    { handler: "silence", matchId: "ember-runtime.deprecate-copy-copyable" },
    { handler: "silence", matchId: "remove-handler-infos" },
    { handler: "silence", matchId: "array.new-array-wrapper" }
  ]
};
