/* eslint-env node */
'use strict';

module.exports = function(/* environment, appConfig */) {
  // See https://github.com/san650/ember-web-app#documentation for a list of
  // supported properties

  return {
    name: "Songbox",
    short_name: "songbox",
    description: "",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    apple: {
      statusBarStyle: 'black-translucent'
    },
    icons: [
      {
        src: "/apple-touch-icons/icon-60.png",
        sizes: "60x60",
        type: "image/png"
      },
      {
        src: "/apple-touch-icons/icon-76.png",
        sizes: "76x76",
        type: "image/png"
      },
      {
        src: "/apple-touch-icons/icon-60@2x.png",
        sizes: "120x120",
        type: "image/png"
      },
      {
        src: "/apple-touch-icons/icon-76@2x.png",
        sizes: "152x152",
        type: "image/png"
      },
      {
        src: "/apple-touch-icons/icon-60@3x.png",
        sizes: "180x180",
        type: "image/png"
      }
    ]
  };
}
