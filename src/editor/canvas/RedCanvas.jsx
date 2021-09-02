/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import CALC_GRADIENT from "../../js/CALC_GRADIENT";
import RedCanvasFilter from "../edit/container/filter/RedFlterItem.jsx";
import RedGradientEditComp from "../edit/gradient/RedGradientEditComp";
import ACTIVE_FRAME_KEY from "../../js/const/ACTIVE_FRAME_KEY";
import RedCanvas_checkResize from "./visualEdit/RedCanvas_checkResize";

import RedCanvas_checkAt from "./visualEdit/RedCanvas_checkAt";
import RedCanvas_checkPosition from "./visualEdit/RedCanvas_checkPosition";
import RedCanvas_checkRadius from "./visualEdit/RedCanvas_checkRadius";
import ActiveSelectBar from "../ActiveSelectBar";
import RedTitle from "../../core/RedTitle";
import renderGradientEdit from "./visualEdit/renderGradientEdit";
import renderContainerEdit from "./visualEdit/renderContainerEdit";
import renderBorderRadiusEdit from "./visualEdit/renderBorderRadiusEdit";
import renderVisualEditMode from "./visualEdit/renderVisualEditMode";
import VISUAL_EDIT_MODE from "../../js/const/VISUAL_EDIT_MODE";
import js_beautify from "js-beautify";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-solid-svg-icons";
import Ruler from "@scena/react-ruler";

// TODO - 정리필요

class RedCanvas extends React.Component {

