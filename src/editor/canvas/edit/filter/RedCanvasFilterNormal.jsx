/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";

class RedCanvasFilterNormal extends React.Component {
  constructor(props) {
    super(props);
  }

  getCss(filterData) {
    return RedCanvasFilterNormal.getCss(filterData)
  }

  render() {
    return ''
  }
}

RedCanvasFilterNormal.getCss = () => ''
RedCanvasFilterNormal.getNewDataValues = () => {
  return {}
}
export default RedCanvasFilterNormal;
