/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import drawCanvasUI from "./drawCanvasUI.js";
import GRADIENT_TYPE from "../GRADIENT_TYPE";
import CALC_GRADIENT from "../CALC_GRADIENT";
import RedCanvasFilter from "./edit/filter/RedCanvasFlterItem.jsx";

class RedCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasMoveState: false,
      canvasViewOffsetX: 0,
      canvasViewOffsetY: 0,
      canvasViewScale: 1,
      layerSizeView: true,
      canvasBgColorPickerOpenYn: false
    };
    this.refColorPickerContainer = React.createRef();
  }


  draw_canvasUI = drawCanvasUI;

  drawCall(canvasInfo, layers, bgColor) {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    const activeSubDataPosition = activeSubData['position'];
    const activeSubDataAt = activeSubData['at'];
    const activeSubDataSize = activeSubData['size'];
    const borderGradientInfo = rootComponentState.borderGradientInfo
    const layoutSize = {
      w: activeSubDataSize['wUnit'] === '%' ? canvasInfo['width'] * activeSubDataSize['w'] / 100 : activeSubDataSize['w'],
      h: activeSubDataSize['hUnit'] === '%' ? canvasInfo['height'] * activeSubDataSize['h'] / 100 : activeSubDataSize['h'],
    };
    const lX = activeSubDataAt['xUnit'] === 'px' ? `${activeSubDataAt['x']}${activeSubDataAt['xUnit']}` : `${layoutSize['w'] * activeSubDataAt['x'] / 100}px`;
    const lY = activeSubDataAt['yUnit'] === 'px' ? `${activeSubDataAt['y']}${activeSubDataAt['yUnit']}` : `${layoutSize['h'] * activeSubDataAt['y'] / 100}px`;
    return <div style={{
      ...style.canvas,
      transform: `translate(calc(-50% + ${this.state.canvasViewOffsetX}px),calc(-50% + ${this.state.canvasViewOffsetY}px)) scale(${this.state.canvasViewScale})`
    }} className={'transparent_checker'}>
      <div
        className={'transparent_checker'}
        style={{
          width: `${canvasInfo.width}px`, height: `${canvasInfo.height}px`,
          background: CALC_GRADIENT.calcGradients(layers, true, bgColor),
          backgroundBlendMode: CALC_GRADIENT.calcBlendMode(layers),
          transition: 'width 0.2s, height 0.2s',
          ...RedCanvas.getContainerCss(canvasInfo,borderGradientInfo),
          filter: RedCanvas.getFilterCss(canvasInfo['filterList']),
          overflow: 'hidden',
        }}
      />
      {/*<div style={{position : 'absolute',top:'50%',left : '50%',transform : 'translate(-50%,-50%)'}}>RedGradient</div>*/}
      {
        this.state.layerSizeView ? <div
          style={{
            position: 'absolute',
            left: `${activeSubDataPosition['x']}${activeSubDataPosition['xUnit']}`,
            top: `${activeSubDataPosition['y']}${activeSubDataPosition['yUnit']}`,
            width: `${layoutSize['w']}px`,
            height: `${layoutSize['h']}px`,
            border: '1px dashed #000',
            color: '#000'
          }}
        >
          {activeSubData['title']}
          {
            activeSubData['type'] === GRADIENT_TYPE.RADIAL ||
            activeSubData['type'] === GRADIENT_TYPE.REPEAT_RADIAL ||
            activeSubData['type'] === GRADIENT_TYPE.CONIC
              ? <>
                <div
                  style={{
                    position: 'absolute',
                    left: lX,
                    top: lY,
                    width: `${canvasInfo['width']}px`,
                    height: `${canvasInfo['height']}px`,
                    border: '1px dashed rgba(0,0,0,0.25)',
                    color: '#000'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: lX,
                    top: lY,
                    width: `10px`,
                    height: `10px`,
                    borderRadius: '50%',
                    background: 'red',
                    transform: 'translate(-50%,-50%)',
                    color: '#000'
                  }}
                />
              </> : ''
          }
        </div> : ''
      }


    </div>;
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    const layers = rootComponentState.layers;
    const activeLayer = rootComponentState.activeLayer;
    return <div
      style={style.container}
      onMouseMove={e => {
        if (this.state.useMove) {
          e = e.nativeEvent;
          style.canvas.transition = '';
          this.setState({
            canvasViewOffsetX: this.state.canvasViewOffsetX + e.movementX,
            canvasViewOffsetY: this.state.canvasViewOffsetY + e.movementY
          });
          document.body.style.cursor = 'move';
          console.log(e);
        }
      }}
      onMouseLeave={() => this.state.useMove ? this.setState({useMove: false}) : 0}
      onMouseUp={() => this.state.useMove ? (this.setState({useMove: false}), document.body.style.cursor = 'default') : 0}
      onMouseDown={e => e.nativeEvent.button === 1 ? this.setState({useMove: true}) : 0}
      onWheel={e => {
        let t0 = this.state.canvasViewScale - e.nativeEvent.deltaY / 1000;
        if (t0 < 0) t0 = 0.01;
        this.setState({canvasViewScale: t0});
        style.canvas.transition = 'transform 0.1s';
      }}
    >
      {this.draw_canvasUI()}
      {this.drawCall(canvasInfo, layers, rootComponentState.bgColor, activeLayer)}
    </div>;
  }
}

