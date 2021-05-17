/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import DataItem from "./DataItem.js";

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
