/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */

const PresetCircle = {
  "title": "test",
  "type": "radial-gradient",
  "typeRepeat": "no-repeat",
  "typeEndingShape": "none",
  "blendMode": "normal",
  "deg": 45,
  "visible": true,
  "position": {
    "x": 0,
    "xUnit": "px",
    "y": 0,
    "yUnit": "px"
  },
  "at": {
    "x": "50",
    "xUnit": "%",
    "y": "50",
    "yUnit": "%"
  },
  "size": {
    "w": "100",
    "wUnit": "%",
    "h": "100",
    "hUnit": "%"
  },
  "colorList": [
    {
      "color": "rgba(255,255,0,0.9)",
      "rangeUnit": "%",
      "range": 25,
      "useDivide": false
    },
    {
      "color": "rgba(255,0,0,0.5)",
      "rangeUnit": "%",
      "range": 55,
      "useDivide": false
    },
    {
      "color": "transparent",
      "rangeUnit": "%",
      "range": 75,
      "useDivide": false
    },
    {
      "color": "transparent",
      "rangeUnit": "%",
      "range": 100,
      "useDivide": false
    }
  ]
};
export default PresetCircle