export default RedCanvas;
RedCanvas.getFilterCss = (filterList) => {
  // console.log(filterList.map(v=>RedCanvasFilter.FILTER_COMPONENT_MAP[v['type']].getCss(v)).join(','))
  return filterList.map(v => RedCanvasFilter.FILTER_COMPONENT_MAP[v['type']].getCss(v)).join(' ');
};
RedCanvas.getContainerCss = (canvasInfo,borderGradientInfo) => {
  let borderData={}
  if (!canvasInfo.hasOwnProperty('border_radius')) {
    canvasInfo['border_radius'] = 0;
    canvasInfo['border_radius_unit'] = 'px';
  }
  if (!canvasInfo.hasOwnProperty('border_width')) {
    canvasInfo['border_width'] = 0;
    canvasInfo['border_width_unit'] = 'px';
    canvasInfo['border_type'] = 'solid';
    canvasInfo['border_color'] = '#000';
  }
  if(canvasInfo.borderIsGradientMode){
    let gradient = CALC_GRADIENT.calcGradients(borderGradientInfo['layers'])
    gradient = gradient.split(')')
    gradient.pop()
    gradient = gradient.join(')')+')'
    borderData = {
      borderImageWidth : `${canvasInfo['border_width']}${canvasInfo['border_width_unit']}`,
      borderStyle : canvasInfo['border_type'],
      borderImageSlice : `${borderGradientInfo['border_image_sliceT']} ${borderGradientInfo['border_image_sliceR']} ${borderGradientInfo['border_image_sliceB']} ${borderGradientInfo['border_image_sliceL']}`,

      borderImageSource :gradient,
      borderImageRepeat  :borderGradientInfo['border_image_repeat'],
      borderImageOutset  :borderGradientInfo['border_image_outset'],
    }

  }else{
    borderData = {
      borderWidth : `${canvasInfo['border_width']}${canvasInfo['border_width_unit']}`,
      borderStyle : `${canvasInfo['border_type']}`,
      borderColor : `${canvasInfo['border_color']}`
    }
  }
  console.log(borderData)
  if (!canvasInfo.hasOwnProperty('outline_width')) {
    canvasInfo['outline_width'] = 0;
    canvasInfo['outline_width_unit'] = 'px';
    canvasInfo['outline_type'] = 'solid';
    canvasInfo['outline_color'] = '#000';
    canvasInfo['outline_offset'] = 0;
    canvasInfo['outline_offset_unit'] = 'px';
  }

  return {
    boxSizing : canvasInfo['box_sizing'],
    borderRadius: `${canvasInfo['border_radius']}${canvasInfo['border_radius_unit']}`,
    ...borderData,
    outline: `${canvasInfo['outline_width']}${canvasInfo['outline_width_unit']} ${canvasInfo['outline_type']} ${canvasInfo['outline_color']}`,
    outlineOffset: `${canvasInfo['outline_offset']}${canvasInfo['outline_offset_unit']}`
  };
};
const style = {
  container: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    overflow: 'hidden'
  },
  canvas: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    // overflow: 'hidden',
    transition: 'transform 0.01s'
  },
  itemContainer: {
    whiteSpace: 'nowrap'
  }
};
