const PresetCircle2 = function() {
  return {
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
        "color": "rgba(255,0,0,0.9)",
        "rangeUnit": "%",
        "range": 25,
        "useDivide": false
      },
      {
        "color": "rgb(0,24,255)",
        "rangeUnit": "%",
        "range": 37.5,
        "useDivide": true
      },
      {
        "color": "rgba(0,24,255,0)",
        "rangeUnit": "%",
        "range": 100,
        "useDivide": false
      }
    ]
  }
};
export default PresetCircle2
