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
import ENDING_SHAPE_TYPE from "../ENDING_SHAPE_TYPE";
import {
  faArrowLeft,
  faArrowsAlt,
  faArrowsAltH,
  faArrowsAltV,
  faExpandAlt,
  faSyncAlt
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RedCanvas_checkResize from "./visualEdit/RedCanvas_checkResize.js";
import RedCanvas_checkDegree from "./visualEdit/RedCanvas_checkDegree.js";
import RedCanvas_checkAt from "./visualEdit/RedCanvas_checkAt.js";
import RedCanvas_checkPosition from "./visualEdit/RedCanvas_checkPosition.js";
// TODO - 정리필요
let ghostSize, ghostMode;

class RedCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasMoveState: false,
      canvasViewOffsetX: 0,
      canvasViewOffsetY: 0,
      canvasViewScale: 1,
      layerSizeView: true,
      canvasBgColorPickerOpenYn: false,
    };
    this.refColorPickerContainer = React.createRef();
    this.refDegree = React.createRef();
    this.refDegreeCanvas = React.createRef();
  }

  draw_canvasUI = drawCanvasUI;

  drawCall(canvasInfo, layers, bgColor) {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubLayerData = rootComponentState.activeSubLayerData;
    const activeSubLayerDataPosition = activeSubLayerData['position'];
    const activeSubLayerDataAt = activeSubLayerData['at'];
    const activeSubLayerDataSize = activeSubLayerData['size'];
    {
      activeSubLayerData['position']['x'] = +activeSubLayerData['position']['x'];
      activeSubLayerData['position']['y'] = +activeSubLayerData['position']['y'];
      activeSubLayerData['size']['w'] = +activeSubLayerData['size']['w'];
      activeSubLayerData['size']['h'] = +activeSubLayerData['size']['h'];
      activeSubLayerData['at']['x'] = +activeSubLayerData['at']['x'];
      activeSubLayerData['at']['y'] = +activeSubLayerData['at']['y'];
    }
    const borderGradientInfo = rootComponentState.borderGradientInfo;
    const borderW = canvasInfo['border_width_mergeMode'] ? canvasInfo['border_width'] * 2 : (canvasInfo['border_width_split'][1] + canvasInfo['border_width_split'][3]);
    const borderH = canvasInfo['border_width_mergeMode'] ? canvasInfo['border_width'] * 2 : (canvasInfo['border_width_split'][0] + canvasInfo['border_width_split'][2]);
    const borderX = canvasInfo['border_width_mergeMode'] ? canvasInfo['border_width'] : canvasInfo['border_width_split'][3];
    const borderY = canvasInfo['border_width_mergeMode'] ? canvasInfo['border_width'] : canvasInfo['border_width_split'][0];
    const layoutSize = {
      w: activeSubLayerDataSize['wUnit'] === '%' ? (canvasInfo['width'] - borderW) * activeSubLayerDataSize['w'] / 100 : activeSubLayerDataSize['w'] - borderW,
      h: activeSubLayerDataSize['hUnit'] === '%' ? (canvasInfo['height'] - borderH) * activeSubLayerDataSize['h'] / 100 : activeSubLayerDataSize['h'] - borderH,
    };
    layoutSize['x'] = (activeSubLayerDataPosition['xUnit'] === '%' ? (canvasInfo.width - layoutSize.w - borderW) * (activeSubLayerDataPosition['x'] / 100) : activeSubLayerDataPosition['x']) + borderX;
    layoutSize['y'] = (activeSubLayerDataPosition['yUnit'] === '%' ? (canvasInfo.height - layoutSize.h - borderH) * (activeSubLayerDataPosition['y'] / 100) : activeSubLayerDataPosition['y']) + borderY;
    const lX = activeSubLayerDataAt['xUnit'] === 'px' ? `${activeSubLayerDataAt['x'] - borderX}${activeSubLayerDataAt['xUnit']}` : `${layoutSize['w'] * activeSubLayerDataAt['x'] / 100}px`;
    const lY = activeSubLayerDataAt['yUnit'] === 'px' ? `${activeSubLayerDataAt['y'] - borderY}${activeSubLayerDataAt['yUnit']}` : `${layoutSize['h'] * activeSubLayerDataAt['y'] / 100}px`;
    if (ghostMode && !ghostSize) ghostSize = {...layoutSize};
    const iconScale = Math.min(1, 1 / this.state.canvasViewScale)
    return <div
      style={{
        ...style.canvas,
        transform: `translate(calc(-50% + ${this.state.canvasViewOffsetX}px),calc(-50% + ${this.state.canvasViewOffsetY}px)) scale(${this.state.canvasViewScale})`
      }} className={'transparent_checker redGradient_canvas'}>
      <div
        className={'transparent_checker'}
        style={{
          width: `${canvasInfo.width}px`, height: `${canvasInfo.height}px`,
          background: CALC_GRADIENT.calcGradients(layers, true, bgColor),
          backgroundBlendMode: CALC_GRADIENT.calcBlendMode(layers),
          // transition: 'width 0.2s, height 0.2s',
          ...RedCanvas.getContainerCss(canvasInfo, borderGradientInfo),
          filter: RedCanvas.getFilterCss(canvasInfo['filterList']),
          overflow: 'hidden',
        }}
      />

      {/*<div style={{position : 'absolute',top:'50%',left : '50%',transform : 'translate(-50%,-50%)'}}>RedGradient</div>*/}
      {/*<div>{borderW}/{borderH}</div>*/}
      {
        <div
          style={{
            position: 'absolute',
            left: `${ghostSize ? ghostSize['x'] : 0}px`,
            top: `${ghostSize ? ghostSize['y'] : 0}px`,
            width: `${ghostSize ? ghostSize['w'] : 0}px`,
            height: `${ghostSize ? ghostSize['h'] : 0}px`,
            border: '1px dashed #ff0000',
            outline: '1px dashed rgba(255,255,255,0.75)',
            background: 'linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(0,0,0,0.1) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(0,0,0,0.1) 75%), linear-gradient(-45deg, transparent 75%, rgba(0,0,0,0.1) 75%),rgba(255,0,0,0.2)',
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 z0px, 10px -10px, -10px 0',
            opacity: ghostMode ? 1 : 0,
            transition: 'opacity 0.2s',
            color: '#000'
          }}
        />
      }
      {
        this.state.layerSizeView ? <div
          style={{
            position: 'absolute',
            left: `${layoutSize['x']}px`,
            top: `${layoutSize['y']}px`,
            width: `${layoutSize['w']}px`,
            height: `${layoutSize['h']}px`,
            border: '1px dashed #000',
            outline: '1px dashed rgba(255,255,255,0.75)',
            background: ghostMode ? 'rgba(255,255,255,0.2)' : '',
            color: '#000'
          }}
        >
          <div style={{
            top: 0,
            left: '50%',
            transform: `translate(-50%, -${20 + 36 * iconScale}px) scale(${iconScale})`,
            transition: 'transform 0.2s',
            position: 'absolute', width: `30px`, height: '30px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'move',
            border: '1px solid #5e7ade', borderRadius: '50%',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
            background: '#fff'
          }} onMouseDown={e => {
            e.stopPropagation();
            ghostMode = true;
            this.setModes({
              positionMode: {
                mode: 'n',
                startValueX: activeSubLayerData['position']['x'],
                startValueY: activeSubLayerData['position']['y'],
                startX: e.nativeEvent.pageX,
                startY: e.nativeEvent.pageY
              }
            });
          }}>
            <FontAwesomeIcon icon={faArrowLeft} style={{fontSize: '17px', transform: `rotate(90deg)`}}/>
          </div>
          <div style={{
            bottom: 0,
            left: '50%',
            transform: `translate(-50%, ${20 + 36 * iconScale}px) scale(${iconScale})`,
            transition: 'transform 0.2s',
            position: 'absolute', width: '30px', height: '30px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'move',
            border: '1px solid #5e7ade', borderRadius: '50%',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
            background: '#fff'
          }} onMouseDown={e => {
            e.stopPropagation();
            ghostMode = true;
            this.setModes({
              positionMode: {
                mode: 's',
                startValueX: activeSubLayerData['position']['x'],
                startValueY: activeSubLayerData['position']['y'],
                startX: e.nativeEvent.pageX,
                startY: e.nativeEvent.pageY
              }
            });
          }}>
            <FontAwesomeIcon icon={faArrowLeft} style={{fontSize: '17px', transform: 'rotate(-90deg)'}}/>
          </div>
          <div style={{
            bottom: '50%',
            left: 0,
            transform: `translate(-${20 + 36 * iconScale}px, 50%) scale(${iconScale})`,
            transition: 'transform 0.2s',
            position: 'absolute', width: '30px', height: '30px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'move',
            border: '1px solid #5e7ade', borderRadius: '50%',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
            background: '#fff'
          }} onMouseDown={e => {
            e.stopPropagation();
            ghostMode = true;
            this.setModes({
              positionMode: {
                mode: 'w',
                startValueX: activeSubLayerData['position']['x'],
                startValueY: activeSubLayerData['position']['y'],
                startX: e.nativeEvent.pageX,
                startY: e.nativeEvent.pageY
              }
            });
          }}>
            <FontAwesomeIcon icon={faArrowLeft} style={{fontSize: '17px'}}/>
          </div>
          <div style={{
            bottom: '50%',
            right: 0,
            transform: `translate(${20 + 36 * iconScale}px, 50%) scale(${iconScale})`,
            transition: 'transform 0.2s',
            position: 'absolute', width: '30px', height: '30px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'move',
            border: '1px solid #5e7ade', borderRadius: '50%',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
            background: '#fff'
          }} onMouseDown={e => {
            e.stopPropagation();
            ghostMode = true;
            this.setModes({
              positionMode: {
                mode: 'e',
                startValueX: activeSubLayerData['position']['x'],
                startValueY: activeSubLayerData['position']['y'],
                startX: e.nativeEvent.pageX,
                startY: e.nativeEvent.pageY
              }
            });
          }}>
            <FontAwesomeIcon icon={faArrowLeft} style={{fontSize: '17px', transform: 'rotate(180deg)'}}/>
          </div>
          <div style={{
            bottom: 0,
            left: '50%',
            transform: `translate(-50%, ${20 + 76 * iconScale}px) scale(${iconScale})`,
            transition: 'transform 0.2s',
            position: 'absolute', width: '30px', height: '30px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'move',
            border: '1px solid #5e7ade', borderRadius: '50%',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
            background: '#fff'
          }} onMouseDown={e => {
            e.stopPropagation();
            ghostMode = true;
            this.setModes({
              positionMode: {
                mode: 'all',
                startValueX: activeSubLayerData['position']['x'],
                startValueY: activeSubLayerData['position']['y'],
                startX: e.nativeEvent.pageX,
                startY: e.nativeEvent.pageY
              }
            });
          }}>
            <FontAwesomeIcon icon={faArrowsAlt} style={{fontSize: '17px', transform: 'rotate(-90deg)'}}/>
          </div>
          <>
            <div
              style={{
                top: 0,
                left: 0,
                transform: `translate(-${16 + 7 * iconScale}px, -${16 + 7 * iconScale}px) scale(${iconScale})`,
                transition: 'transform 0.2s',
                position: 'absolute',
                width: '23px',
                height: '23px',
                cursor: 'nw-resize',
                background: 'rgba(255,255,255,0.75)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(0,0,0,0.8)',
                filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
              }}
              onMouseDown={e => {
                e.stopPropagation();
                ghostMode = true;
                this.setModes({
                  resizeMode: {
                    mode: 'nw',
                    startX: e.nativeEvent.pageX,
                    startY: e.nativeEvent.pageY
                  }
                });
              }}
            >
              <FontAwesomeIcon icon={faExpandAlt} style={{fontSize: '17px', transform: 'scale(-1,1)'}}/>
            </div>
            <div
              style={{
                top: 0,
                right: 0,
                transform: `translate(${16 + 7 * iconScale}px, -${16 + 7 * iconScale}px) scale(${iconScale})`,
                transition: 'transform 0.2s',
                position: 'absolute',
                width: '23px',
                height: '23px',
                cursor: 'ne-resize',
                background: 'rgba(255,255,255,0.75)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(0,0,0,0.8)',
                filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
              }}
              onMouseDown={e => {
                e.stopPropagation();
                ghostMode = true;
                this.setModes({
                  resizeMode: {
                    mode: 'ne',
                    startX: e.nativeEvent.pageX,
                    startY: e.nativeEvent.pageY
                  }
                });
              }}
            >
              <FontAwesomeIcon icon={faExpandAlt} style={{fontSize: '17px', transform: 'scale(1,1)'}}/>
            </div>
            <div
              style={{
                bottom: 0,
                left: 0,
                transform: `translate(-${16 + 7 * iconScale}px, ${16 + 7 * iconScale}px) scale(${iconScale})`,
                transition: 'transform 0.2s',
                position: 'absolute',
                width: '23px',
                height: '23px',
                cursor: 'sw-resize',
                background: 'rgba(255,255,255,0.75)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(0,0,0,0.8)',
                filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
              }}
              onMouseDown={e => {
                e.stopPropagation();
                ghostMode = true;
                this.setModes({
                  resizeMode: {
                    mode: 'sw',
                    startX: e.nativeEvent.pageX,
                    startY: e.nativeEvent.pageY
                  }
                });
              }}
            >
              <FontAwesomeIcon icon={faExpandAlt} style={{fontSize: '17px', transform: 'scale(1,1)'}}/>
            </div>
            <div
              style={{
                bottom: 0,
                right: 0,
                transform: `translate(${16 + 7 * iconScale}px, ${16 + 7 * iconScale}px) scale(${iconScale})`,
                transition: 'transform 0.2s',
                position: 'absolute',
                width: '23px',
                height: '23px',
                cursor: 'se-resize',
                background: 'rgba(255,255,255,0.75)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(0,0,0,0.8)',
                filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
              }}
              onMouseDown={e => {
                e.stopPropagation();
                ghostMode = true;
                this.setModes({
                  resizeMode: {
                    mode: 'se',
                    startX: e.nativeEvent.pageX,
                    startY: e.nativeEvent.pageY
                  }
                });
              }}
            >
              <FontAwesomeIcon icon={faExpandAlt} style={{fontSize: '17px', transform: 'scale(-1,1)'}}/>
            </div>
            {/*  */}
            <div
              style={{
                top: '50%', left: 0, transform: `translate(-${16 + 7 * iconScale}px, -50%) scale(${iconScale})`,
                transition: 'transform 0.2s',
                position: 'absolute', width: '23px', height: '23px',
                cursor: 'w-resize',
                background: 'rgba(255,255,255,0.75)',
                display: activeSubLayerData['fixRatioYn'] ? 'none' : 'flex',
                alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(0,0,0,0.8)',
                filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
              }}
              onMouseDown={e => {
                e.stopPropagation();
                ghostMode = true;
                this.setModes({
                  resizeMode: {
                    mode: 'w',
                    startX: e.nativeEvent.pageX,
                    startY: e.nativeEvent.pageY
                  }
                });
              }}
            >
              <FontAwesomeIcon icon={faArrowsAltH} style={{fontSize: '17px', transform: 'scale(1,1)'}}/>
            </div>
            <div
              style={{
                top: '50%', right: 0, transform: `translate(${16 + 7 * iconScale}px, -50%) scale(${iconScale})`,
                transition: 'transform 0.2s',
                position: 'absolute', width: '23px', height: '23px',
                cursor: 'e-resize',
                background: 'rgba(255,255,255,0.75)',
                display: activeSubLayerData['fixRatioYn'] ? 'none' : 'flex',
                alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(0,0,0,0.8)',
                filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
              }}
              onMouseDown={e => {
                e.stopPropagation();
                ghostMode = true;
                this.setModes({
                  resizeMode: {
                    mode: 'e',
                    startX: e.nativeEvent.pageX,
                    startY: e.nativeEvent.pageY
                  }
                });
              }}
            >
              <FontAwesomeIcon icon={faArrowsAltH} style={{fontSize: '17px', transform: 'scale(1,1)'}}/>
            </div>
            <div
              style={{
                top: 0, left: '50%', transform: `translate(-50%, -${16 + 7 * iconScale}px) scale(${iconScale})`,
                transition: 'transform 0.2s',
                position: 'absolute', width: '23px', height: '23px',
                cursor: 'n-resize',
                background: 'rgba(255,255,255,0.75)',
                display: activeSubLayerData['fixRatioYn'] ? 'none' : 'flex',
                alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(0,0,0,0.8)',
                filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
              }}
              onMouseDown={e => {
                e.stopPropagation();
                ghostMode = true;
                this.setModes({
                  resizeMode: {
                    mode: 'n',
                    startX: e.nativeEvent.pageX,
                    startY: e.nativeEvent.pageY
                  }
                });
              }}
            >
              <FontAwesomeIcon icon={faArrowsAltV} style={{fontSize: '17px', transform: 'scale(1,1)'}}/>
            </div>
            <div
              style={{
                bottom: 0, left: '50%', transform: `translate(-50%, ${16 + 7 * iconScale}px) scale(${iconScale})`,
                transition: 'transform 0.2s',
                position: 'absolute', width: '23px', height: '23px',
                cursor: 's-resize',
                background: 'rgba(255,255,255,0.75)',
                display: activeSubLayerData['fixRatioYn'] ? 'none' : 'flex',
                alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(0,0,0,0.8)',
                filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
              }}
              onMouseDown={e => {
                e.stopPropagation();
                ghostMode = true;
                this.setModes({
                  resizeMode: {
                    mode: 's',
                    startX: e.nativeEvent.pageX,
                    startY: e.nativeEvent.pageY
                  }
                });
              }}
            >
              <FontAwesomeIcon icon={faArrowsAltV} style={{fontSize: '17px', transform: 'scale(1,1)'}}/>
            </div>
          </>


          {activeSubLayerData['title']}
          {
            activeSubLayerData['type'] === GRADIENT_TYPE.RADIAL ||
            activeSubLayerData['type'] === GRADIENT_TYPE.REPEAT_RADIAL ||
            activeSubLayerData['type'] === GRADIENT_TYPE.CONIC ||
            activeSubLayerData['type'] === GRADIENT_TYPE.REPEAT_CONIC
              ? <>
                <div
                  style={{
                    position: 'absolute',
                    left: lX,
                    top: lY,
                    width: `50px`,
                    height: activeSubLayerData['typeEndingShape'] === ENDING_SHAPE_TYPE.CIRCLE ? '50px' : `${50 * layoutSize['h'] / layoutSize['w']}px`,
                    border: '2px dashed rgba(0,0,0,0.5)',
                    borderRadius: '50%',
                    transform: 'translate(-50%,-50%)',
                    color: '#000',
                    cursor: 'move'
                  }}
                  onMouseDown={e => {
                    e.stopPropagation();
                    this.setModes({
                      atMode: {
                        startValueX: activeSubLayerData['at']['x'],
                        startValueY: activeSubLayerData['at']['y'],
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
                      background: '#fff',
                      border: '2px solid red',
                      filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,5)',
                      transform: 'translate(-50%,-50%)',
                      color: '#000'
                    }}
                  />
                </div>
              </> : ''
          }
          {
            activeSubLayerData['type'] === GRADIENT_TYPE.RADIAL ||
            activeSubLayerData['type'] === GRADIENT_TYPE.REPEAT_RADIAL
              ? '' : <>
                <canvas
                  ref={this.refDegreeCanvas}
                  width={250 * this.state.canvasViewScale}
                  height={250 * this.state.canvasViewScale}
                  style={{
                    top: '50%', left: '50%', transform: `translate(-50%, -50%)  rotate(0deg) `,
                    width: `${250 * this.state.canvasViewScale}px`, height: `${250 * this.state.canvasViewScale}px`,
                    position: 'absolute', borderRadius: '50%', lineHeight: 1,
                    background: 'rgba(255,255,255,0.25)',
                    display: this.state.degreeMode ? 'block' : 'none',
                  }}
                />
                <div
                  ref={this.refDegree}
                  style={{
                    top: '50%', left: '50%', transform: `translate(-50%, -50%) rotate(0deg) `,
                    width: `${50}px`, height: `${50}px`,
                    position: 'absolute', borderRadius: '50%', lineHeight: 1,
                    display: this.state.degreeMode ? 'block' : 'none',
                    background: 'rgba(255,255,255,0.4)'
                  }}
                >

                  <button
                    style={{
                      display: 'inline-block',
                      lineHeight: 1,
                      width: `${50}px`, height: `${50}px`,
                      border: '1px solid #5e7ade',
                      borderRadius: '50%',
                      outline: 'none',
                      cursor: 'pointer',
                      fontSize: '11px'
                    }}
                  >
                    <div>{(+activeSubLayerData['deg']).toFixed(1)}<br/><span style={{fontSize: '10px'}}>deg</span></div>
                    <div style={{
                      lineHeight: 1,
                      width: '10px', height: '10px',
                      border: '1px solid #5e7ade',
                      borderRadius: '50%',
                      position: 'absolute',
                      transform: 'translate(-50%,-50%)',
                      top: `calc(50% + ${Math.sin(Math.PI / 180 * (activeSubLayerData['deg'] - 90)) * 20}px)`,
                      left: `calc(50% + ${Math.cos(Math.PI / 180 * (activeSubLayerData['deg'] - 90)) * 20}px)`
                    }}/>
                  </button>
                </div>
                <div
                  style={{
                    top: 0,
                    left: 0,
                    transform: `translate(-${20 + 32 * iconScale}px, -${20 + 32 * iconScale}px) scale(${iconScale})`,
                    transition: 'transform 0.2s',
                    position: 'absolute',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.75)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(0,0,0,0.8)',
                    filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                  }}
                  onMouseDown={e => {
                    e.stopPropagation();
                    const rect = this.refDegree.current.getBoundingClientRect();
                    this.refDegreeCanvas.current.getContext('2d').clearRect(0, 0, 500 * this.state.canvasViewScale, 500 * this.state.canvasViewScale);
                    this.setModes({
                      degreeMode: {
                        ref: this.refDegreeCanvas.current,
                        startX: e.nativeEvent.pageX,
                        startY: e.nativeEvent.pageY,
                        startDegX: rect.x + rect.width / 2,
                        startDegY: rect.x + rect.height / 2,
                        startDeg: activeSubLayerData['deg'],
                        mode: 'nw'
                      }
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faSyncAlt} style={{transform: 'rotate(0deg)'}}/>
                </div>
                <div
                  style={{
                    top: 0,
                    right: 0,
                    transform: `translate(${20 + 32 * iconScale}px, -${20 + 32 * iconScale}px) scale(${iconScale})`,
                    transition: 'transform 0.2s',
                    position: 'absolute',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.75)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(0,0,0,0.8)',
                    filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                  }}
                  onMouseDown={e => {
                    e.stopPropagation();
                    const rect = this.refDegree.current.getBoundingClientRect();
                    this.refDegreeCanvas.current.getContext('2d').clearRect(0, 0, 500 * this.state.canvasViewScale, 500 * this.state.canvasViewScale);
                    this.setModes({
                      degreeMode: {
                        ref: this.refDegreeCanvas.current,
                        startX: e.nativeEvent.pageX,
                        startY: e.nativeEvent.pageY,
                        startDegX: rect.x + rect.width / 2,
                        startDegY: rect.x + rect.height / 2,
                        startDeg: activeSubLayerData['deg'],
                        mode: 'ne'
                      }
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faSyncAlt} style={{transform: 'rotate(0deg)'}}/>
                </div>
                <div
                  style={{
                    bottom: 0,
                    right: 0,
                    transform: `translate(${20 + 32 * iconScale}px, ${20 + 32 * iconScale}px) scale(${iconScale})`,
                    transition: 'transform 0.2s',
                    position: 'absolute',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.75)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(0,0,0,0.8)',
                    filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                  }}
                  onMouseDown={e => {
                    e.stopPropagation();
                    const rect = this.refDegree.current.getBoundingClientRect();
                    this.refDegreeCanvas.current.getContext('2d').clearRect(0, 0, 500 * this.state.canvasViewScale, 500 * this.state.canvasViewScale);
                    this.setModes({
                      degreeMode: {
                        ref: this.refDegreeCanvas.current,
                        startX: e.nativeEvent.pageX,
                        startY: e.nativeEvent.pageY,
                        startDegX: rect.x + rect.width / 2,
                        startDegY: rect.x + rect.height / 2,
                        startDeg: activeSubLayerData['deg'],
                        mode: 'se'
                      }
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faSyncAlt} style={{transform: 'rotate(0deg)'}}/>
                </div>
                <div
                  style={{
                    bottom: 0,
                    left: 0,
                    transform: `translate(-${20 + 32 * iconScale}px, ${20 + 32 * iconScale}px) scale(${iconScale})`,
                    transition: 'transform 0.2s',
                    position: 'absolute',
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.75)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(0,0,0,0.8)',
                    filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                  }}
                  onMouseDown={e => {
                    e.stopPropagation();
                    const rect = this.refDegree.current.getBoundingClientRect();
                    this.refDegreeCanvas.current.getContext('2d').clearRect(0, 0, 500 * this.state.canvasViewScale, 500 * this.state.canvasViewScale);
                    this.setModes({
                      degreeMode: {
                        ref: this.refDegreeCanvas.current,
                        startX: e.nativeEvent.pageX,
                        startY: e.nativeEvent.pageY,
                        startDegX: rect.x + rect.width / 2,
                        startDegY: rect.x + rect.height / 2,
                        startDeg: activeSubLayerData['deg'],
                        mode: 'sw'
                      }
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faSyncAlt} style={{transform: 'rotate(0deg)'}}/>
                </div>
              </>
          }
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            display: this.state.positionMode || this.state.resizeMode ? 'block' : 'none',
            background: 'rgba(255,255,255,0.8)',
            padding: '10px',
            borderRadius: '8px',
            whiteSpace: 'nowrap',
            border: '1px solid rgba(0,0,0,0.5)'
          }}>
            <div>w : {(+activeSubLayerData['size']['w']).toFixed(1)}{activeSubLayerData['size']['wUnit']} / h
              : {(+activeSubLayerData['size']['h']).toFixed(1)}{activeSubLayerData['size']['hUnit']}</div>
            <div>x : {(+activeSubLayerData['position']['x']).toFixed(1)}{activeSubLayerData['position']['xUnit']} / y
              : {(+activeSubLayerData['position']['y']).toFixed(1)}{activeSubLayerData['position']['yUnit']}</div>
          </div>
        </div> : ''
      }


    </div>;
  }

  setModes(v = {}) {
    this.state.useMove = false;
    this.state.resizeMode = false;
    this.state.degreeMode = false;
    this.state.atMode = false;
    this.state.positionMode = false;
    this.setState(v);
  }

  checkResize = RedCanvas_checkResize;
  checkDegree = RedCanvas_checkDegree;
  checkAt = RedCanvas_checkAt;
  checkPosition = RedCanvas_checkPosition;

  checkCanvasMove(e) {
    if (this.state.useMove) {
      e = e.nativeEvent;
      style.canvas.transition = '';
      this.setState({
        canvasViewOffsetX: this.state.canvasViewOffsetX + e.movementX,
        canvasViewOffsetY: this.state.canvasViewOffsetY + e.movementY
      });
      document.body.style.cursor = 'move';
    }
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    const layers = rootComponentState.layers;
    const activeLayerData = rootComponentState.activeLayerData;
    return <div
      style={style.container}
      onMouseMove={e => {
        this.checkCanvasMove(e);
        this.checkPosition(e);
        this.checkResize(e);
        this.checkDegree(e);
        this.checkAt(e);
      }}
      onMouseLeave={() => this.setModes()}
      onMouseUp={() => {
        this.setModes();
        ghostMode = false;
        ghostSize = null;
        document.body.style.cursor = 'default';
      }}
      onMouseDown={() => {
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
      {this.drawCall(canvasInfo, layers, rootComponentState.bgColor, activeLayerData)}
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
