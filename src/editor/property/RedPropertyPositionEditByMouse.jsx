import React from "react";
import {faArrowDown, faCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const SIZE = 100;
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
    const rect = targetContext.refRect.current.getBoundingClientRect();
    let tX = (e.pageX - (rect.x));
    let tY = (e.pageY - (rect.y));
    let layerPixelW = canvasInfo.width;
    let layerPixelH = canvasInfo.height;
    let tPercentX = activeSubData['position']['xUnit'] === '%' ? tX / SIZE * 100 : tX * layerPixelW / SIZE;
    let tPercentY = activeSubData['position']['yUnit'] === '%' ? tY / SIZE * 100 : tY * layerPixelH / SIZE;
    activeSubData['position']['x'] = tPercentX;
    activeSubData['position']['y'] = tPercentY;
    rootComponent.setState({});
  }

  setPosition(x, y) {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    activeSubData['position']['x'] = x;
    activeSubData['position']['y'] = y;
    rootComponent.setState({});
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    const layerSize = rootComponentState.activeLayer.size;
    const position = activeSubData['position'];
    const canvasInfo = rootComponentState.canvasInfo;
    let layerPixelW = canvasInfo.width;
    let layerPixelH = canvasInfo.height;
    let tPercentX = position['xUnit'] === '%' ? (position.x / 100 * SIZE) % 100 : ((position.x / layerPixelW * 100) % 100);
    let tPercentY = position['yUnit'] === '%' ? (position.y / 100 * SIZE) % 100 : ((position.y / layerPixelH * 100) % 100);
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
        }} />
      </div>
      <div
        className={'grid3_3'}
        style={style.box}
      >
        {/**/}
        <button
          onClick={e => {this.setPosition(0, 0);}}
          style={{...style.location, top: 0, left: 0}}><FontAwesomeIcon
          icon={faArrowDown} style={{transform: 'rotate(135deg)'}} /></button>
        <button
          onClick={e => {
            let tX = 50;
            if (position['xUnit'] === 'px') tX = canvasInfo['width'] * 0.5;
            this.setPosition(tX, 0);
          }}
          style={{...style.location, top: 0, left: '50%', transform: 'translate(-50%,0)'}}><FontAwesomeIcon
          icon={faArrowDown} style={{transform: 'rotate(180deg)'}} /></button>
        <button
          onClick={e => {
            let tX = 100;
            if (position['xUnit'] === 'px') tX = canvasInfo['width'];
            this.setPosition(tX, 0);
          }}
          style={{...style.location, top: 0, right: 0}}><FontAwesomeIcon icon={faArrowDown}
                                                                        style={{transform: 'rotate(225deg)'}} />
        </button>
        {/**/}
        <button
          onClick={e => {{
            let tY = 50;
            if (position['yUnit'] === 'px') tY = canvasInfo['height'] * 0.5;
            this.setPosition(0, tY);
          }}}
          style={{...style.location, top: '50%', left: 0, transform: 'translate(0%,-50%)'}}><FontAwesomeIcon
          icon={faArrowDown} style={{transform: 'rotate(90deg)'}} /></button>
        <button
          onClick={e => {
            let tX = 50;
            let tY = 50;
            if (position['xUnit'] === 'px') tX = canvasInfo['width'] * 0.5;
            if (position['yUnit'] === 'px') tY = canvasInfo['height'] * 0.5;
            this.setPosition(tX, tY);
          }}
          style={{...style.location, top: '50%', left: '50%', transform: 'translate(-50%,-50%)'}}><FontAwesomeIcon
          icon={faCircle} style={{transform: 'rotate(135deg)'}} /></button>
        <button
          onClick={e => {
            let tX = 100;
            let tY = 50;
            if (position['xUnit'] === 'px') tX = canvasInfo['width'];
            if (position['yUnit'] === 'px') tY = canvasInfo['height'] * 0.5;
            this.setPosition(tX, tY);
          }}
          style={{...style.location, top: '50%', right: 0, transform: 'translate(0%,-50%)'}}><FontAwesomeIcon
          icon={faArrowDown} style={{transform: 'rotate(270deg)'}} /></button>
        {/**/}
        <button
          onClick={e => {
            let tY = 100;
            if (position['yUnit'] === 'px') tY = canvasInfo['height'] ;
            this.setPosition(0, tY);
          }}
          style={{...style.location, bottom: 0, left: 0}}><FontAwesomeIcon icon={faArrowDown}
                                                                           style={{transform: 'rotate(45deg)'}} />
        </button>
        <button
          onClick={e => {
            let tX = 50;
            let tY = 100;
            if (position['xUnit'] === 'px') tX = canvasInfo['width']*0.5;
            if (position['yUnit'] === 'px') tY = canvasInfo['height'] ;
            this.setPosition(tX, tY);
          }}
          style={{...style.location, bottom: 0, left: '50%', transform: 'translate(-50%,0)'}}><FontAwesomeIcon
          icon={faArrowDown} style={{transform: 'rotate(0deg)'}} /></button>
        <button
          onClick={e => {
            let tX = 100;
            let tY = 100;
            if (position['xUnit'] === 'px') tX = canvasInfo['width'];
            if (position['yUnit'] === 'px') tY = canvasInfo['height'] ;
            this.setPosition(tX, tY);
          }}
          style={{...style.location, bottom: 0, right: 0}}><FontAwesomeIcon icon={faArrowDown}
                                                                            style={{transform: 'rotate(315deg)'}} />
        </button>

      </div>
    </div>;
  }
}

export default RedPropertyPositionEditByMouse;
const style = {
  box: {
    display: 'inline-block',
    margin: '5px',
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
    width: '24px', height: '24px',
    background: 'rgba(0,0,0,0.5)',
    border: 0,
    outline: 'none',
    color: '#fff',
    fontSize: '11px',
    cursor: 'pointer'
  }
};
