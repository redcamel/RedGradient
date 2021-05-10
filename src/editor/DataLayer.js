import DataItem from "./DataItem";

let uuid = 0;

function DataLayer() {
  return {
    title: `layer${uuid++}`,
    visible: true,
    openYn: true,
    items: [new DataItem()]
  };
}

export default DataLayer;
