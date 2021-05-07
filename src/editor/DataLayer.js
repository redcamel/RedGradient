import DataItem from "./DataItem";

function DataLayer() {
  return {
    title: 'undefined',
    visible: true,
    size: {w: 100, wUnit: '%', h: 100, hUnit: '%'},
    items: [new DataItem()]
  };
}

export default DataLayer;
