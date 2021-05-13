/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *  
 */
import DataLayer from "./DataLayer.js";

function DataCanvas() {
  return {
    canvasInfo: {
      width: 300,
      height: 300,
      /////////////////////////////////////////////////
      //
      border_radius: 0,
      border_radius_unit: 'px',
      //
      border_width: 0,
      border_width_unit: 'px',
      border_type: 'solid',
      border_color: '#000',
      /////////////////////////////////////////////////
      filterList: []
    },
    activeLayer: null,
    activeSubData: null,
    bgColor: "#fff",
    layers: [
      new DataLayer()
    ]
  }
}

export default DataCanvas;
