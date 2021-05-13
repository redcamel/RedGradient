/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */

import React from "react";
import drawCanvasEditUI from "./drawCanvasEditUI";
import RedTitle from "../../core/RedTitle";

class RedCanvasEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layerSizeView: true,
      canvasBgColorPickerOpenYn: false
    };
    this.refColorPickerContainer = React.createRef();
  }

  drawCanvasEditUI = drawCanvasEditUI;
  render() {
    return <div style={style.container}>
      <RedTitle title={'Container Property'} />
      {this.drawCanvasEditUI()}
    </div>;
  }
}

export default RedCanvasEdit;
const style = {
  container: {
  }
};
