## Module Report
### Unknown Global

**Global**: `Ember.testing`

**Location**: `app/services/settings.js` at line 33

```js
    let lsi = LocalSettingsInterface.create({
      serializer: 'json',
      adapter: Ember.testing ? 'local-memory' : 'local-storage',
      prefix: 'songbox/'
    });
```
