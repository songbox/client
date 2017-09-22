/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import Route from '@ember/routing/route';

import $ from 'jquery';
import { readAsText } from 'songbox/utils/promise-file-reader';

export default Route.extend({
  model() {
    return {
      modelName: 'song', // used in ember-form-for
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
            console.warn(file.type + ' not supported yet');
        }
      });
    },
    cancel() {
      this.transitionTo('songs');
    }
  }
});
