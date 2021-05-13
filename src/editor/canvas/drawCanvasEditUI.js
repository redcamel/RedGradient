/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */

import RedNumber from "../../core/RedNumber.jsx";
import {ColorPicker} from '@easylogic/colorpicker';
import '@easylogic/colorpicker/dist/colorpicker.css';
import React from "react";

let colorPicker;

function drawCanvasEditUI() {

  const rootComponent = this.props.rootComponent;
  const rootComponentState = rootComponent.state;
  const canvasInfo = rootComponentState.canvasInfo;
  return <div style={style.container}>
    <div style={style.canvasResizer}>
      <RedNumber width={'60px'} value={canvasInfo.width} HD_onInput={e => {
        canvasInfo.width = e.target.value;
        rootComponent.setState({});
      }} />
      <RedNumber width={'60px'} value={canvasInfo.height} HD_onInput={e => {
        canvasInfo.height = e.target.value;
        rootComponent.setState({});
      }} />
    </div>
    <div style={{display: 'flex', alignItems: 'center'}}>
      배경색상
      <div
        className={rootComponentState.bgColor === 'transparent' ? 'transparent_checker' : ''}
        style={{
          display: 'inline-block',
          width: '25px',
          height: '25px',
          background: rootComponentState.bgColor === 'transparent' ? '' : rootComponentState.bgColor,
          borderRadius: '4px',
          marginRight: '10px',
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
  container: {
    padding: '4px',
    width: '200px'
  },
  canvasResizer: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 1,
    display: 'flex',
  },
  canvasViewInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: '4px',
    fontSize: '12px',
    zIndex: 1
  },
  toCenter: {
    padding: '3px 5px',
    background: '#5e7ade',
    color: '#fff',
    marginTop: '4px',
    borderRadius: '4px',
    border: 0,
    fontSize: '12px',
    outline: 'none',
    cursor: 'pointer'
  },
  toScale: {
    marginLeft: '4px',
    padding: '3px 5px',
    background: '#7235d4',
    color: '#fff',
    marginTop: '4px',
    borderRadius: '4px',
    border: 0,
    fontSize: '12px',
    outline: 'none',
    cursor: 'pointer'
  },
  presetButton: {
    background: 'linear-gradient(rgb(84, 84, 84), rgb(64, 63, 63))',
    border: '1px solid rgb(31, 31, 31)',
    outline: 'none',
    color: '#fff',
    fontSize: '12px',
    padding: '4px 8px',
    borderRadius: '4px',
    margin: '1px',
    cursor: 'pointer',
    boxShadow: `rgba(0, 0, 0, 0.25) 1px 1px 1px`
  }
};
