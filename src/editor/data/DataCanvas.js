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
      filterList: [
        {
          type : 'blur',
          values : {
            amount  : 10
          },
          css : ''
        }
      ]
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
