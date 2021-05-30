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
    const borderW = canvasInfo['border_width_mergeMode'] ? canvasInfo['border_width_split'][1] + canvasInfo['border_width_split'][3] : canvasInfo['border_width']*2
    const layoutSize = {
      w: activeSubDataSize['wUnit'] === '%' ? (canvasInfo['width']) * activeSubDataSize['w'] / 100 : (activeSubDataSize['w']),
      h: activeSubDataSize['hUnit'] === '%' ? canvasInfo['height'] * activeSubDataSize['h'] / 100 : activeSubDataSize['h'],
    };
    const lX = activeSubDataAt['xUnit'] === 'px' ? `${activeSubDataAt['x']}${activeSubDataAt['xUnit']}` : `${layoutSize['w'] * activeSubDataAt['x'] / 100}px`;
    const lY = activeSubDataAt['yUnit'] === 'px' ? `${activeSubDataAt['y']}${activeSubDataAt['yUnit']}` : `${layoutSize['h'] * activeSubDataAt['y'] / 100}px`;
    return <div
      style={{
        ...style.canvas,
        transform: `translate(calc(-50% + ${this.state.canvasViewOffsetX}px),calc(-50% + ${this.state.canvasViewOffsetY}px)) scale(${this.state.canvasViewScale})`
      }} className={'transparent_checker redgradient_canvas'}>
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
      {
        this.state.layerSizeView ? <div
          style={{
            position: 'absolute',
            left: activeSubDataPosition['xUnit'] === '%' ? (canvasInfo.width - layoutSize.w) * (activeSubDataPosition['x'] / 100) + 'px' : `${activeSubDataPosition['x']}${activeSubDataPosition['xUnit']}`,
            top: activeSubDataPosition['yUnit'] === '%' ? (canvasInfo.height - layoutSize.h) * (activeSubDataPosition['y'] / 100) + 'px' : `${activeSubDataPosition['y']}${activeSubDataPosition['yUnit']}`,
            width: `${layoutSize['w']}px`,
            height: `${layoutSize['h']}px`,
            border: '1px dashed #000',
            outline: '1px dashed rgba(255,255,255,0.75)',
            color: '#000'
          }}
        >
          <div style={{
            top: 0,
            left: '50%',
            transform: 'translate(-50%, -56px)',
            position: 'absolute', width: '30px', height: '30px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'move',
            border: '1px solid #5e7ade', borderRadius: '50%',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
            background: '#fff'
          }} onMouseDown={e => {
            e.stopPropagation();
            this.setModes({
              positionMode: {
                mode: 'n',
                startValueX: activeSubData['position']['x'],
                startValueY: activeSubData['position']['y'],
                startX: e.nativeEvent.pageX,
                startY: e.nativeEvent.pageY
              }
            });
          }}>
            <FontAwesomeIcon icon={faArrowLeft} style={{fontSize: '17px', transform: 'rotate(90deg)'}}/>
          </div>
          <div style={{
            bottom: 0,
            left: '50%',
            transform: 'translate(-50%, 56px)',
            position: 'absolute', width: '30px', height: '30px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'move',
            border: '1px solid #5e7ade', borderRadius: '50%',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
            background: '#fff'
          }} onMouseDown={e => {
            e.stopPropagation();
            this.setModes({
              positionMode: {
                mode: 's',
                startValueX: activeSubData['position']['x'],
                startValueY: activeSubData['position']['y'],
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
            transform: 'translate(-56px, 50%)',
            position: 'absolute', width: '30px', height: '30px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'move',
            border: '1px solid #5e7ade', borderRadius: '50%',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
            background: '#fff'
          }} onMouseDown={e => {
            e.stopPropagation();
            this.setModes({
              positionMode: {
                mode: 'w',
                startValueX: activeSubData['position']['x'],
                startValueY: activeSubData['position']['y'],
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
            transform: 'translate(56px, 50%)',
            position: 'absolute', width: '30px', height: '30px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'move',
            border: '1px solid #5e7ade', borderRadius: '50%',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
            background: '#fff'
          }} onMouseDown={e => {
            e.stopPropagation();
            this.setModes({
              positionMode: {
                mode: 'e',
                startValueX: activeSubData['position']['x'],
                startValueY: activeSubData['position']['y'],
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
            transform: 'translate(-50%, 96px)',
            position: 'absolute', width: '30px', height: '30px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'move',
            border: '1px solid #5e7ade', borderRadius: '50%',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
            background: '#fff'
          }} onMouseDown={e => {
            e.stopPropagation();
            this.setModes({
              positionMode: {
                mode: 'all',
                startValueX: activeSubData['position']['x'],
                startValueY: activeSubData['position']['y'],
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
                top: 0, left: 0, transform: 'translate(-100%, -100%)',
                position: 'absolute', width: '23px', height: '23px',
                cursor: 'nw-resize',
                background: 'rgba(255,255,255,0.75)',
                display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(0,0,0,0.8)',
                filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
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
            >
              <FontAwesomeIcon icon={faExpandAlt} style={{fontSize: '17px', transform: 'scale(-1,1)'}}/>
            </div>
            <div
              style={{
                top: 0, right: 0, transform: 'translate(100%, -100%)',
                position: 'absolute', width: '23px', height: '23px',
                cursor: 'ne-resize',
                background: 'rgba(255,255,255,0.75)',
                display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(0,0,0,0.8)',
                filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
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
            >
              <FontAwesomeIcon icon={faExpandAlt} style={{fontSize: '17px', transform: 'scale(1,1)'}}/>
            </div>
            <div
              style={{
                bottom: 0, left: 0, transform: 'translate(-100%, 100%)',
                position: 'absolute', width: '23px', height: '23px',
                cursor: 'sw-resize',
                background: 'rgba(255,255,255,0.75)',
                display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(0,0,0,0.8)',
                filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
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
            >
              <FontAwesomeIcon icon={faExpandAlt} style={{fontSize: '17px', transform: 'scale(1,1)'}}/>
            </div>
            <div
              style={{
                bottom: 0, right: 0, transform: 'translate(100%, 100%)',
                position: 'absolute', width: '23px', height: '23px',
                cursor: 'se-resize',
                background: 'rgba(255,255,255,0.75)',
                display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(0,0,0,0.8)',
                filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
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
            >
              <FontAwesomeIcon icon={faExpandAlt} style={{fontSize: '17px', transform: 'scale(-1,1)'}}/>
            </div>
            {/*  */}
            <div
              style={{
                top: '50%', left: 0, transform: 'translate(-100%, -50%)',
                position: 'absolute', width: '23px', height: '23px',
                cursor: 'w-resize',
                background: 'rgba(255,255,255,0.75)',
                display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(0,0,0,0.8)',
                filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
              }}
              onMouseDown={e => {
                e.stopPropagation();
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
                top: '50%', right: 0, transform: 'translate(100%, -50%)',
                position: 'absolute', width: '23px', height: '23px',
                cursor: 'e-resize',
                background: 'rgba(255,255,255,0.75)',
                display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(0,0,0,0.8)',
                filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
              }}
              onMouseDown={e => {
                e.stopPropagation();
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
                top: 0, left: '50%', transform: 'translate(-50%, -100%)',
                position: 'absolute', width: '23px', height: '23px',
                cursor: 'n-resize',
                background: 'rgba(255,255,255,0.75)',
                display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(0,0,0,0.8)',
                filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
              }}
              onMouseDown={e => {
                e.stopPropagation();
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
                bottom: 0, left: '50%', transform: 'translate(-50%, 100%)',
                position: 'absolute', width: '23px', height: '23px',
                cursor: 's-resize',
                background: 'rgba(255,255,255,0.75)',
                display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                border: '1px solid rgba(0,0,0,0.8)',
                filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
              }}
              onMouseDown={e => {
                e.stopPropagation();
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
                    height: activeSubData['typeEndingShape'] === ENDING_SHAPE_TYPE.CIRCLE ? '50px' : `${50 * layoutSize['h'] / layoutSize['w']}px`,
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
            activeSubData['type'] === GRADIENT_TYPE.RADIAL ||
            activeSubData['type'] === GRADIENT_TYPE.REPEAT_RADIAL
              ? '' : <>
                <div
                  style={{
                    top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(0deg)',
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
                    <div>{(+activeSubData['deg']).toFixed(1)}<br/><span style={{fontSize: '10px'}}>deg</span></div>
                    <div style={{
                      lineHeight: 1,
                      width: '10px', height: '10px',
                      border: '1px solid #5e7ade',
                      borderRadius: '50%',
                      position: 'absolute',
                      transform: 'translate(-50%,-50%)',
                      top: `calc(50% + ${Math.sin(Math.PI / 180 * (activeSubData['deg'] - 90)) * 20}px)`,
                      left: `calc(50% + ${Math.cos(Math.PI / 180 * (activeSubData['deg'] - 90)) * 20}px)`
                    }}/>
                  </button>
                </div>
                <div
                  style={{
                    top: 0, left: 0, transform: 'translate(-175%, -175%) ',
                    position: 'absolute', width: '30px', height: '30px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.75)',
                    display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(0,0,0,0.8)',
                    filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                  }}
                  onMouseDown={e => {
                    e.stopPropagation();
                    this.setModes({degreeMode: {startX: e.nativeEvent.pageX, startY: e.nativeEvent.pageY}});
                  }}
                >
                  <FontAwesomeIcon icon={faSyncAlt} style={{transform: 'rotate(0deg)'}}/>
                </div>
                <div
                  style={{
                    top: 0, right: 0, transform: 'translate(175%, -175%) ',
                    position: 'absolute', width: '30px', height: '30px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.75)',
                    display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(0,0,0,0.8)',
                    filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                  }}
                  onMouseDown={e => {
                    e.stopPropagation();
                    this.setModes({degreeMode: {startX: e.nativeEvent.pageX, startY: e.nativeEvent.pageY}});
                  }}
                >
                  <FontAwesomeIcon icon={faSyncAlt} style={{transform: 'rotate(0deg)'}}/>
                </div>
                <div
                  style={{
                    bottom: 0, right: 0, transform: 'translate(175%, 175%) ',
                    position: 'absolute', width: '30px', height: '30px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.75)',
                    display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(0,0,0,0.8)',
                    filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                  }}
                  onMouseDown={e => {
                    e.stopPropagation();
                    this.setModes({degreeMode: {startX: e.nativeEvent.pageX, startY: e.nativeEvent.pageY}});
                  }}
                >
                  <FontAwesomeIcon icon={faSyncAlt} style={{transform: 'rotate(0deg)'}}/>
                </div>
                <div
                  style={{
                    bottom: 0, left: 0, transform: 'translate(-175%, 175%) ',
                    position: 'absolute', width: '30px', height: '30px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.75)',
                    display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    border: '1px solid rgba(0,0,0,0.8)',
                    filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
                    cursor: 'pointer',
                  }}
                  onMouseDown={e => {
                    e.stopPropagation();
                    this.setModes({degreeMode: {startX: e.nativeEvent.pageX, startY: e.nativeEvent.pageY}});
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
            <div>w : {(+activeSubData['size']['w']).toFixed(1)}{activeSubData['size']['wUnit']} / h
              : {(+activeSubData['size']['h']).toFixed(1)}{activeSubData['size']['hUnit']}</div>
            <div>x : {(+activeSubData['position']['x']).toFixed(1)}{activeSubData['position']['xUnit']} / y
              : {(+activeSubData['position']['y']).toFixed(1)}{activeSubData['position']['yUnit']}</div>
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
        this.checkCanvasMove(e);
        this.checkPosition(e);
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
