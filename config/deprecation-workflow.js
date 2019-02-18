self.deprecationWorkflow = self.deprecationWorkflow || {};
self.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "ember-polyfills.deprecate-merge" },
    { handler: "silence", matchId: "ember-runtime.deprecate-copy-copyable" },
    { handler: "silence", matchId: "remove-handler-infos" },
    { handler: "silence", matchId: "array.new-array-wrapper" }
  ]
};
