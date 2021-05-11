import DataColor from "./DataColor";
import GRADIENT_TYPE from "./GRADIENT_TYPE";

let uuid = 0;

function DataItem() {
  return {
    title: `gradient${uuid++}`,
    type: GRADIENT_TYPE.LINEAR,
    typeEndingShape: 'linear-gradient',
    typeRepeat: 'repeat',
    deg: 90,
    visible: true,
    position: {x: 0, xUnit: '%', y: 0, yUnit: '%'},
    at: {x: 0, xUnit: '%', y: 0, yUnit: '%'},
    size: {w: 100, wUnit: '%', h: 100, hUnit: '%'},
    colorList: [
      new DataColor(`rgba(255,255,255,1)`,0,'%'),
      new DataColor(`rgba(255,255,255,0.1)`,100,'%')
    ]
  };
}

export default DataItem;
