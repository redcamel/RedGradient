function DataColor(color = 'rgba(255,255,255,1)', range = 0, rangeUnit = '%', useDivide = false, useDivideEnd = false) {
  return {color: color, colorEnd : color,rangeUnit: rangeUnit, range: range, useDivide: useDivide, useDivideEnd: useDivideEnd};
}

export default DataColor;
