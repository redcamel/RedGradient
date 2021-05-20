/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
function DataColor(color = 'rgba(255,255,255,1)', range = 0, rangeUnit = '%', useDivide = false, useDivideEnd = false,useRange=false,rangeEnd = 0, ) {
  return {
    color: color,
    colorEnd: color,
    rangeUnit: rangeUnit,
    range: range,
    rangeEnd : rangeEnd || range,
    useDivide: useDivide,
    useDivideEnd: useDivideEnd,
    useRange : useRange
  };
}

export default DataColor;
