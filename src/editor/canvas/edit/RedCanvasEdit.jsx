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
import RedCanvasFilterList from "./filter/RedCanvasFilterList.jsx";
import RedCanvasBorderModeEdit from "./property/RedCanvasBorderModeEdit.jsx";
import RedCanvasOutlineEdit from "./property/RedCanvasOutlineEdit";
import RedCanvasBorderModeGradientEdit from "./property/RedCanvasBorderModeGradientEdit.jsx";
import RedCanvasBorderGradientFrame from "./property/RedCanvasBorderGradientFrame.jsx";

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
    const canvasInfo = rootComponent.state.canvasInfo
    return <div>
      <RedTitle title={'Container Property'}/>
      <div style={style.container}>
        {this.drawCanvasEditUI()}

        <div style={style.divide}/>
        <RedCanvasOutlineEdit rootComponent={rootComponent}/>
        <div style={style.divide}/>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          border
          <div style={{
            display: 'flex',
            borderRadius: '4px',
            border: '1px solid #000',
            fontSize: '11px',
            marginRight: '4px',
            overflow: 'hidden'
          }}>

            <div
              onClick={e => {
                canvasInfo.borderIsGradientMode = false
                rootComponent.updateRootState()
              }}
              style={{...style.mode, background: canvasInfo.borderIsGradientMode ? '#2f2f2f' : '#5e7ade'}}>basic
            </div>
            <div
              onClick={e => {
                canvasInfo.borderIsGradientMode = true
                rootComponent.updateRootState()
              }}
              style={{
                ...style.mode,
                borderLeft: '1px solid #000',
                background: canvasInfo.borderIsGradientMode ? '#5e7ade' : '#2f2f2f'
              }}>gradient
            </div>
          </div>
        </div>
        <div style={{
          marginTop : '5px',
          borderRadius: '4px',
          border: '1px solid #000',
          padding: '10px 6px',
        }}>
          <div style={{display: canvasInfo.borderIsGradientMode ? 'none' : 'block'}}><RedCanvasBorderModeEdit
            rootComponent={rootComponent}/></div>
          <div style={{display: canvasInfo.borderIsGradientMode ? 'block' : 'none'}}><RedCanvasBorderModeGradientEdit
            rootComponent={rootComponent}/>
            {canvasInfo.borderIsGradientMode ? <RedCanvasBorderGradientFrame rootComponent={rootComponent}/> : ''}
          </div>
        </div>



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
   width: '360px',
    padding: '4px'
  },
  divide: {
    margin: '5px 0px',
    height: '2px',
    background: '#4e4e4e',
    borderTop: '1px solid #000'
  },
  mode: {
    padding: '2px 5px',
    cursor: 'pointer',
  }
};
