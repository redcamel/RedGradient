import DataItem from "./DataItem";

let uuid = 0;

function DataLayer() {
  return {
    title: `layer${uuid++}`,
    visible: true,
    openYn : true,
    size: {w: 100, wUnit: '%', h: 100, hUnit: '%'},
    items: [new DataItem()]
  };
}

export default DataLayer;
