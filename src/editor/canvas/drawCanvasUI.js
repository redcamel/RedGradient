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
import RED_CANVAS_PRESET from "./RED_CANVAS_PRESET.js";
import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faDesktop, faMobileAlt} from '@fortawesome/free-solid-svg-icons';

let colorPicker;

function drawCanvasUI() {

  const rootComponent = this.props.rootComponent;
  const rootComponentState = rootComponent.state;
  const canvasInfo = rootComponentState.canvasInfo;
  return <>
    <div style={style.canvasViewInfo}>
      <div>center : {this.state.canvasViewOffsetX},{this.state.canvasViewOffsetY} / canvasViewScale
        : {this.state.canvasViewScale}</div>
      <button style={style.toCenter} onClick={() => this.setState({canvasViewOffsetX: 0, canvasViewOffsetY: 0})}>set
        Center
      </button>
      <button style={style.toScale} onClick={() => this.setState({canvasViewScale: 1})}>setScale 1</button>
      <button style={style.toScale} onClick={() => this.setState({canvasViewScale: 0.5})}>setScale 0.5</button>
      <div style={{display: 'inline-block', marginLeft: '5px'}}>
        {
          RED_CANVAS_PRESET.map(v => {
            return <button
              style={style.presetButton}
              onClick={() => {
                canvasInfo.width = v.width;
                canvasInfo.height = v.height;
                rootComponent.setState({});
              }}
            >
              <div><FontAwesomeIcon
                icon={v['type'] === 'mobile' ? faMobileAlt : faDesktop} /> {v['title']}({v['width']}x{v['height']})
              </div>
            </button>;
          })
        }
      </div>
    </div>
    <div style={style.canvasResizer}>

      <div>
        그라데이션 영역 보기
        <input type={'checkbox'}
               checked={this.state.layerSizeView}
               style={{
                 display: 'inline-block',
                 width: '15px',
                 height: '15px',
                 background: rootComponentState.bgColor === 'transparent' ? '' : rootComponentState.bgColor,
                 borderRadius: '4px',
                 marginRight: '10px',
                 border: '1px solid #000',
                 cursor: 'pointer'
               }}
               onClick={() => this.setState({layerSizeView: !this.state.layerSizeView})}
        />
      </div>

    </div>
  </>;
}

export default drawCanvasUI;
const style = {
  canvasResizer: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 1
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
