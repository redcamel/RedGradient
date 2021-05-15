/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */

import DataColor from "./DataColor.js";
import GRADIENT_TYPE from "../GRADIENT_TYPE.js";
import ENDING_SHAPE_TYPE from "../ENDING_SHAPE_TYPE.js";

let uuid = 0;

function DataItem() {
  return {
    title: `gradient${uuid++}`,
    type: GRADIENT_TYPE.LINEAR,
    typeEndingShape: ENDING_SHAPE_TYPE.NONE,
    typeRepeat: 'repeat',
    blendMode: 'normal',
    deg: 90,
    visible: true,
    position: {x: 0, xUnit: '%', y: 0, yUnit: '%'},
    at: {x: 0, xUnit: '%', y: 0, yUnit: '%'},
    size: {w: 100, wUnit: '%', h: 100, hUnit: '%'},
    colorList: [
      new DataColor(`rgba(255, 255, 255, 1)`, 0, '%'),
      new DataColor(`rgba(255, 255, 255, 0.1)`, 100, '%')
    ]
  };
}

export default DataItem;
