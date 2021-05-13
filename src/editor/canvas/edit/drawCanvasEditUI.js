/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */

import RedNumber from "../../../core/RedNumber.jsx";
import {ColorPicker} from '@easylogic/colorpicker';
import '@easylogic/colorpicker/dist/colorpicker.css';
import React from "react";

let colorPicker;

function drawCanvasEditUI() {
  const rootComponent = this.props.rootComponent;
  const rootComponentState = rootComponent.state;
  const canvasInfo = rootComponentState.canvasInfo;
  return <div >
    <div style={style.canvasResizer}>

    </div>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      background
      <div
        className={rootComponentState.bgColor === 'transparent' ? 'transparent_checker' : ''}
        style={{
          display: 'inline-block',
          width: '25px',
          height: '25px',
          background: rootComponentState.bgColor === 'transparent' ? '' : rootComponentState.bgColor,
          borderRadius: '4px',
          border: '1px solid #000',
          cursor: 'pointer'
        }}
        onClick={() => {
          this.setState({canvasBgColorPickerOpenYn: true});
          if (!colorPicker) {
            colorPicker = new ColorPicker({
              type: "sketch",
              position: 'inline',
              color: rootComponentState.bgColor,
              container: this.refColorPickerContainer.current,
              onChange: color => rootComponent.setState({bgColor: color})
            });
          }
          colorPicker.setOption({color: rootComponentState.bgColor});
        }}
      />

      <div style={{
        zIndex: 1, position: 'absolute', top: 0, left: '0%', transform: 'translate(16px , 0px)',
        boxShadow: '0px 0px 16px rgba(0,0,0,0.16)',
        background: '#fff',
        borderRadius: '8px',
        overflow: 'hidden',
        display: this.state.canvasBgColorPickerOpenYn ? 'block' : 'none'
      }}>
        <div ref={this.refColorPickerContainer} />
        <div
          style={{padding: '4px', background: '#5e7ade', cursor: 'pointer', textAlign: 'center'}}
          onClick={() => {
            this.setState({canvasBgColorPickerOpenYn: null});
          }}
        >완료
        </div>
      </div>

    </div>
  </div>;
}

export default drawCanvasEditUI;
const style = {
  canvasResizer: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 1,
    display: 'flex',
  }
};
