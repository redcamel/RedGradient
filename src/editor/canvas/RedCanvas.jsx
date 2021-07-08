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
import RedPropertyEdit from "../property/RedPropertyEdit";
import ACTIVE_FRAME_KEY from "../ACTIVE_FRAME_KEY";
import RedCanvas_checkResize from "./visualEdit/RedCanvas_checkResize";
import RedCanvas_checkDegree from "./visualEdit/RedCanvas_checkDegree";
import RedCanvas_checkAt from "./visualEdit/RedCanvas_checkAt";
import RedCanvas_checkPosition from "./visualEdit/RedCanvas_checkPosition";
import RedCanvas_checkRadius from "./visualEdit/RedCanvas_checkRadius";
import ActiveSelectBar from "../ActiveSelectBar";
// TODO - 정리필요
let ghostSize, ghostMode;
const MODE = {
  GRADIENT: 'gradient',
  CONTAINER: 'container',
  BORDER: 'border'
};

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
      editCanvasOnly: false,
      visualEditMode: MODE.GRADIENT
    };
    this.refColorPickerContainer = React.createRef();
    this.refDegree = React.createRef();
    this.refDegreeCanvas = React.createRef();
  }

  draw_canvasUI = drawCanvasUI;

  drawCall(canvasInfo, layers, bgColor) {
    const rootComponent = this.props.rootComponent;
    console.log(rootComponent.state);
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;

    {
      activeSubData['position']['x'] = +activeSubData['position']['x'];
      activeSubData['position']['y'] = +activeSubData['position']['y'];
      activeSubData['size']['w'] = +activeSubData['size']['w'];
      activeSubData['size']['h'] = +activeSubData['size']['h'];
      activeSubData['at']['x'] = +activeSubData['at']['x'];
      activeSubData['at']['y'] = +activeSubData['at']['y'];
    }

    const borderGradientInfo = rootComponentState.borderGradientInfo;

    ////////////////////
    /////////
    const appState = this.props.appComponent.state;
    let beforeText = RedPropertyEdit.getContainerCssText(appState[ACTIVE_FRAME_KEY.BEFORE]);
    let mainText = RedPropertyEdit.getContainerCssText(appState[ACTIVE_FRAME_KEY.MAIN]);
    let afterText = RedPropertyEdit.getContainerCssText(appState[ACTIVE_FRAME_KEY.AFTER]);
    let beforeText2 = beforeText.replace('.result', '.red_gradient_result');
    let mainText2 = mainText.replace('.result', '.red_gradient_result');
    let afterText2 = afterText.replace('.result', '.red_gradient_result');
    let ResultPreview = `
    ${beforeText2}
    ${mainText2}
    ${afterText2}
    `;
    document.getElementById('red_gradient_result_css').textContent = ResultPreview;

    console.log(canvasInfo['addCss'] || ";");
    return <>
      <div
        style={{
          ...style.canvas,
          transform: `translate(calc(-50% + ${this.state.canvasViewOffsetX}px),calc(-50% + ${this.state.canvasViewOffsetY}px)) scale(${this.state.canvasViewScale})`
        }} className={'transparent_checker redGradient_canvas '}>
        {
          this.state.editCanvasOnly ? <div
            className={'transparent_checker'}
            cssText={canvasInfo['addCss'] || ""}
            style={{

              width: `${canvasInfo.width}px`, height: `${canvasInfo.height}px`,
              background: CALC_GRADIENT.calcGradients(layers, true, bgColor),
              backgroundBlendMode: CALC_GRADIENT.calcBlendMode(layers),
              // transition: 'width 0.2s, height 0.2s',
              ...RedCanvas.getContainerCss(canvasInfo, borderGradientInfo),
              filter: RedCanvas.getFilterCss(canvasInfo['filterList']),
              overflow: 'hidden',
            }}

          /> : <div className={"red_gradient_result"} />
        }


        {/*<div style={{position : 'absolute',top:'50%',left : '50%',transform : 'translate(-50%,-50%)'}}>RedGradient</div>*/}
        {/*<div>{borderW}/{borderH}</div>*/}

        {
          this.state.visualEditMode === MODE.GRADIENT
            ? this.renderGradientEdit(rootComponentState, activeSubData, canvasInfo, appState)
            : this.state.visualEditMode === MODE.CONTAINER
            ? this.renderContainerEdit(rootComponentState, activeSubData, canvasInfo, appState)
            : this.renderBorderRadiusEdit(rootComponentState, activeSubData, canvasInfo, appState)
        }
      </div>
      {this.renderVisualEditMode(canvasInfo, activeSubData)}
    </>;
  }

  renderBorderRadiusEdit(rootComponentState, activeSubData, canvasInfo, appState) {
    let cX = this.state.editCanvasOnly ? -canvasInfo['left'] || 0 : 0;
    let cY = this.state.editCanvasOnly ? -canvasInfo['top'] || 0 : 0;
    if (rootComponentState['key'] !== ACTIVE_FRAME_KEY.MAIN && !this.state.editCanvasOnly) {
      {
        const mainCanvasInfo = appState[ACTIVE_FRAME_KEY.MAIN]['canvasInfo'];
        const borderW = mainCanvasInfo['border_width_mergeMode'] ? mainCanvasInfo['border_width'] : (mainCanvasInfo['border_width_split'][1] + mainCanvasInfo['border_width_split'][3]);
        const borderH = mainCanvasInfo['border_width_mergeMode'] ? mainCanvasInfo['border_width'] : (mainCanvasInfo['border_width_split'][0] + mainCanvasInfo['border_width_split'][2]);
        cX += borderW;
        cY += borderH;
      }
    }
    const layoutSize = {
      w: canvasInfo['width'],
      h: canvasInfo['height'],
      x: canvasInfo['left'] + cX,
      y: canvasInfo['top'] + cY
    };
    console.log('layoutSize', layoutSize);
    const borderRadius = canvasInfo['border_radius_mergeMode'] ? [canvasInfo.border_radius, canvasInfo.border_radius, canvasInfo.border_radius, canvasInfo.border_radius] : canvasInfo['border_radius_split'];
    return this.state.layerSizeView ? <div
      style={{
        zIndex: 1,
        position: 'absolute',
        left: `${layoutSize['x']}px`,
        top: `${layoutSize['y']}px`,
        width: `${layoutSize['w']}px`,
        height: `${layoutSize['h']}px`,
        border: '1px dashed #000',
        outline: '1px dashed rgba(255,255,255,0.75)',
        color: '#000'
      }}
    >

      {
        <>
          <div style={{
            position: 'absolute',
            top: Math.max(0, Math.min(borderRadius[0], canvasInfo['height'] / 2)),
            left: Math.max(0, Math.max(Math.min(borderRadius[0], canvasInfo['width'] / 2))),
            transform: 'translate(-50%,-50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: '#fff',
            border: '1px solid #000',
            cursor: 'pointer'
          }}
               onMouseDown={e => {
                 e.stopPropagation();
                 ghostMode = true;
                 this.setModes({
                   radiusMode: {
                     mode: 'nw',
                     startRadius: borderRadius,
                     startX: e.nativeEvent.pageX,
                     startY: e.nativeEvent.pageY
                   }
                 });
               }}
          />
          <div style={{
            position: 'absolute',
            bottom: Math.max(0, Math.min(borderRadius[1], canvasInfo['height'] / 2)),
            left: Math.max(0, Math.max(Math.min(borderRadius[1], canvasInfo['width'] / 2))),
            transform: 'translate(-50%,50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: '#fff',
            border: '1px solid #000',
            cursor: 'pointer'
          }}
               onMouseDown={e => {
                 e.stopPropagation();
                 ghostMode = true;
                 this.setModes({
                   radiusMode: {
                     mode: 'sw',
                     startRadius: borderRadius,
                     startX: e.nativeEvent.pageX,
                     startY: e.nativeEvent.pageY
                   }
                 });
               }}
          />
          <div style={{
            position: 'absolute',
            top: Math.max(0, Math.min(borderRadius[2], canvasInfo['height'] / 2)),
            left: Math.min(Math.max(canvasInfo['width'] / 2, canvasInfo['width'] - borderRadius[2]), canvasInfo['width']),
            transform: 'translate(-50%,-50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: '#fff',
            border: '1px solid #000',
            cursor: 'pointer'
          }}
               onMouseDown={e => {
                 e.stopPropagation();
                 ghostMode = true;
                 this.setModes({
                   radiusMode: {
                     mode: 'ne',
                     startRadius: borderRadius,
                     startX: e.nativeEvent.pageX,
                     startY: e.nativeEvent.pageY
                   }
                 });
               }}
          />
          <div style={{
            position: 'absolute',
            bottom: Math.max(0, Math.min(borderRadius[3], canvasInfo['height'] / 2)),
            left: Math.min(Math.max(canvasInfo['width'] / 2, canvasInfo['width'] - borderRadius[3]), canvasInfo['width']),
            transform: 'translate(-50%,50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: '#fff',
            border: '1px solid #000',
            cursor: 'pointer'
          }}
               onMouseDown={e => {
                 e.stopPropagation();
                 ghostMode = true;
                 this.setModes({
                   radiusMode: {
                     mode: 'se',
                     startRadius: borderRadius,
                     startX: e.nativeEvent.pageX,
                     startY: e.nativeEvent.pageY
                   }
                 });
               }}
          />
          {/*<div style={{*/}
          {/*  position : 'absolute',top:0,right:0,*/}
          {/*  transform : 'translate(50%,-50%)',*/}
          {/*  display : 'flex', justifyContent : 'center', alignItems : 'center', width : '20px', height : '20px', borderRadius : '50%', background : 'red'*/}
          {/*}}>o</div>*/}
          {/*<div style={{*/}
          {/*  position : 'absolute',bottom:0,right:0,*/}
          {/*  transform : 'translate(50%,50%)',*/}
          {/*  display : 'flex', justifyContent : 'center', alignItems : 'center', width : '20px', height : '20px', borderRadius : '50%', background : 'red'*/}
          {/*}}>o</div>*/}
          {/*<div style={{*/}
          {/*  position : 'absolute',bottom:0,left:0,*/}
          {/*  transform : 'translate(-50%,50%)',*/}
          {/*  display : 'flex', justifyContent : 'center', alignItems : 'center', width : '20px', height : '20px', borderRadius : '50%', background : 'red'*/}
          {/*}}>o</div>*/}

        </>
      }
      {/*<div style={{background: 'rgba(255,255,255,0.8)'}}>보더에디터 - 작업중</div>*/}
    </div> : '';
  }

  renderVisualEditMode(canvasInfo, activeSubData) {
    return <div style={{
      position: 'absolute',
      top: 110,
      left: 10,
    }}>
      <div style={{
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '3px'
      }}>
        <span
          style={{color: '#efb26a'}}>Container size </span> : {+canvasInfo['width'].toFixed(2)} * {+canvasInfo['height'].toFixed(2)}
      </div>
      <div style={{
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '3px'
      }}>
        <span
          style={{color: '#efb26a'}}>Gradient size </span> : {activeSubData['size']['w'].toFixed(2)}{activeSubData['size']['wUnit']} * {activeSubData['size']['h'].toFixed(2)}{activeSubData['size']['hUnit']}
      </div>
      <div style={{
        marginBottom: '3px'
      }}>
        <div style={{color: '#efb26a'}}>Edit target</div>
        <div style={{
          marginTop: '3px',
          display:'inline-block'

        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid #000',
          }}>
            {
              Object.values(MODE).map((v,index) => {
                return <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent : 'space-between',
                    cursor: 'pointer',
                    color: '#fff',
                    borderLeft: index ? '1px solid #000' : 0,
                    padding: '6px',
                    background: this.state.visualEditMode === v ? 'linear-gradient(rgb(94, 122, 222), rgb(44, 53, 101))' : '#333333'
                  }}
                  onClick={e => {
                    this.setState({visualEditMode: v});
                  }}
                >{v}</div>;
              })
            }
          </div>
        </div>
      </div>

    </div>;
  }

  renderContainerEdit(rootComponentState, activeSubData, canvasInfo, appState) {
    let cX = this.state.editCanvasOnly ? -canvasInfo['left'] : 0;
    let cY = this.state.editCanvasOnly ? -canvasInfo['top'] : 0;

    if (rootComponentState['key'] !== ACTIVE_FRAME_KEY.MAIN && !this.state.editCanvasOnly) {
      {
        const mainCanvasInfo = appState[ACTIVE_FRAME_KEY.MAIN]['canvasInfo'];
        const borderW = mainCanvasInfo['border_width_mergeMode'] ? mainCanvasInfo['border_width'] : (mainCanvasInfo['border_width_split'][1] + mainCanvasInfo['border_width_split'][3]);
        const borderH = mainCanvasInfo['border_width_mergeMode'] ? mainCanvasInfo['border_width'] : (mainCanvasInfo['border_width_split'][0] + mainCanvasInfo['border_width_split'][2]);
        cX += borderW;
        cY += borderH;
      }
    }

    const layoutSize = {
      w: canvasInfo['width'],
      h: canvasInfo['height'],
      x: canvasInfo['left'] + cX,
      y: canvasInfo['top'] + cY
    };
    const iconScale = Math.min(1, 1 / this.state.canvasViewScale);
    return this.state.layerSizeView ? <div
      style={{
        zIndex: 1,
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
        display: rootComponentState['key'] === ACTIVE_FRAME_KEY.MAIN ? 'none' : 'flex',
        alignItems: 'center', justifyContent: 'center',
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
            startValueX: canvasInfo['left'],
            startValueY: canvasInfo['top'],
            startX: e.nativeEvent.pageX,
            startY: e.nativeEvent.pageY
          }
        });
      }}>
        <FontAwesomeIcon icon={faArrowLeft} style={{fontSize: '17px', transform: `rotate(90deg)`}} />
      </div>
      <div style={{
        bottom: 0,
        left: '50%',
        transform: `translate(-50%, ${20 + 36 * iconScale}px) scale(${iconScale})`,
        transition: 'transform 0.2s',
        position: 'absolute', width: '30px', height: '30px',
        display: rootComponentState['key'] === ACTIVE_FRAME_KEY.MAIN ? 'none' : 'flex',
        alignItems: 'center', justifyContent: 'center',
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
            startValueX: canvasInfo['left'],
            startValueY: canvasInfo['top'],
            startX: e.nativeEvent.pageX,
            startY: e.nativeEvent.pageY
          }
        });
      }}>
        <FontAwesomeIcon icon={faArrowLeft} style={{fontSize: '17px', transform: 'rotate(-90deg)'}} />
      </div>
      <div style={{
        bottom: '50%',
        left: 0,
        transform: `translate(-${20 + 36 * iconScale}px, 50%) scale(${iconScale})`,
        transition: 'transform 0.2s',
        position: 'absolute', width: '30px', height: '30px',
        display: rootComponentState['key'] === ACTIVE_FRAME_KEY.MAIN ? 'none' : 'flex',
        alignItems: 'center', justifyContent: 'center',
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
            startValueX: canvasInfo['left'],
            startValueY: canvasInfo['top'],
            startX: e.nativeEvent.pageX,
            startY: e.nativeEvent.pageY
          }
        });
      }}>
        <FontAwesomeIcon icon={faArrowLeft} style={{fontSize: '17px'}} />
      </div>
      <div style={{
        bottom: '50%',
        right: 0,
        transform: `translate(${20 + 36 * iconScale}px, 50%) scale(${iconScale})`,
        transition: 'transform 0.2s',
        position: 'absolute', width: '30px', height: '30px',
        display: rootComponentState['key'] === ACTIVE_FRAME_KEY.MAIN ? 'none' : 'flex',
        alignItems: 'center', justifyContent: 'center',
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
            startValueX: canvasInfo['left'],
            startValueY: canvasInfo['top'],
            startX: e.nativeEvent.pageX,
            startY: e.nativeEvent.pageY
          }
        });
      }}>
        <FontAwesomeIcon icon={faArrowLeft} style={{fontSize: '17px', transform: 'rotate(180deg)'}} />
      </div>
      <div style={{
        bottom: 0,
        left: '50%',
        transform: `translate(-50%, ${20 + 76 * iconScale}px) scale(${iconScale})`,
        transition: 'transform 0.2s',
        position: 'absolute',
        width: '30px',
        height: '30px',
        display: rootComponentState['key'] === ACTIVE_FRAME_KEY.MAIN ? 'none' : 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'move',
        border: '1px solid #5e7ade',
        borderRadius: '50%',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
        background: '#5e7ade',

      }} onMouseDown={e => {
        e.stopPropagation();
        ghostMode = true;
        this.setModes({
          positionMode: {
            mode: 'all',
            startValueX: canvasInfo['left'],
            startValueY: canvasInfo['top'],
            startX: e.nativeEvent.pageX,
            startY: e.nativeEvent.pageY
          }
        });
      }}>
        <FontAwesomeIcon icon={faArrowsAlt} style={{color: '#fff', fontSize: '17px', transform: 'rotate(-90deg)'}} />
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
            background: 'rgba(84,114,208,1)',
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
          <FontAwesomeIcon icon={faExpandAlt} style={{color: '#fff', fontSize: '17px', transform: 'scale(-1,1)'}} />
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
            background: 'rgba(84,114,208,1)',
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
          <FontAwesomeIcon icon={faExpandAlt} style={{color: '#fff', fontSize: '17px', transform: 'scale(1,1)'}} />
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
            background: 'rgba(84,114,208,1)',
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
          <FontAwesomeIcon icon={faExpandAlt} style={{color: '#fff', fontSize: '17px', transform: 'scale(1,1)'}} />
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
            background: 'rgba(84,114,208,1)',
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
          <FontAwesomeIcon icon={faExpandAlt} style={{color: '#fff', fontSize: '17px', transform: 'scale(-1,1)'}} />
        </div>
        {/*  */}
        <div
          style={{
            top: '50%', left: 0, transform: `translate(-${16 + 7 * iconScale}px, -50%) scale(${iconScale})`,
            transition: 'transform 0.2s',
            position: 'absolute', width: '23px', height: '23px',
            cursor: 'w-resize',
            background: 'rgba(84,114,208,1)',
            display: activeSubData['fixRatioYn'] ? 'none' : 'flex',
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
          <FontAwesomeIcon icon={faArrowsAltH} style={{color: '#fff', fontSize: '17px', transform: 'scale(1,1)'}} />
        </div>
        <div
          style={{
            top: '50%', right: 0, transform: `translate(${16 + 7 * iconScale}px, -50%) scale(${iconScale})`,
            transition: 'transform 0.2s',
            position: 'absolute', width: '23px', height: '23px',
            cursor: 'e-resize',
            background: 'rgba(84,114,208,1)',
            display: activeSubData['fixRatioYn'] ? 'none' : 'flex',
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
          <FontAwesomeIcon icon={faArrowsAltH} style={{color: '#fff', fontSize: '17px', transform: 'scale(1,1)'}} />
        </div>
        <div
          style={{
            top: 0, left: '50%', transform: `translate(-50%, -${16 + 7 * iconScale}px) scale(${iconScale})`,
            transition: 'transform 0.2s',
            position: 'absolute', width: '23px', height: '23px',
            cursor: 'n-resize',
            background: 'rgba(84,114,208,1)',
            display: activeSubData['fixRatioYn'] ? 'none' : 'flex',
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
          <FontAwesomeIcon icon={faArrowsAltV} style={{color: '#fff', fontSize: '17px', transform: 'scale(1,1)'}} />
        </div>
        <div
          style={{
            bottom: 0, left: '50%', transform: `translate(-50%, ${16 + 7 * iconScale}px) scale(${iconScale})`,
            transition: 'transform 0.2s',
            position: 'absolute', width: '23px', height: '23px',
            cursor: 's-resize',
            background: 'rgba(84,114,208,1)',
            display: activeSubData['fixRatioYn'] ? 'none' : 'flex',
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
          <FontAwesomeIcon icon={faArrowsAltV} style={{color: '#fff', fontSize: '17px', transform: 'scale(1,1)'}} />
        </div>
      </>
    </div> : '';

  }

  renderGradientEdit(rootComponentState, activeSubData, canvasInfo, appState) {
    const activeSubDataPosition = activeSubData['position'];
    const activeSubDataAt = activeSubData['at'];
    const activeSubDataSize = activeSubData['size'];
    let cX = this.state.editCanvasOnly ? 0 : canvasInfo['left'];
    let cY = this.state.editCanvasOnly ? 0 : canvasInfo['top'];
    const borderW = canvasInfo['border_width_mergeMode'] ? canvasInfo['border_width'] * 2 : (canvasInfo['border_width_split'][1] + canvasInfo['border_width_split'][3]);
    const borderH = canvasInfo['border_width_mergeMode'] ? canvasInfo['border_width'] * 2 : (canvasInfo['border_width_split'][0] + canvasInfo['border_width_split'][2]);
    const borderX = canvasInfo['border_width_mergeMode'] ? canvasInfo['border_width'] : canvasInfo['border_width_split'][3];
    const borderY = canvasInfo['border_width_mergeMode'] ? canvasInfo['border_width'] : canvasInfo['border_width_split'][0];
    if (rootComponentState['key'] !== ACTIVE_FRAME_KEY.MAIN && !this.state.editCanvasOnly) {
      {
        const mainCanvasInfo = appState[ACTIVE_FRAME_KEY.MAIN]['canvasInfo'];
        const borderW = mainCanvasInfo['border_width_mergeMode'] ? mainCanvasInfo['border_width'] : (mainCanvasInfo['border_width_split'][1] + mainCanvasInfo['border_width_split'][3]);
        const borderH = mainCanvasInfo['border_width_mergeMode'] ? mainCanvasInfo['border_width'] : (mainCanvasInfo['border_width_split'][0] + mainCanvasInfo['border_width_split'][2]);
        cX += borderW;
        cY += borderH;
      }
    }
    const layoutSize = {
      w: activeSubDataSize['wUnit'] === '%' ? (canvasInfo['width'] - borderW) * activeSubDataSize['w'] / 100 : activeSubDataSize['w'] - borderW,
      h: activeSubDataSize['hUnit'] === '%' ? (canvasInfo['height'] - borderH) * activeSubDataSize['h'] / 100 : activeSubDataSize['h'] - borderH,
    };
    layoutSize['x'] = (activeSubDataPosition['xUnit'] === '%' ? (canvasInfo.width - layoutSize.w - borderW) * (activeSubDataPosition['x'] / 100) : activeSubDataPosition['x']) + borderX;
    layoutSize['y'] = (activeSubDataPosition['yUnit'] === '%' ? (canvasInfo.height - layoutSize.h - borderH) * (activeSubDataPosition['y'] / 100) : activeSubDataPosition['y']) + borderY;

    const lX = activeSubDataAt['xUnit'] === 'px' ? `${activeSubDataAt['x'] - borderX}${activeSubDataAt['xUnit']}` : `${layoutSize['w'] * activeSubDataAt['x'] / 100}px`;
    const lY = activeSubDataAt['yUnit'] === 'px' ? `${activeSubDataAt['y'] - borderY}${activeSubDataAt['yUnit']}` : `${layoutSize['h'] * activeSubDataAt['y'] / 100}px`;
    if (ghostMode && !ghostSize) ghostSize = {...layoutSize};
    const iconScale = Math.min(1, 1 / this.state.canvasViewScale);
    return <>
      {
        <div
          style={{
            position: 'absolute',
            left: `${ghostSize ? ghostSize['x'] + cX : 0}px`,
            top: `${ghostSize ? ghostSize['y'] + cY : 0}px`,
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
            zIndex: 1,
            position: 'absolute',
            left: `${layoutSize['x'] + cX}px`,
            top: `${layoutSize['y'] + cY}px`,
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
                startValueX: activeSubData['position']['x'],
                startValueY: activeSubData['position']['y'],
                startX: e.nativeEvent.pageX,
                startY: e.nativeEvent.pageY
              }
            });
          }}>
            <FontAwesomeIcon icon={faArrowLeft} style={{fontSize: '17px', transform: `rotate(90deg)`}} />
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
                startValueX: activeSubData['position']['x'],
                startValueY: activeSubData['position']['y'],
                startX: e.nativeEvent.pageX,
                startY: e.nativeEvent.pageY
              }
            });
          }}>
            <FontAwesomeIcon icon={faArrowLeft} style={{fontSize: '17px', transform: 'rotate(-90deg)'}} />
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
                startValueX: activeSubData['position']['x'],
                startValueY: activeSubData['position']['y'],
                startX: e.nativeEvent.pageX,
                startY: e.nativeEvent.pageY
              }
            });
          }}>
            <FontAwesomeIcon icon={faArrowLeft} style={{fontSize: '17px'}} />
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
                startValueX: activeSubData['position']['x'],
                startValueY: activeSubData['position']['y'],
                startX: e.nativeEvent.pageX,
                startY: e.nativeEvent.pageY
              }
            });
          }}>
            <FontAwesomeIcon icon={faArrowLeft} style={{fontSize: '17px', transform: 'rotate(180deg)'}} />
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
                startValueX: activeSubData['position']['x'],
                startValueY: activeSubData['position']['y'],
                startX: e.nativeEvent.pageX,
                startY: e.nativeEvent.pageY
              }
            });
          }}>
            <FontAwesomeIcon icon={faArrowsAlt} style={{fontSize: '17px', transform: 'rotate(-90deg)'}} />
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
              <FontAwesomeIcon icon={faExpandAlt} style={{fontSize: '17px', transform: 'scale(-1,1)'}} />
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
              <FontAwesomeIcon icon={faExpandAlt} style={{fontSize: '17px', transform: 'scale(1,1)'}} />
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
              <FontAwesomeIcon icon={faExpandAlt} style={{fontSize: '17px', transform: 'scale(1,1)'}} />
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
              <FontAwesomeIcon icon={faExpandAlt} style={{fontSize: '17px', transform: 'scale(-1,1)'}} />
            </div>
            {/*  */}
            <div
              style={{
                top: '50%', left: 0, transform: `translate(-${16 + 7 * iconScale}px, -50%) scale(${iconScale})`,
                transition: 'transform 0.2s',
                position: 'absolute', width: '23px', height: '23px',
                cursor: 'w-resize',
                background: 'rgba(255,255,255,0.75)',
                display: activeSubData['fixRatioYn'] ? 'none' : 'flex',
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
              <FontAwesomeIcon icon={faArrowsAltH} style={{fontSize: '17px', transform: 'scale(1,1)'}} />
            </div>
            <div
              style={{
                top: '50%', right: 0, transform: `translate(${16 + 7 * iconScale}px, -50%) scale(${iconScale})`,
                transition: 'transform 0.2s',
                position: 'absolute', width: '23px', height: '23px',
                cursor: 'e-resize',
                background: 'rgba(255,255,255,0.75)',
                display: activeSubData['fixRatioYn'] ? 'none' : 'flex',
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
              <FontAwesomeIcon icon={faArrowsAltH} style={{fontSize: '17px', transform: 'scale(1,1)'}} />
            </div>
            <div
              style={{
                top: 0, left: '50%', transform: `translate(-50%, -${16 + 7 * iconScale}px) scale(${iconScale})`,
                transition: 'transform 0.2s',
                position: 'absolute', width: '23px', height: '23px',
                cursor: 'n-resize',
                background: 'rgba(255,255,255,0.75)',
                display: activeSubData['fixRatioYn'] ? 'none' : 'flex',
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
              <FontAwesomeIcon icon={faArrowsAltV} style={{fontSize: '17px', transform: 'scale(1,1)'}} />
            </div>
            <div
              style={{
                bottom: 0, left: '50%', transform: `translate(-50%, ${16 + 7 * iconScale}px) scale(${iconScale})`,
                transition: 'transform 0.2s',
                position: 'absolute', width: '23px', height: '23px',
                cursor: 's-resize',
                background: 'rgba(255,255,255,0.75)',
                display: activeSubData['fixRatioYn'] ? 'none' : 'flex',
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
              <FontAwesomeIcon icon={faArrowsAltV} style={{fontSize: '17px', transform: 'scale(1,1)'}} />
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
                    <div>{(+activeSubData['deg']).toFixed(1)}<br /><span style={{fontSize: '10px'}}>deg</span></div>
                    <div style={{
                      lineHeight: 1,
                      width: '10px', height: '10px',
                      border: '1px solid #5e7ade',
                      borderRadius: '50%',
                      position: 'absolute',
                      transform: 'translate(-50%,-50%)',
                      top: `calc(50% + ${Math.sin(Math.PI / 180 * (activeSubData['deg'] - 90)) * 20}px)`,
                      left: `calc(50% + ${Math.cos(Math.PI / 180 * (activeSubData['deg'] - 90)) * 20}px)`
                    }} />
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
                        startDeg: activeSubData['deg'],
                        mode: 'nw'
                      }
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faSyncAlt} style={{transform: 'rotate(0deg)'}} />
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
                        startDeg: activeSubData['deg'],
                        mode: 'ne'
                      }
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faSyncAlt} style={{transform: 'rotate(0deg)'}} />
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
                        startDeg: activeSubData['deg'],
                        mode: 'se'
                      }
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faSyncAlt} style={{transform: 'rotate(0deg)'}} />
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
                        startDeg: activeSubData['deg'],
                        mode: 'sw'
                      }
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faSyncAlt} style={{transform: 'rotate(0deg)'}} />
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
    </>;
  }

  setModes(v = {}) {
    this.state.useMove = false;
    this.state.resizeMode = false;
    this.state.degreeMode = false;
    this.state.atMode = false;
    this.state.positionMode = false;
    this.state.radiusMode = false;
    this.setState(v);
  }

  checkResize = RedCanvas_checkResize;
  checkDegree = RedCanvas_checkDegree;
  checkAt = RedCanvas_checkAt;
  checkPosition = RedCanvas_checkPosition;
  checkRadius = RedCanvas_checkRadius;

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
    const activeLayer = rootComponentState.activeLayer;
    return <div
      style={style.container}
      onMouseMove={e => {
        this.checkCanvasMove(e);
        if (this.state.visualEditMode === MODE.GRADIENT) {
          this.checkPosition(e);
          this.checkResize(e);
          this.checkDegree(e);
          this.checkAt(e);
        } else if (this.state.visualEditMode === MODE.CONTAINER) {
          this.checkPosition(e, true);
          this.checkResize(e, true);
        } else {
          this.checkRadius(e, true);
        }


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
      <ActiveSelectBar appComponent={this.props.appComponent} />
      {this.drawCall(canvasInfo, layers, rootComponentState.bgColor, activeLayer)}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        // transform: 'translate(-50%,0)'
      }}>
        <div style={style.canvasViewInfo}>
          <div style={style.toCenter} onClick={() => this.setState({canvasViewOffsetX: 0, canvasViewOffsetY: 0})}>set
            Center
          </div>
          <div style={style.toScale} onClick={() => this.setState({canvasViewScale: 1})}>setScale 1x</div>
          <div style={style.toScale} onClick={() => this.setState({canvasViewScale: 0.5})}>setScale 0.5x</div>


        </div>

        <div style={{marginLeft: '5px', color: '#fff'}}><span style={{color: '#efb26a'}}>Center </span>
          : {this.state.canvasViewOffsetX.toFixed(2)},{this.state.canvasViewOffsetY.toFixed(2)} <span
            style={{color: '#efb26a'}}>ViewScale </span> : {this.state.canvasViewScale.toFixed(2)}</div>
      </div>
    </div>;
  }
}

export default RedCanvas;
RedCanvas.getFilterCss = (filterList = []) => {
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
  },
  canvasViewInfo: {
    padding : '3px 4px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
  },
  toCenter: {
    background: '#5e7ade',
    display: 'flex',
    borderRadius: '4px',
    padding: '3px 8px',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    outline: 'none',
    border: 0,
    color: '#fff'
  },
  toScale: {
    marginLeft: '4px',
    background: '#7235d4',
    display: 'flex',
    borderRadius: '4px',
    padding: '3px 8px',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    outline: 'none',
    border: 0,
    color: '#fff'
  }
};
