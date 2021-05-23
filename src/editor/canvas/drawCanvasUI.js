/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import '@easylogic/colorpicker/dist/colorpicker.css';
import React from "react";
import RedTitle from "../../core/RedTitle";
import RedCanvasSizeEdit from "./edit/property/RedCanvasSizeEdit";
import RED_CANVAS_PRESET from "../../RED_CANVAS_PRESET.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDesktop, faMobileAlt} from "@fortawesome/free-solid-svg-icons";

function drawCanvasUI() {
  const rootComponent = this.props.rootComponent;
  const rootComponentState = rootComponent.state;
  const canvasInfo = rootComponentState.canvasInfo;
  return <div style={style.container}>
    <RedTitle title={'Container Information'}/>


    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div style={style.canvasResizer}>
        <RedCanvasSizeEdit rootComponent={rootComponent} canvasComponent={this}/>
        <div>
          <label style={{
            marginLeft: '5px',
            background: 'linear-gradient(rgb(94, 122, 222), rgb(58, 73, 125))',
            display: 'flex',
            borderRadius: '6px',
            padding: '5px 10px',
            whiteSpace: 'nowrap',
            cursor: 'pointer'
          }}>
            View Gradient Edit Area
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
                     cursor: 'pointer',
                     marginLeft: '5px'
                   }}
                   onClick={() => this.setState({layerSizeView: !this.state.layerSizeView})}
            />
          </label>
        </div>

      </div>
      <div style={style.canvasViewInfo}>
        <div style={{marginRight: '5px',color:'#696969'}}>Center : {this.state.canvasViewOffsetX},{this.state.canvasViewOffsetY} /
          ViewScale : {this.state.canvasViewScale}</div>
        <div style={style.toCenter} onClick={() => this.setState({canvasViewOffsetX: 0, canvasViewOffsetY: 0})}>set
          Center
        </div>
        <div style={style.toScale} onClick={() => this.setState({canvasViewScale: 1})}>setScale 1x</div>
        <div style={style.toScale} onClick={() => this.setState({canvasViewScale: 0.5})}>setScale 0.5x</div>
      </div>
    </div>
    <div style={{display: 'inline-block', margin: '0px 10px 8px 10px'}}>
      {
        RED_CANVAS_PRESET.map(v => {
          return <button
            style={style.presetButton}
            onClick={() => {
              canvasInfo.width = v.width;
              canvasInfo.height = v.height;
              rootComponent.updateRootState({});
            }}
          >
            <div><FontAwesomeIcon icon={v['type'] === 'mobile' ? faMobileAlt : faDesktop}/> {v['title']}({v['width']}x{v['height']})
            </div>
          </button>;
        })
      }
    </div>
  </div>;
}

export default drawCanvasUI;
const style = {
  container: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 1,
    background: '#2d2d2d',
    boxShadow: '0px 10px 10px rgba(0,0,0,0.16)',
    borderBottom: '1px solid #111'
  },
  canvasResizer: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
  },
  canvasViewInfo: {
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
    fontSize: '12px',
    textAlign: 'right'
  },
  toCenter: {
    background: '#5e7ade',
    display: 'flex',
    borderRadius: '6px',
    padding: '5px 10px',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    outline: 'none',
    border:0,
    color : '#fff'
  },
  toScale: {
    marginLeft: '4px',
    background: '#7235d4',
    display: 'flex',
    borderRadius: '6px',
    padding: '5px 10px',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    outline: 'none',
    border:0,
    color : '#fff'
  },
  presetButton: {
    background: 'linear-gradient(rgb(84, 84, 84), rgb(64, 63, 63))',
    border: '1px solid rgb(31, 31, 31)',
    outline: 'none',
    color: '#fff',
    fontSize: '11px',
    padding: '4px 8px',
    borderRadius: '4px',
    margin: '1px',
    cursor: 'pointer',
    boxShadow: `rgba(0, 0, 0, 0.25) 1px 1px 1px`
  }
};
