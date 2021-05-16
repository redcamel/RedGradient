/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
const PresetBorder = {
  "title": "test",
  "type": "linear-gradient",
  "typeEndingShape": "none",
  "typeRepeat": "repeat",
  "blendMode": "normal",
  "deg": 90,
  "visible": true,
  "position": {"x": 0, "xUnit": "%", "y": 0, "yUnit": "%"},
  "at": {"x": 0, "xUnit": "%", "y": 0, "yUnit": "%"},
  "size": {"w": 100, "wUnit": "%", "h": 100, "hUnit": "%"},
  "colorList": [{
    "color": "rgba(255,255,0,1)",
    "colorEnd": "rgba(255, 255, 255, 1)",
    "rangeUnit": "%",
    "range": 0,
    "useDivide": false,
    "useDivideEnd": false,
    "rangeEnd": 0
  }, {
    "color": "rgba(0,255,0,1)",
    "colorEnd": "rgba(255, 255, 255, 0.1)",
    "rangeUnit": "%",
    "range": 50,
    "useDivide": false,
    "useDivideEnd": false,
    "rangeEnd": 50
  }]
}
export default PresetBorder
