import React from "react";

const SIZE = 100;
let targetContext;
const HD_move = e => {targetContext.calcSize(e);};
const HD_up = e => {
  window.removeEventListener('mousemove', HD_move);
  window.removeEventListener('mouseup', HD_up);
};

class Red_PropertyPositionEditByMouse extends React.Component {
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

    let layerPixelW = layerSize.wUnit === '%' ? canvasInfo.width * layerSize.w / 100 : layerSize.w;
    let layerPixelH = layerSize.hUnit === '%' ? canvasInfo.height * layerSize.h / 100 : layerSize.h;

    let tPercentX = activeSubData['position']['xUnit'] === '%' ? tX / SIZE * 100 : tX * layerPixelW / SIZE;
    let tPercentY = activeSubData['position']['yUnit'] === '%' ? tY / SIZE * 100 : tY * layerPixelH / SIZE;

    activeSubData['position']['x'] = tPercentX;
    activeSubData['position']['y'] = tPercentY;
    rootComponent.setState({});
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    const layerSize = rootComponentState.activeLayer.size;
    const position = activeSubData['position'];
    const canvasInfo = rootComponentState.canvasInfo;
    let layerPixelW = layerSize.wUnit === '%' ? canvasInfo.width * layerSize.w / 100 : layerSize.w;
    let layerPixelH = layerSize.hUnit === '%' ? canvasInfo.height * layerSize.h / 100 : layerSize.h;

    let tPercentX = position['xUnit'] === '%' ? (position.x / 100 * SIZE) % 100 : ((position.x  / layerPixelW * 100) % 100) ;
    let tPercentY = position['yUnit'] === '%' ? (position.y / 100 * SIZE) % 100 : ((position.y / layerPixelH * 100) % 100);

    if (tPercentX < 0) tPercentX = 100 + tPercentX;
    if (tPercentY < 0) tPercentY = 100 + tPercentY;
    return <div>
      <div
        ref={this.refRect}
        className={'grid'}
        style={style.box}
        onMouseDown={e => {
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
    </div>;
  }

}

export default Red_PropertyPositionEditByMouse;
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
  }
};