  renderBorderRadiusEdit = renderBorderRadiusEdit;
  renderContainerEdit = renderContainerEdit;
  renderGradientEdit = renderGradientEdit;
  renderVisualEditMode = renderVisualEditMode;
  //
  checkResize = RedCanvas_checkResize;
  checkAt = RedCanvas_checkAt;
  checkPosition = RedCanvas_checkPosition;
  checkRadius = RedCanvas_checkRadius;

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
      visualEditMode: VISUAL_EDIT_MODE.GRADIENT
    };
    this.refColorPickerContainer = React.createRef();
    this.refDegree = React.createRef();
    this.refDegreeCanvas = React.createRef();
  }

  drawCall(canvasInfo, layers, bgColor) {
    const rootComponent = this.props.rootComponent;
    // console.log('this',this)
    console.log(rootComponent.state);
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData || (rootComponentState.activeSubDataIndex = 0 || rootComponentState.activeLayer['items'][0]);
    /////////////////////
    activeSubData['position']['x'] = +activeSubData['position']['x'];
    activeSubData['position']['y'] = +activeSubData['position']['y'];
    activeSubData['size']['w'] = +activeSubData['size']['w'];
    activeSubData['size']['h'] = +activeSubData['size']['h'];
    activeSubData['at']['x'] = +activeSubData['at']['x'];
    activeSubData['at']['y'] = +activeSubData['at']['y'];
    /////////////////////

    const borderGradientInfo = rootComponentState.borderGradientInfo;

    ////////////////////
    /////////
    const appState = this.props.appComponent.state;
    let beforeText = RedGradientEditComp.getContainerCssText(appState[ACTIVE_FRAME_KEY.BEFORE]);
    let mainText = RedGradientEditComp.getContainerCssText(appState[ACTIVE_FRAME_KEY.MAIN]);
    let afterText = RedGradientEditComp.getContainerCssText(appState[ACTIVE_FRAME_KEY.AFTER]);
    let beforeText2 = beforeText.replace('.result', '.red_gradient_result');
    let mainText2 = mainText.replace('.result', '.red_gradient_result');
    let afterText2 = afterText.replace('.result', '.red_gradient_result');
    document.getElementById('red_gradient_result_css').textContent = `
    ${beforeText2}
    ${mainText2}
    ${afterText2}
    `;

    console.log(canvasInfo['addCss'] || ";");
    const device = appState['device'];
    return <>
      <div
        style={{
          ...style.canvas,
          transform: `translate(calc(-50% + ${this.state.canvasViewOffsetX}px),calc(-50% + ${this.state.canvasViewOffsetY}px)) scale(${this.state.canvasViewScale})`
        }} className={'transparent_checker redGradient_canvas '}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,calc(-50% - 20px))',
          ...(this.state.editCanvasOnly ? {} : {
            width: `${device['width']}px`,
            height: `${device['height']}px`,
            borderRadius: '20px',
            boxSizing: 'content-box',
            border: '30px solid #171717',
            borderTop: '80px solid #171717',
            borderBottom: '40px solid #171717',
            boxShadow: '0px 0px 20px rgba(0,0,0,0.5)',
            transition: 'width 0.1s, height 0.1s'
          }),
        }} />
        {
          this.state.editCanvasOnly ? '' : <>
            <Ruler type="horizontal" direction="end" style={{
              display: "block",
              height: "20px",
              position: 'absolute',
              width: `${device['width']}px`,
              top: `${-device['height'] / 2 - 20}px`,
              left: `${-device['width'] / 2}px`,
            }} backgroundColor={'transparent'} lineColor={'#525252'} textColor={'#98866f'} textOffset={[0, 5]} />
            <Ruler type="vertical" direction="end" style={{
              display: "block",
              width: "20px",
              position: 'absolute',
              height: `${device['height']}px`,
              top: `${-device['height'] / 2}px`,
              left: `${-device['width'] / 2 - 20}px`,
            }} backgroundColor={'transparent'} lineColor={'#525252'} textColor={'#98866f'} textOffset={[5, 0]}
                   negativeRuler />
          </>
        }

        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          ...(this.state.editCanvasOnly ? {} : {
            width: `${device['width']}px`,
            height: `${device['height']}px`,
            background: '#fff',
            transition: 'width 0.1s, height 0.1s'
          }),
          overflow: 'hidden'
        }}>
          {
            this.state.editCanvasOnly ? '' : <div className={"red_gradient_result"} />
          }
        </div>
      </div>
      <div
        style={{
          ...style.canvas,
          transform: `translate(calc(-50% + ${this.state.canvasViewOffsetX}px),calc(-50% + ${this.state.canvasViewOffsetY}px)) scale(${this.state.canvasViewScale})`
        }} className={'transparent_checker redGradient_canvas '}>


        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          ...(this.state.editCanvasOnly ? {} : {
            width: `${device['width']}px`,
            height: `${device['height']}px`,
            transition: 'width 0.1s, height 0.1s'
          })
          // overflow : 'hidden'
        }}>
          {
            this.state.editCanvasOnly ? <div
              className={'transparent_checker'}
              //TODO - cssText 확인
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

            /> : ''
          }
          {
            this.state.visualEditMode === VISUAL_EDIT_MODE.GRADIENT
              ? this.renderGradientEdit(rootComponentState, activeSubData, canvasInfo, appState)
              : this.state.visualEditMode === VISUAL_EDIT_MODE.CONTAINER
                ? this.renderContainerEdit(rootComponentState, activeSubData, canvasInfo, appState)
                : this.renderBorderRadiusEdit(rootComponentState, activeSubData, canvasInfo, appState)
          }
        </div>
      </div>
      {this.renderVisualEditMode(rootComponentState, canvasInfo, activeSubData)}
      <button
        style={{
          position: 'absolute',
          top: '64px',
          right: '6px',
          cursor: 'pointer',
          padding: '6px',
          fontSize: '12px',
          color: '#fff',
          outline: 'none',
          border: '1px solid #111',
          background: 'linear-gradient(#5e7ade, #2c3565)',
          borderRadius: '4px'
        }}
        onClick={() => {
          const tempElem = document.createElement('textarea');

          tempElem.value = js_beautify.css_beautify(`
    ${beforeText}
    ${RedGradientEditComp.getContainerCssText(appState[ACTIVE_FRAME_KEY.MAIN], true)}
    ${afterText}
    `, {
            indent_size: 2,
            space_in_empty_paren: true,
            max_preserve_newlines: 1
          });
          document.body.appendChild(tempElem);
          tempElem.select();
          document.execCommand("copy");
          document.body.removeChild(tempElem);
          toast.dark("Copy Result Class!", {
            position: 'bottom-left'
          });
        }}
      ><FontAwesomeIcon icon={faCopy} style={{marginRight: '6px'}} />Copy Result Class
      </button>
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
        if (this.state.visualEditMode === VISUAL_EDIT_MODE.GRADIENT) {
          this.checkPosition(e);
          this.checkResize(e);
          this.checkAt(e);
        } else if (this.state.visualEditMode === VISUAL_EDIT_MODE.CONTAINER) {
          this.checkPosition(e, true);
          this.checkResize(e, true);
        } else {
          this.checkRadius(e, true);
        }


      }}
      onMouseLeave={() => this.setModes()}
      onMouseUp={() => {
        this.setModes();
        RedCanvas.ghostMode = false;
        RedCanvas.ghostSize = null;
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
      <RedTitle title={'Container Information'} style={{zIndex: 1}} />
      <ActiveSelectBar appComponent={this.props.appComponent} />
      {this.drawCall(canvasInfo, layers, rootComponentState.bgColor, activeLayer)}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        textAlign: 'center',
        transform: 'translate(-50%,0)'
      }}>
        <div style={style.canvasViewInfo}>
          <div style={style.toCenter} onClick={() => this.setState({canvasViewOffsetX: 0, canvasViewOffsetY: 0})}>set
            Center
          </div>
          <div style={style.toScale} onClick={() => this.setState({canvasViewScale: 1})}>setScale 1x</div>
          <div style={style.toScale} onClick={() => this.setState({canvasViewScale: 0.5})}>setScale 0.5x</div>
        </div>
        <div style={{height: '5px'}} />

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
  let borderData;
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
RedCanvas.ghostSize = null;
RedCanvas.ghostMode = null;
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
    padding: '3px 4px',
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
  },


  divide: {
    margin: '5px 0px',
    height: '2px',
    background: '#4e4e4e',
    borderTop: '1px solid #000'
  }
};
