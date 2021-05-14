/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import drawCanvasEditUI from "./drawCanvasEditUI";
import RedTitle from "../../../core/RedTitle";
import RedCanvasBorderRadiusEdit from "./property/RedCanvasBorderRadiusEdit.jsx";
import RedCanvasFilterList from "./filter/RedCanvasFilterList.jsx";
import RedCanvasBorderEdit from "./property/RedCanvasBorderEdit.jsx";
import RedCanvasSizeEdit from "./property/RedCanvasSizeEdit.jsx";
import RedCanvasOutlineEdit from "./property/RedCanvasOutlineEdit";

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
    const rootComponent = this.props.rootComponent
    return <div>
      <RedTitle title={'Container Property'}/>
      <div style={style.container}>
        {this.drawCanvasEditUI()}

        <div style={style.divide}/>
        <RedCanvasOutlineEdit rootComponent={rootComponent}/>
        <div style={style.divide}/>
        <RedCanvasBorderEdit rootComponent={rootComponent}/>
        <div style={style.divide}/>
        <RedCanvasBorderRadiusEdit rootComponent={rootComponent}/>
        <div style={style.divide}/>
        <RedCanvasFilterList rootComponent={rootComponent}/>
        <div style={style.divide}/>
      </div>
    </div>;
  }
}

export default RedCanvasEdit;
const style = {
  container: {
    width: '220px',
    padding: '4px'
  },
  divide: {
    margin: '5px 0px',
    height: '2px',
    background: '#4e4e4e',
    borderTop: '1px solid #000'
  }
};
