/*

json = [
  {
    header: "V",
    lines: [
      {
        chords: ["A", "C"],
        lyrics: [
          ["Yeah", "Yeah, God is great!"]
        ]
      },
      {
        comments: "This is a comment"
      }
    ]
  }
]

*/
export default function opensong(lyrics) {
  if (! lyrics) {
    return [];
  }

  lyrics = lyrics.replace(/\r\n?/g, '\n');
  let lyricsLines = lyrics.split("\n");

  let dataModel = [];
  let dataObject = {
    header: undefined,
    lines: []
  };
  dataModel.push(dataObject);

  while (lyricsLines.length > 0) {
    let line = lyricsLines.shift();

    if (line == null) { continue; }

    switch (line[0]) {
      // header
      case "[": {
        // add new object if current is "used"
        if (dataObject.lines.length > 0) {
          dataObject = {
            header: undefined,
            lines: []
          };
          dataModel.push(dataObject);
        }

        let header = line.match(/\[(.*)\]/)[1];
        dataObject.header = header;
        break;
      }
      // chords (with lyrics)
      case ".": {
        let chordsLine = line.substr(1);
        let chordArr = [];
        let m = null;

        // split cords
        while (chordsLine.length > 0) {
          m = /^(\S*\s*)(.*)/.exec(chordsLine);
          chordArr.push(m[1]);
          chordsLine = m[2];
        }
        // add an item if it is an empty line
        if (chordArr.length === 0) { chordArr.push(chordsLine); }

        // clean Chord line from trailing white spaces
        let chordArrCleaned = [];
        chordArr.forEach(function(value) {
          let m = /(\S*\s?)\s*/.exec(value);
          return chordArrCleaned.push(m[1]);
        });

        let textLine = "";
        let textLineArr = [];

        // while we have lines that match a textLine create an html table row
        while ((textLine = lyricsLines.shift()) &&
              (m = textLine.match(/^([ 1-9])(.*)/))) {

          let textArr = [];
          textLine = m[2];
          // split lyrics line based on chord length
          chordArr.forEach((chord) => {
            // split String with RegExp (is there a better way?)
            m = textLine.match(new RegExp(`(.{0,${chord.length}})(.*)`));
            textArr.push(m[1]);
            textLine = m[2];
          });
          // add the whole string if at the end of the chord arr
          textArr.push(textLine);

          textLineArr.push(textArr);
        }

        let lineObj = {
          chords: chordArrCleaned
        };
        if (textLineArr.length > 0) {
          lineObj.lyrics = textLineArr;
        }

        dataObject.lines.push(lineObj);

        // attach the line again in front (we cut it off in the while loop)
        if (textLine !== 'undefined') { lyricsLines.unshift(textLine); }
        break;

      }
      // comments
      case ";": {
        dataObject.lines.push({comments: line.substr(1)});
        break;
      }

      // lyrics and everythings else
      default: {
        if (/^[ 0-9]/.test(line)) {
          dataObject.lines.push({
            lyrics: [
              [line.substr(1)]
            ]
          });
        }
      }
    }
  }

  return dataModel;
}
