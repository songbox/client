import { htmlSafe } from 'ember-string';
import makeHelper from 'ember-svg-jar/utils/make-helper';
import makeSVG from 'ember-svg-jar/utils/make-svg';
import inlineAssets from '../inline-assets';

export function svgIcon(assetId, svgAttrs = {}) {
  svgAttrs.class = 'icon';
  return htmlSafe(makeSVG(assetId, svgAttrs, inlineAssets));
}

export default makeHelper(svgIcon);
