/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import {faArrowDown, faCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const SIZE = 55;
let targetContext;
const HD_move = e => {
  targetContext.calcSize(e);
};
const HD_up = () => {
  window.removeEventListener('mousemove', HD_move);
  window.removeEventListener('mouseup', HD_up);
};

class RedPropertyPositionEditByMouse extends React.Component {
  constructor(props) {
    super(props);
    this.refRect = React.createRef();
  }

  calcSize(e) {
    const rootComponent = targetContext.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    const layerSize = rootComponentState.activeLayer.size;
    const canvasInfo = rootComponentState.canvasInfo;
    const targetKey = this.props.targetKey;
    const rect = targetContext.refRect.current.getBoundingClientRect();
    let tX = (e.pageX - (rect.x));
    let tY = (e.pageY - (rect.y));
    let layerPixelW = canvasInfo.width;
    let layerPixelH = canvasInfo.height;
    let tPercentX = activeSubData[targetKey]['xUnit'] === '%' ? tX / SIZE * 100 : tX * layerPixelW / SIZE;
    let tPercentY = activeSubData[targetKey]['yUnit'] === '%' ? tY / SIZE * 100 : tY * layerPixelH / SIZE;
    activeSubData[targetKey]['x'] = tPercentX;
    activeSubData[targetKey]['y'] = tPercentY;
    rootComponent.updateRootState({});
  }

  setPosition(x, y) {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    const targetKey = this.props.targetKey;
    activeSubData[targetKey]['x'] = x;
    activeSubData[targetKey]['y'] = y;
    rootComponent.updateRootState({});
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    const layerSize = rootComponentState.activeLayer.size;
    const targetData = activeSubData[this.props.targetKey];
    const canvasInfo = rootComponentState.canvasInfo;
    const activeSubDataSize = activeSubData['size']
    const borderW = canvasInfo['border_width_mergeMode'] ? canvasInfo['border_width'] * 2 : (canvasInfo['border_width_split'][1] + canvasInfo['border_width_split'][3])
    const borderH = canvasInfo['border_width_mergeMode'] ? canvasInfo['border_width'] * 2 : (canvasInfo['border_width_split'][0] + canvasInfo['border_width_split'][2])
    const borderX = canvasInfo['border_width_mergeMode'] ? canvasInfo['border_width'] : canvasInfo['border_width_split'][3]
    const borderY = canvasInfo['border_width_mergeMode'] ? canvasInfo['border_width'] : canvasInfo['border_width_split'][0]
    const layoutSize = {
      w: activeSubDataSize['wUnit'] === '%' ? (canvasInfo['width'] - borderW) * activeSubDataSize['w'] / 100 : activeSubDataSize['w'] - borderW,
      h: activeSubDataSize['hUnit'] === '%' ? (canvasInfo['height'] - borderH) * activeSubDataSize['h'] / 100 : activeSubDataSize['h'] - borderH,
    };
    let layerPixelW = layoutSize.w;
    let layerPixelH = layoutSize.h;
    let tPercentX = targetData['xUnit'] === '%' ? (targetData.x === 100 ? targetData.x : (targetData.x) % 100) : (targetData.x === layerPixelW ? (targetData.x / layerPixelW * 100) : (targetData.x / layerPixelW * 100) % 100);
    let tPercentY = targetData['yUnit'] === '%' ? (targetData.y === 100 ? targetData.y : (targetData.y) % 100) : (targetData.y === layerPixelH ? (targetData.y / layerPixelH * 100) : (targetData.y / layerPixelH * 100) % 100);
    if (tPercentX < 0) tPercentX = 100 + tPercentX;
    if (tPercentY < 0) tPercentY = 100 + tPercentY;
    return <div>
      <div
        ref={this.refRect}
        className={'grid'}
        style={style.box}
        onMouseDown={() => {
          targetContext = this;
          window.addEventListener('mousemove', HD_move);
          window.addEventListener('mouseup', HD_up);
        }}
        onClick={e => {
          targetContext = this;
          this.calcSize(e.nativeEvent);
        }}
      >
        <div style={{
          ...style.degreeItem,
          top: `${tPercentY}%`,
          left: `${tPercentX}%`
        }}/>
      </div>
      <div
        className={'grid3_3'}
        style={style.box}
      >
        {/**/}
        <button
          onClick={e => {
            this.setPosition(0, 0);
          }}
          style={{...style.location, top: 0, left: 0}}><FontAwesomeIcon
          icon={faArrowDown}
          style={{transform: 'translate(-50%,-50%) rotate(135deg)', position: 'absolute', top: '50%', left: '50%'}}/>
        </button>
        <button
          onClick={e => {
            let tX = 50;
            if (targetData['xUnit'] === 'px') tX = (canvasInfo['width'] - borderW) * 0.5;
            this.setPosition(tX, 0);
          }}
          style={{...style.location, top: 0, left: '50%', transform: 'translate(-50%,0)'}}><FontAwesomeIcon
          icon={faArrowDown}
          style={{transform: 'translate(-50%,-50%) rotate(180deg)', position: 'absolute', top: '50%', left: '50%'}}/>
        </button>
        <button
          onClick={e => {
            let tX = 100;
            if (targetData['xUnit'] === 'px') tX = (canvasInfo['width'] - borderW);
            this.setPosition(tX, 0);
          }}
          style={{...style.location, top: 0, right: 0}}><FontAwesomeIcon icon={faArrowDown}
                                                                         style={{
                                                                           transform: 'translate(-50%,-50%) rotate(225deg)',
                                                                           position: 'absolute',
                                                                           top: '50%',
                                                                           left: '50%'
                                                                         }}/>
        </button>
        {/**/}
        <button
          onClick={e => {
            {
              let tY = 50;
              if (targetData['yUnit'] === 'px') tY = (canvasInfo['height'] - borderH) * 0.5;
              this.setPosition(0, tY);
            }
          }}
          style={{...style.location, top: '50%', left: 0, transform: 'translate(0%,-50%)'}}><FontAwesomeIcon
          icon={faArrowDown}

          style={{transform: 'translate(-50%,-50%) rotate(90deg)', position: 'absolute', top: '50%', left: '50%'}}/>
        </button>
        <button
          onClick={e => {
            let tX = 50;
            let tY = 50;
            if (targetData['xUnit'] === 'px') tX = (canvasInfo['width'] - borderW) * 0.5;
            if (targetData['yUnit'] === 'px') tY = (canvasInfo['height'] - borderH) * 0.5;
            this.setPosition(tX, tY);
          }}
          style={{...style.location, top: '50%', left: '50%', transform: 'translate(-50%,-50%)'}}><FontAwesomeIcon
          icon={faCircle}
          style={{transform: 'translate(-50%,-50%) rotate(135deg)', position: 'absolute', top: '50%', left: '50%'}}/>

        </button>
        <button
          onClick={e => {
            let tX = 100;
            let tY = 50;
            if (targetData['xUnit'] === 'px') tX = (canvasInfo['width'] - borderW);
            if (targetData['yUnit'] === 'px') tY = (canvasInfo['height'] - borderH) * 0.5;
            this.setPosition(tX, tY);
          }}
          style={{...style.location, top: '50%', right: 0, transform: 'translate(0%,-50%)'}}><FontAwesomeIcon
          icon={faArrowDown}
          style={{transform: 'translate(-50%,-50%) rotate(270deg)', position: 'absolute', top: '50%', left: '50%'}}/>
        </button>
        {/**/}
        <button
          onClick={e => {
            let tY = 100;
            if (targetData['yUnit'] === 'px') tY = (canvasInfo['height'] - borderH);
            this.setPosition(0, tY);
          }}
          style={{...style.location, bottom: 0, left: 0}}><FontAwesomeIcon icon={faArrowDown}
                                                                           style={{
                                                                             transform: 'translate(-50%,-50%) rotate(45deg)',
                                                                             position: 'absolute',
                                                                             top: '50%',
                                                                             left: '50%'
                                                                           }}/>
        </button>
        <button
          onClick={e => {
            let tX = 50;
            let tY = 100;
            if (targetData['xUnit'] === 'px') tX = (canvasInfo['width'] - borderW) * 0.5;
            if (targetData['yUnit'] === 'px') tY = (canvasInfo['height'] - borderH);
            this.setPosition(tX, tY);
          }}
          style={{...style.location, bottom: 0, left: '50%', transform: 'translate(-50%,0)'}}><FontAwesomeIcon
          icon={faArrowDown}
          style={{transform: 'translate(-50%,-50%) rotate(0deg)', position: 'absolute', top: '50%', left: '50%'}}/>
        </button>
        <button
          onClick={e => {
            let tX = 100;
            let tY = 100;
            if (targetData['xUnit'] === 'px') tX = (canvasInfo['width'] - borderW);
            if (targetData['yUnit'] === 'px') tY = (canvasInfo['height'] - borderH);
            this.setPosition(tX, tY);
          }}
          style={{...style.location, bottom: 0, right: 0}}><FontAwesomeIcon icon={faArrowDown}
                                                                            style={{
                                                                              transform: 'translate(-50%,-50%) rotate(315deg)',
                                                                              position: 'absolute',
                                                                              top: '50%',
                                                                              left: '50%'
                                                                            }}/>


        </button>
      </div>

      <div style={{display: 'flex'}}>
        <div style={style.mirrorItem}
             onClick={e => {
               const targetKey = this.props.targetKey;
               let tX = activeSubData[targetKey]['x'];
               let tY = activeSubData[targetKey]['y'];
               if (targetKey === 'at') {
                 if (targetData['xUnit'] === 'px') tX = canvasInfo['width'] - tX;
                 else tX = 100 - tX;
               } else {
                 if (targetData['xUnit'] === 'px') {
                   let tW = activeSubData['size']['w'];
                   tW = activeSubData['size']['wUnit'] === '%' ? tW / 100 * canvasInfo['width'] : tW;
                   tX = canvasInfo['width'] - tX - tW;
                 } else {
                   let tW = activeSubData['size']['w'];
                   tW = activeSubData['size']['wUnit'] === '%' ? tW : tW * canvasInfo['width'] * 100;
                   tX = 100 - tX;
                 }
               }
               this.setPosition(tX, tY);
             }}
        >Mirror H
        </div>
        <div style={style.mirrorItem}
             onClick={e => {
               const targetKey = this.props.targetKey;
               let tX = activeSubData[targetKey]['x'];
               let tY = activeSubData[targetKey]['y'];
               if (targetKey === 'at') {
                 if (targetData['yUnit'] === 'px') tY = canvasInfo['height'] - tY;
                 else tY = 100 - tY;
               } else {
                 if (targetData['yUnit'] === 'px') {
                   let tH = activeSubData['size']['h'];
                   tH = activeSubData['size']['hUnit'] === '%' ? tH / 100 * canvasInfo['height'] : tH;
                   tY = canvasInfo['height'] - tY - tH;
                 } else {
                   let tH = activeSubData['size']['h'];
                   tH = activeSubData['size']['hUnit'] === '%' ? tH : tH * canvasInfo['height'] * 100;
                   tY = 100 - tY;
                 }
               }
               this.setPosition(tX, tY);
             }}
        >Mirror V
        </div>
      </div>
    </div>;
  }
}

export default RedPropertyPositionEditByMouse;
const style = {
  mirrorItem: {
    width: `${SIZE}px`,
    margin: '0 3px',
    background: '#5e7ade',
    padding: '3px 5px',
    fontSize: '11px',
    borderRadius: '4px',
    marginRight: '2px',
    cursor: 'pointer'
  },
  box: {
    display: 'inline-block',
    margin: '5px 3px',
    width: `${SIZE}px`, height: `${SIZE}px`,
    border: '1px solid #5e7ade',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  degreeItem: {
    width: '10px', height: '10px',
    border: '1px solid #5e7ade',
    borderRadius: '50%',
    position: 'absolute',
    top: '50%', left: '50%', transform: 'translate(-50%,-50%)'
  },
  location: {
    position: 'absolute',
    width: '16px', height: '16px',
    background: 'rgba(0,0,0,0.75)',
    border: 0,
    outline: 'none',
    color: '#fff',
    fontSize: '9px',
    lineHeight: 1,
    cursor: 'pointer'
  }
};
