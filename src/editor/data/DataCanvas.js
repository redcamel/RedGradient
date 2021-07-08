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
      left: 0,
      top: 0,
      /////////////////////////////////////////////////
      //
      box_sizing: 'border-box',
      //
      border_radius: 0,
      border_radius_unit: 'px',
      //
      border_width: 0,
      border_width_unit: 'px',
      border_type: 'solid',
      border_color: '#000',
      //
      outline_width: 0,
      outline_width_unit: 'px',
      outline_type: 'solid',
      outline_color: '#000',
      outline_offset: 0,
      outline_offset_unit: 'px',
      /////////////////////////////////////////////////
      filterList: []
    },
    activeLayerIndex: 0,
    activeSubDataIndex: 0,
    activeLayer: null,
    activeSubData: null,
    bgColor: "transparent",
    layers: [
      new DataLayer()
    ]
  };
}

export default DataCanvas;
