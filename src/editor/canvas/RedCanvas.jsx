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

// TODO - 정리필요
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
    const borderGradientInfo = rootComponentState.borderGradientInfo;
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
          ...RedCanvas.getContainerCss(canvasInfo, borderGradientInfo),
          filter: RedCanvas.getFilterCss(canvasInfo['filterList']),
          overflow: 'hidden',
        }}
      />
      {/*<div style={{position : 'absolute',top:'50%',left : '50%',transform : 'translate(-50%,-50%)'}}>RedGradient</div>*/}
      {
        this.state.layerSizeView ? <div
          style={{
            position: 'absolute',
            left: activeSubDataPosition['xUnit'] === '%' ? (canvasInfo.width - layoutSize.w) * (activeSubDataPosition['x'] / 100) + 'px' : `${activeSubDataPosition['x']}${activeSubDataPosition['xUnit']}`,
            top: activeSubDataPosition['yUnit'] === '%' ? (canvasInfo.height - layoutSize.h) * (activeSubDataPosition['y'] / 100) + 'px' : `${activeSubDataPosition['y']}${activeSubDataPosition['yUnit']}`,
            width: `${layoutSize['w']}px`,
            height: `${layoutSize['h']}px`,
            border: '1px dashed #000',
            color: '#000'
          }}
        >
          <>
            <div
              style={{
                top: 0, left: 0, transform: 'translate(-100%, -100%)',
                position: 'absolute', width: '20px', height: '20px',
                cursor: 'nw-resize',
                borderTop: '6px solid #5e7ade',
                borderLeft: '6px solid #5e7ade'
              }}
              onMouseDown={e => {
                e.stopPropagation();
                this.setModes({
                  resizeMode: {
                    mode: 'nw',
                    startX: e.nativeEvent.pageX,
                    startY: e.nativeEvent.pageY
                  }
                });

              }}
            />
            <div
              style={{
                top: 0, right: 0, transform: 'translate(100%, -100%)',
                position: 'absolute', width: '20px', height: '20px',
                cursor: 'ne-resize',
                borderTop: '6px solid #5e7ade',
                borderRight: '6px solid #5e7ade'
              }}
              onMouseDown={e => {
                e.stopPropagation();
                this.setModes({
                  resizeMode: {
                    mode: 'ne',
                    startX: e.nativeEvent.pageX,
                    startY: e.nativeEvent.pageY
                  }
                });
              }}
            />
            <div
              style={{
                bottom: 0, left: 0, transform: 'translate(-100%, 100%)',
                position: 'absolute', width: '20px', height: '20px',
                cursor: 'sw-resize',
                borderBottom: '6px solid #5e7ade',
                borderLeft: '6px solid #5e7ade'
              }}
              onMouseDown={e => {
                e.stopPropagation();
                this.setModes({
                  resizeMode: {
                    mode: 'sw',
                    startX: e.nativeEvent.pageX,
                    startY: e.nativeEvent.pageY
                  }
                });
              }}
            />
            <div
              style={{
                bottom: 0, right: 0, transform: 'translate(100%, 100%)',
                position: 'absolute', width: '20px', height: '20px',
                cursor: 'se-resize',
                borderBottom: '6px solid #5e7ade',
                borderRight: '6px solid #5e7ade'
              }}
              onMouseDown={e => {
                e.stopPropagation();
                this.setModes({
                  resizeMode: {
                    mode: 'se',
                    startX: e.nativeEvent.pageX,
                    startY: e.nativeEvent.pageY
                  }
                });
              }}
            />
          </>

          {activeSubData['title']}
          {
            activeSubData['type'] === GRADIENT_TYPE.RADIAL ||
            activeSubData['type'] === GRADIENT_TYPE.REPEAT_RADIAL ||
            activeSubData['type'] === GRADIENT_TYPE.CONIC ||
            activeSubData['type'] === GRADIENT_TYPE.REPEAT_CONIC
              ? <>
                <div
                  style={{
                    position: 'absolute',
                    left: lX,
                    top: lY,
                    width: `50px`,
                    height: `50px`,
                    border: '1px dashed rgba(0,0,0,0.5)',
                    borderRadius: '50%',
                    transform: 'translate(-50%,-50%)',
                    color: '#000',
                    cursor: 'move'
                  }}
                  onMouseDown={e => {
                    e.stopPropagation();
                    this.setModes({
                      atMode: {
                        startValueX: activeSubData['at']['x'],
                        startValueY: activeSubData['at']['y'],
                        startX: e.nativeEvent.pageX, startY: e.nativeEvent.pageY
                      }
                    });
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: '50%',
                      width: `10px`,
                      height: `10px`,
                      borderRadius: '50%',
                      background: 'red',
                      transform: 'translate(-50%,-50%)',
                      color: '#000'
                    }}
                  />
                </div>
              </> : ''
          }
          {
            activeSubData['type'] === GRADIENT_TYPE.RADIAL ||
            activeSubData['type'] === GRADIENT_TYPE.REPEAT_RADIAL
              ? '' : <>
                <div
                  style={{
                    top: 0, left: 0, transform: 'translate(-150%, -150%) rotate(0deg)',
                    position: 'absolute', width: '30px', height: '30px', borderRadius: '50%',
                    cursor: 'pointer',
                    background: 'url(./object_rotate_right.png)',
                    backgroundSize: 'contain'
                  }}
                  onMouseDown={e => {
                    e.stopPropagation();
                    this.setModes({degreeMode: {startX: e.nativeEvent.pageX, startY: e.nativeEvent.pageY}});
                  }}
                />
                <div
                  style={{
                    top: 0, right: 0, transform: 'translate(150%, -150%) rotate(90deg)',
                    position: 'absolute', width: '30px', height: '30px', borderRadius: '50%',
                    cursor: 'pointer',
                    background: 'url(./object_rotate_right.png)',
                    backgroundSize: 'contain'
                  }}
                  onMouseDown={e => {
                    e.stopPropagation();
                    this.setModes({degreeMode: {startX: e.nativeEvent.pageX, startY: e.nativeEvent.pageY}});
                  }}
                />
                <div
                  style={{
                    bottom: 0, left: 0, transform: 'translate(-150%, 150%) rotate(180deg)',
                    position: 'absolute', width: '30px', height: '30px', borderRadius: '50%',
                    cursor: 'pointer',
                    background: 'url(./object_rotate_right.png)',
                    backgroundSize: 'contain'
                  }}
                  onMouseDown={e => {
                    e.stopPropagation();
                    this.setModes({degreeMode: {startX: e.nativeEvent.pageX, startY: e.nativeEvent.pageY}});
                  }}
                />
                <div
                  style={{
                    bottom: 0, right: 0, transform: 'translate(150%, 150%) rotate(270deg)',
                    position: 'absolute', width: '30px', height: '30px', borderRadius: '50%',
                    cursor: 'pointer',
                    background: 'url(./object_rotate_right.png)',
                    backgroundSize: 'contain'
                  }}
                  onMouseDown={e => {
                    e.stopPropagation();
                    this.setModes({degreeMode: {startX: e.nativeEvent.pageX, startY: e.nativeEvent.pageY}});
                  }}
                />
              </>
          }
        </div> : ''
      }


    </div>;
  }

  setModes(v = {}) {
    this.state.useMove = false;
    this.state.resizeMode = false;
    this.state.degreeMode = false;
    this.state.atMode = false;
    this.setState(v);
  }

  checkResize(e) {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;

    const activeSubData = rootComponentState.activeSubData;
    if (this.state.resizeMode) {
      e = e.nativeEvent;
      style.canvas.transition = '';
      const gapX = e.pageX - this.state.resizeMode['startX'];
      const gapY = e.pageY - this.state.resizeMode['startY'];
      this.state.resizeMode['startX'] = e.pageX;
      this.state.resizeMode['startY'] = e.pageY;
      const sizeInfo = activeSubData['size'];
      const positionInfo = activeSubData['position'];
      const tW = sizeInfo['wUnit'] === '%' ? canvasInfo.width * sizeInfo['w'] / 100 : sizeInfo['w'];
      const tH = sizeInfo['hUnit'] === '%' ? canvasInfo.height * sizeInfo['h'] / 100 : sizeInfo['h'];
      const tPx = positionInfo['xUnit'] === '%' ? canvasInfo.width * positionInfo['x'] / 100 : positionInfo['x'];
      const tPy = positionInfo['yUnit'] === '%' ? canvasInfo.height * positionInfo['y'] / 100 : positionInfo['y'];
      const mode = this.state.resizeMode['mode'];
      //

      const cW = (canvasInfo.width);
      const cH = (canvasInfo.height);
      switch (mode) {
        case "nw":
          if (sizeInfo['wUnit'] === '%') {
            sizeInfo['w'] = (tW - gapX) / cW * 100;
            if (positionInfo['xUnit'] === '%') {
              positionInfo['x'] = (tPx + gapX) / cW * 100;
            } else positionInfo['x'] = tPx + gapX;
          } else {
            sizeInfo['w'] = tW - gapX;
            if (positionInfo['xUnit'] === '%') positionInfo['x'] = (tPx + gapX) / cW * 100;
            else positionInfo['x'] = tPx + gapX;
          }
          if (sizeInfo['hUnit'] === '%') {
            sizeInfo['h'] = (tH - gapY) / cH * 100;
            if (positionInfo['yUnit'] === '%') positionInfo['y'] = (tPy + gapY) / cH * 100;
            else positionInfo['y'] = tPy + gapY;
          } else {
            sizeInfo['h'] = tH - gapY;
            if (positionInfo['yUnit'] === '%') positionInfo['y'] = (tPy + gapY) / cH * 100;
            else positionInfo['y'] = tPy + gapY;
          }
          break;
        case "ne":
          if (sizeInfo['wUnit'] === '%') sizeInfo['w'] = (tW + gapX) / cW * 100;
          else sizeInfo['w'] = tW + gapX;
          if (sizeInfo['hUnit'] === '%') {
            sizeInfo['h'] = (tH - gapY) / cH * 100;
            if (positionInfo['yUnit'] === '%') positionInfo['y'] = (tPy + gapY) / cH * 100;
            else positionInfo['y'] = tPy + gapY;
          } else {
            sizeInfo['h'] = tH - gapY;
            if (positionInfo['yUnit'] === '%') positionInfo['y'] = (tPy + gapY) / cH * 100;
            else positionInfo['y'] = tPy + gapY;
          }
          break;
        case "sw":
          if (sizeInfo['wUnit'] === '%') {
            sizeInfo['w'] = (tW - gapX) / cW * 100;
            if (positionInfo['xUnit'] === '%') positionInfo['x'] = (tPx + gapX) / cW * 100;
            else positionInfo['x'] = tPx + gapX;
          } else {
            sizeInfo['w'] = tW - gapX;
            if (positionInfo['xUnit'] === '%') positionInfo['x'] = (tPx + gapX) / cW * 100;
            else positionInfo['x'] = tPx + gapX;
          }
          if (sizeInfo['hUnit'] === '%') sizeInfo['h'] = (tH + gapY) / cH * 100;
          else sizeInfo['h'] = tH - gapY;
          break;
        case "se":
          if (sizeInfo['wUnit'] === '%') sizeInfo['w'] = (tW + gapX) / cW * 100;
          else sizeInfo['w'] = tW + gapX;
          if (sizeInfo['hUnit'] === '%') sizeInfo['h'] = (tH + gapY) / cH * 100;
          else sizeInfo['h'] = tH + gapY;
          break;
      }
      document.body.style.cursor = `${mode}-resize`;
      rootComponent.updateRootState({});
      console.log(e);
    }
  }

  checkMove(e) {
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
  }

  checkDegree(e) {
    if (this.state.degreeMode) {
      e = e.nativeEvent;
      style.canvas.transition = '';
      const rootComponent = this.props.rootComponent;
      const rootComponentState = rootComponent.state;
      const canvasInfo = rootComponentState.canvasInfo;
      const activeSubData = rootComponentState.activeSubData;

      const tX = e.pageX - this.state.degreeMode.startX;
      const tY = e.pageY - this.state.degreeMode.startY;
      const deg = Math.atan2(tY, tX);
      activeSubData['deg'] = deg * 180 / Math.PI;
      activeSubData['deg'] += 90;
      if (activeSubData['deg'] < 0) activeSubData['deg'] += 360;
      activeSubData['deg'] = activeSubData['deg'] % 360;
      rootComponent.updateRootState({activeSubData});
      document.body.style.cursor = 'move';
      console.log(e);
    }
  }

  checkAt(e) {
    if (this.state.atMode) {
      e = e.nativeEvent;
      style.canvas.transition = '';
      const rootComponent = this.props.rootComponent;
      const rootComponentState = rootComponent.state;
      const canvasInfo = rootComponentState.canvasInfo;
      const activeSubData = rootComponentState.activeSubData;

      const tX = e.pageX - this.state.atMode.startX;
      const tY = e.pageY - this.state.atMode.startY;
      const atInfo = activeSubData['at'];

      const sizeInfo = activeSubData['size'];
      const tW = sizeInfo['wUnit'] === '%' ? canvasInfo.width * sizeInfo['w'] / 100 : sizeInfo['w'];
      const tH = sizeInfo['hUnit'] === '%' ? canvasInfo.height * sizeInfo['h'] / 100 : sizeInfo['h'];

      atInfo['x'] = +this.state.atMode.startValueX+(atInfo['xUnit'] === '%' ? tX / tW * 100 : tX);
      atInfo['y'] = +this.state.atMode.startValueY+(atInfo['yUnit'] === '%' ? tY / tH * 100 : tY);

      console.log(tX, tY);
      rootComponent.updateRootState({activeSubData});
      document.body.style.cursor = 'move';
      console.log(e);
    }
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
        this.checkMove(e);
        this.checkResize(e);
        this.checkDegree(e);
        this.checkAt(e);
      }}
      onMouseLeave={() => this.setModes()}
      onMouseUp={() => {
        this.setModes();
        document.body.style.cursor = 'default';
      }}
      onMouseDown={e => {
        this.setModes({useMove: true});
      }}
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
RedCanvas.getContainerCss = (canvasInfo, borderGradientInfo) => {
  let borderData = {};
  // console.log('borderGradientInfo', borderGradientInfo)
  if (canvasInfo.borderIsGradientMode && borderGradientInfo) {
    let gradient = CALC_GRADIENT.calcGradients(borderGradientInfo['layers']);
    gradient = gradient.split(')');
    gradient.pop();
    gradient = gradient.join(')') + ')';
    borderData = {
      borderStyle: canvasInfo['border_type'],
      borderImageSlice: `${borderGradientInfo['border_image_sliceT']} ${borderGradientInfo['border_image_sliceR']} ${borderGradientInfo['border_image_sliceB']} ${borderGradientInfo['border_image_sliceL']}`,
      borderImageSource: gradient,
      borderImageRepeat: borderGradientInfo['border_image_repeat'],
      borderImageOutset: borderGradientInfo['border_image_outset'] + 'px',
    };
  } else {
    borderData = {
      borderStyle: `${canvasInfo['border_type']}`,
      borderColor: `${canvasInfo['border_color']}`
    };
  }
  if (canvasInfo['border_radius_mergeMode']) {
    borderData['borderRadius'] = `${canvasInfo['border_radius']}${canvasInfo['border_radius_unit']}`;
  } else {
    borderData['borderTopLeftRadius'] = `${canvasInfo['border_radius_split'][0]}${canvasInfo['border_radius_unit_split'][0]}`;
    borderData['borderBottomLeftRadius'] = `${canvasInfo['border_radius_split'][1]}${canvasInfo['border_radius_unit_split'][1]}`;
    borderData['borderTopRightRadius'] = `${canvasInfo['border_radius_split'][2]}${canvasInfo['border_radius_unit_split'][2]}`;
    borderData['borderBottomRightRadius'] = `${canvasInfo['border_radius_split'][3]}${canvasInfo['border_radius_unit_split'][3]}`;
  }
  if (canvasInfo['border_width_mergeMode']) {
    borderData['borderWidth'] = `${canvasInfo['border_width']}px`;
  } else {
    borderData['borderWidth'] = `${canvasInfo['border_width_split'][0]}px ${canvasInfo['border_width_split'][1]}px ${canvasInfo['border_width_split'][2]}px ${canvasInfo['border_width_split'][3]}px`;
  }
  // console.log(borderData)
  return {
    ...borderData,
    boxSizing: canvasInfo['box_sizing'],
    outline: `${canvasInfo['outline_width']}${canvasInfo['outline_width_unit']} ${canvasInfo['outline_type']} ${canvasInfo['outline_color']}`,
    outlineOffset: `${canvasInfo['outline_offset']}${canvasInfo['outline_offset_unit']}`,
    width: canvasInfo['width'] + 'px',
    height: canvasInfo['height'] + 'px'
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
