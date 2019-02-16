/*
The MIT License (MIT)

Copyright (c) 2015 George Ilyes

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
import { module, test } from 'qunit';
import * as chordpro from 'songbox/utils/parsers/chordpro';

module('Unit | Utility | parsers/chordpro', function() {
  //  describe('_parseChord', function(assert) {

  test('should parse one-letter chord', function(assert) {
    assert.expect(2);

    let chord = chordpro._parseChord('[C]');
    assert.equal(chord.source, '[C]');
    assert.equal(chord.value, 'C');
  });

  test('should parse multi-letter chord', function(assert) {
    let chord = chordpro._parseChord('[Cm]');

    assert.equal(chord.source, '[Cm]');
    assert.equal(chord.value, 'Cm');
  });

  test('should parse bass chord', function(assert) {
    let chord = chordpro._parseChord('[C/F]');

    assert.equal(chord.source, '[C/F]');
    assert.equal(chord.value, 'C/F');
  });

  test('should parse sharp chord', function(assert) {
    let chord = chordpro._parseChord('[C#]');

    assert.equal(chord.source, '[C#]');
    assert.equal(chord.value, 'C#');
  });

  test('should parse augmented chord', function(assert) {
    let chord = chordpro._parseChord('[G+]');

    assert.equal(chord.source, '[G+]');
    assert.equal(chord.value, 'G+');
  });

  test('should parse chord followed by whitespace', function(assert) {
    let chord = chordpro._parseChord('[C#] ');

    assert.equal(chord.source, '[C#]');
    assert.equal(chord.value, 'C#');
  });

  test('should parse chord followed by letters', function(assert) {
    let chord = chordpro._parseChord('[C#]one');

    assert.equal(chord.source, '[C#]');
    assert.equal(chord.value, 'C#');
  });

  test('should return undefined for non-chord', function(assert) {
    let chord = chordpro._parseChord('one');

    assert.equal(chord, undefined);
  });

  test('should return undefined for invalid characters in chord', function(assert) {
    let chord = chordpro._parseChord('[C!]');

    assert.equal(chord, undefined);
  });

  //  });

  //  describe('_parseDirective', function(assert) {

  test('should parse title directive', function(assert) {
    let directive = chordpro._parseDirective('{title: The Title}');

    assert.equal(directive.source, '{title: The Title}');
    assert.equal(directive.type, 'title');
    assert.equal(directive.value, 'The Title');
  });

  test('should parse abbreviated title directive', function(assert) {
    let directive = chordpro._parseDirective('{t: The Title}');

    assert.equal(directive.source, '{t: The Title}');
    assert.equal(directive.type, 'title');
    assert.equal(directive.value, 'The Title');
  });

  test('should parse subtitle directive', function(assert) {
    let directive = chordpro._parseDirective('{subtitle: The Subtitles}');

    assert.equal(directive.source, '{subtitle: The Subtitles}');
    assert.equal(directive.type, 'subtitle');
    assert.equal(directive.value, 'The Subtitles');
  });

  test('should parse abbreviated subtitle directive', function(assert) {
    let directive = chordpro._parseDirective('{st: The Subtitles}');

    assert.equal(directive.source, '{st: The Subtitles}');
    assert.equal(directive.type, 'subtitle');
    assert.equal(directive.value, 'The Subtitles');
  });

  test('should parse comment directive', function(assert) {
    let directive = chordpro._parseDirective('{c: this is a comment}');

    assert.equal(directive.source, '{c: this is a comment}');
    assert.equal(directive.type, 'comment');
    assert.equal(directive.value, 'this is a comment');
  });

  test('should parse directives with no value', function(assert) {
    let directive = chordpro._parseDirective('{soc}');

    assert.equal(directive.source, '{soc}');
    assert.equal(directive.type, 'soc');
    assert.equal(directive.value, '');
  });

  test('should return undefined for not directive', function(assert) {
    let directive = chordpro._parseDirective('not a directive');

    assert.equal(directive, undefined);
  });

  //  });

  //  describe('_parseWord', function(assert) {

  test('should parse word', function(assert) {
    let word = chordpro._parseWord("some words")

    assert.equal(word, "some");
  });

  test('should parse word', function(assert) {
    let word = chordpro._parseWord("[")

    assert.equal(word, "[");
  });

  test('should return empty for whitespace', function(assert) {
    let word = chordpro._parseWord(" some words")

    assert.equal(word, '');
  });

  test('should return undefined for chord', function(assert) {
    let word = chordpro._parseWord("[A]some words")

    assert.equal(word, undefined);
  });

  test('should return undefined for directive', function(assert) {
    let word = chordpro._parseWord("{soc}")

    assert.equal(word, undefined);
  });
  //  });

  //  describe('_parseWhitespace', function(assert) {

  test('should parse whitespace', function(assert) {
    let word = chordpro._parseWhitespace("   some words")

    assert.equal(word, '   ');
  });

  test('should return empty for word', function(assert) {
    let word = chordpro._parseWhitespace("some words")

    assert.equal(word, '');
  });

  test('should return empty for chord', function(assert) {
    let word = chordpro._parseWhitespace("[A]some words")

    assert.equal(word, '');
  });

  test('should return empty for directive', function(assert) {
    let word = chordpro._parseWhitespace("{soc}")

    assert.equal(word, '');
  });
  //  });

  //  describe('_parseLine', function(assert) {

  test('should parse usual mix of lyrics and chords', function(assert) {
    let parsedLine = chordpro._parseLine('[C]one [D]two');

    assert.equal(parsedLine.length, 3);
    assert.equal(parsedLine[0].lyrics, 'one');
    assert.equal(parsedLine[0].chord, 'C');
    assert.equal(parsedLine[0].directive, undefined);
    assert.equal(parsedLine[1].lyrics, ' ');
    assert.equal(parsedLine[1].chord, undefined);
    assert.equal(parsedLine[1].directive, undefined);
    assert.equal(parsedLine[2].lyrics, 'two');
    assert.equal(parsedLine[2].chord, 'D');
    assert.equal(parsedLine[2].directive, undefined);
  });

  test('should maintain whitespace at front of line', function(assert) {
    let parsedLine = chordpro._parseLine('   [C]one');

    assert.equal(parsedLine.length, 2);
    assert.equal(parsedLine[0].lyrics, '   ');
    assert.equal(parsedLine[0].chord, undefined);
    assert.equal(parsedLine[0].directive, undefined);
    assert.equal(parsedLine[1].lyrics, 'one');
    assert.equal(parsedLine[1].chord, 'C');
    assert.equal(parsedLine[1].directive, undefined);
  });

  test('should maintain whitespace before chords at end of line', function(assert) {
    let parsedLine = chordpro._parseLine('one   [C]   [D]');

    assert.equal(parsedLine.length, 4);
    assert.equal(parsedLine[0].lyrics, 'one');
    assert.equal(parsedLine[0].chord, undefined);
    assert.equal(parsedLine[1].lyrics, '   ');
    assert.equal(parsedLine[1].chord, undefined);
    assert.equal(parsedLine[2].lyrics, '   ');
    assert.equal(parsedLine[2].chord, 'C');
    assert.equal(parsedLine[3].lyrics, undefined);
    assert.equal(parsedLine[3].chord, 'D');
  });

  test('should parse two chords following each other', function(assert) {
    let parsedLine = chordpro._parseLine('[C][D]');

    assert.equal(parsedLine.length, 2);
    assert.equal(parsedLine[0].chord, 'C');
    assert.equal(parsedLine[1].chord, 'D');
  });

  test('should return empty string for empty line', function(assert) {
    let parsedLine = chordpro._parseLine('');

    assert.equal(parsedLine.length, 1);
    assert.equal(parsedLine[0].lyrics, '');
    assert.equal(parsedLine[0].chord, undefined);
  });

  test('should parse multiple value-less directives on one line', function(assert) {
    let parsedLine = chordpro._parseLine('{soh}some text{eoh}');

    assert.equal(parsedLine.length, 5);
    assert.equal(parsedLine[0].directive.type, 'soh');
    assert.equal(parsedLine[1].lyrics, 'some');
    assert.equal(parsedLine[2].lyrics, ' ');
    assert.equal(parsedLine[3].lyrics, 'text');
    assert.equal(parsedLine[4].directive.type, 'eoh');
  });

  test('should parse multiple valued directives on one line', function(assert) {
    let parsedLine = chordpro._parseLine('{c: comment1}some text{c: comment2}');

    assert.equal(parsedLine.length, 5);
    assert.equal(parsedLine[0].directive.type, 'comment');
    assert.equal(parsedLine[0].directive.value, 'comment1');
    assert.equal(parsedLine[1].lyrics, 'some');
    assert.equal(parsedLine[2].lyrics, ' ');
    assert.equal(parsedLine[3].lyrics, 'text');
    assert.equal(parsedLine[4].directive.type, 'comment');
    assert.equal(parsedLine[4].directive.value, 'comment2');
  });

  test('should allow colon in directive value', function(assert) {
    let parsedLine = chordpro._parseLine('{c: comment:}');

    assert.equal(parsedLine.length, 1);
    assert.equal(parsedLine[0].directive.type, 'comment');
    assert.equal(parsedLine[0].directive.value, 'comment:');
  });
  //  });

  //  describe('parse', function(assert) {

  test('should handle multiple lines', function(assert) {
    let parseResult = chordpro.parse('[C]one\n[D]two');

    assert.equal(parseResult.parsedLines.length, 2);
    assert.equal(parseResult.parsedLines[0][0].chord, 'C');
    assert.equal(parseResult.parsedLines[0][0].lyrics, 'one');
    assert.equal(parseResult.parsedLines[1][0].chord, 'D');
    assert.equal(parseResult.parsedLines[1][0].lyrics, 'two');
  });

  test('should ignore comments at beginning of line', function(assert) {
    let parseResult = chordpro.parse('one\n# comment\ntwo');

    assert.equal(parseResult.parsedLines.length, 2);
    assert.equal(parseResult.parsedLines[0][0].lyrics, 'one');
    assert.equal(parseResult.parsedLines[1][0].lyrics, 'two');
  });

  test('should ignore comments preceded by whitespace only', function(assert) {
    let parseResult = chordpro.parse('one\n   # comment\ntwo');

    assert.equal(parseResult.parsedLines.length, 2);
    assert.equal(parseResult.parsedLines[0][0].lyrics, 'one');
    assert.equal(parseResult.parsedLines[1][0].lyrics, 'two');
  });

  test('should maintain text as is between sot/eot', function(assert) {
    let parseResult = chordpro.parse('{sot}\n_ _ _ 1 _ _\n{eot}');

    assert.equal(parseResult.parsedLines.length, 3);
    assert.equal(parseResult.parsedLines[0][0].directive.type, 'sot');
    assert.equal(parseResult.parsedLines[1][0].lyrics, '_ _ _ 1 _ _');
    assert.equal(parseResult.parsedLines[2][0].directive.type, 'eot');
  });

  test('should return title when present', function(assert) {
    let parseResult = chordpro.parse('{t: The Title}');

    assert.equal(parseResult.title, 'The Title');
  });

  test('should return subtitle when present', function(assert) {
    let parseResult = chordpro.parse('{st: The Subtitles}');

    assert.equal(parseResult.subTitle, 'The Subtitles');
  });

  test('should return both title and subtitle when present', function(assert) {
    let parseResult = chordpro.parse('{t: The Title}\n{st: The Subtitles}');

    assert.equal(parseResult.title, 'The Title');
    assert.equal(parseResult.subTitle, 'The Subtitles');
  });
  //  });

  //  describe('format', function(assert) {

  test('should display title directive with proper class', function(assert) {
    let source = '{t: The Title}';

    let result = chordpro.format(source);
    assert.equal(result.html, '<span class="song-line"><span class="song-linesegment"><span class="song-title">The Title</span></span></span>');
  });

  test('should not add chord span if no chords on line', function(assert) {
    let source = 'Lyrics';

    let result = chordpro.format(source);
    assert.equal(result.html, '<span class="song-line"><span class="song-linesegment"><span class="song-lyrics">Lyrics</span></span></span>');
  });

  test('should add chord spans for all segments if there are chords on line', function(assert) {
    let source = 'Lyrics [C]here';

    let result = chordpro.format(source);
    assert.equal(result.html, '<span class="song-line"><span class="song-linesegment"><span class="song-chord"> </span><span class="song-lyrics">Lyrics</span></span><span class="song-linesegment"><span class="song-chord"> </span><span class="song-lyrics song-lyrics-whitespace"> </span></span><span class="song-linesegment"><span class="song-chord">C</span><span class="song-lyrics">here</span></span></span>');
  });

  test('should use spans with nolyrics class if only chords on a line', function(assert) {
    let source = '[Am7][B]';

    let result = chordpro.format(source);
    assert.equal(result.html, '<span class="song-line"><span class="song-linesegment"><span class="song-chord-nolyrics">Am7</span><span class="song-lyrics song-lyrics-whitespace"> </span></span><span class="song-linesegment"><span class="song-chord-nolyrics">B</span><span class="song-lyrics song-lyrics-whitespace"> </span></span></span>');
  });

  test('should use spans with nolyrics class on chords at end of a line', function(assert) {
    let source = 'one[A]    [B]';

    let result = chordpro.format(source);
    assert.equal(result.html, '<span class="song-line"><span class="song-linesegment"><span class="song-chord"> </span><span class="song-lyrics">one</span></span><span class="song-linesegment"><span class="song-chord-nolyrics">A</span><span class="song-lyrics song-lyrics-whitespace">    </span></span><span class="song-linesegment"><span class="song-chord-nolyrics">B</span><span class="song-lyrics song-lyrics-whitespace"> </span></span></span>');
  });

  test('should maintain empty lines', function(assert) {
    let source = 'line1\n\nline2';

    let result = chordpro.format(source);
    assert.equal(result.html, '<span class="song-line"><span class="song-linesegment"><span class="song-lyrics">line1</span></span></span><span class="song-line"><span class="song-linesegment"><span class="song-lyrics song-lyrics-whitespace"> </span></span></span><span class="song-line"><span class="song-linesegment"><span class="song-lyrics">line2</span></span></span>');
  });

  //  });
});
