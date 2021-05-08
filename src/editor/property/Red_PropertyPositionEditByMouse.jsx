import React from "react";
import Red_Layer from "../layer/Red_Layer";

const SIZE = 100;

class Red_PropertyPositionEditByMouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      moveCenterStart: false
    };
  }


  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeLayer = rootComponentState.activeLayer;
    const layerSize = activeLayer['size'];
    const activeSubData = rootComponentState.activeSubData;

    return <div
      style={{
        width: `${SIZE}px`,
        height: `${layerSize.h / layerSize.w * SIZE}px`,
        border: '1px solid red',
        transition: 'width 0.2s,height 0.2s'
      }}
      onMouseDown={e => this.state.moveCenterStart = true}
      onMouseMove={e => {
        if (this.state.moveCenterStart && e.target.className === 'layerItem') {
          e = e.nativeEvent;
          let tX = e['layerX'] / SIZE * (activeSubData['position']['xUnit'] === '%' ? 100 : layerSize.w);
          let tY = e['layerY'] / (layerSize.h / layerSize.w * SIZE) * (activeSubData['position']['yUnit'] === '%' ? 100 : layerSize.h);
          activeSubData['position']['x'] = tX;
          activeSubData['position']['y'] = tY;
          rootComponent.setState({});
        }
      }}
      onClick={e => this.state.moveCenterStart = false}
      onMouseLeave={e => this.state.moveCenterStart = false}
    >
      <div className={'transparent_checker'} style={{
        width: `100%`,
        height: `100%`,
        cursor: 'pointer',
        borderRadius: '4px',
        overflow: 'hidden',
        transition: 'height 0.2s'
      }}>
        <div className={'layerItem'}
             style={{background: Red_Layer.calcGradientItem(activeSubData, false, activeLayer)}} />
      </div>
      <div
        style={{
          position: 'absolute',
          top: `${activeSubData.position.y * (activeSubData.position.yUnit === '%' ? 1 : SIZE / layerSize.h) % 100}%`,
          left: `${activeSubData.position.x * (activeSubData.position.xUnit === '%' ? 1 : SIZE / layerSize.w) % 100}%`,
          transform: 'translate(-50%,-50%)',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#fff',
          border: '1px solid red',
          transition: 'left 0.1s,top 0.1s',
          cursor: 'pointer'
        }}
      />
    </div>;
  }

}

export default Red_PropertyPositionEditByMouse;
