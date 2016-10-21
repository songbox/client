import Ember from 'ember';
import { readAsText } from 'songbox/utils/promise-file-reader';

const {
  $
} = Ember;

export default Ember.Route.extend({
  model() {
    return {
    };
  },

  actions: {
    doImport() {
      const fileList = $('input[type=file]')[0].files;

      Array.prototype.forEach.call(fileList, (file) => {
        switch (file.type) {
          case '':

            // opensong file
            readAsText(file).then((fileContents) => {
              const xmlDoc = $.parseXML(fileContents);
              const $xml = $(xmlDoc);

              const song = this.store.createRecord('song');
              song.setProperties({
                title: $xml.find('title').text(),
                author: $xml.find('author').text(),
                key: $xml.find('key').text(),
                text: $xml.find('lyrics').text()
              });
              return song.save().catch(() => {
                this.store.unloadRecord(song);
              });
            });

            break;
          default:
            console.log(file.type + ' not supported yet');
        }
      });
    }
  }
});
