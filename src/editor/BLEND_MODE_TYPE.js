const modes = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity',];

const BLEND_MODE_TYPE = modes.reduce((acc, cur) => {
  acc[cur.toUpperCase()] = cur;
  return acc;
}, {});
console.log(BLEND_MODE_TYPE);
export default BLEND_MODE_TYPE;
