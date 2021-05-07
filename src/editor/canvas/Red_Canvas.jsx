import React from "react";
import Red_Layer from "../Red_Layer";
import draw_canvasUI from "./draw_canvasUI";

const SIZE = 100;

class Red_Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moveCenterStart : false,
      useMove: false,
      offsetX: 0,
      offsetY: 0,
      scale: 1
    };
  }

  draw_canvasUI = draw_canvasUI;

  draw(canvasInfo, layers) {
    return <div style={{
      ...style.canvas,
      transform: `translate(calc(-50% + ${this.state.offsetX}px),calc(-50% + ${this.state.offsetY}px)) scale(${this.state.scale})`
    }} className={'transparent_checker'}>
      <div
        className={'transparent_checker'}
        style={{
          width: `${canvasInfo.width}px`,
          height: `${canvasInfo.height}px`,
          background: Red_Layer.calcGradients(layers, true),
          transition: 'width 0.2s, height 0.2s'
        }}
      >
      </div>
    </div>;
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    const layers = rootComponentState.layers;
    const activeSubData = rootComponentState.activeSubData;
    return <div
      style={style.container}
      onMouseMove={e => {
        if (this.state.useMove) {
          e = e.nativeEvent;
          this.state.offsetX += e.movementX;
          this.state.offsetY += e.movementY;
          style.canvas.transition = '';
          this.setState({});
          document.body.style.cursor = 'move';
          console.log(e);
        }
      }}
      onMouseLeave={e => this.state.useMove ? this.setState({useMove: false}) : 0}
      onMouseUp={e => this.state.useMove ? (this.setState({useMove: false}), document.body.style.cursor = 'default') : 0}
      onMouseDown={e => e.nativeEvent.button === 1 ? this.setState({useMove: true}) : 0}
      onWheel={e => {
        let t0 = this.state.scale - e.nativeEvent.deltaY / 1000;
        if (t0 < 0) t0 = 0.01;
        this.setState({scale: t0});
        style.canvas.transition = 'transform 0.1s';
      }}
    >
      {this.draw_canvasUI()}
      {this.draw(canvasInfo, layers)}
      <div
        style={{
          position: 'absolute',
          right: '16px',
          bottom: '16px',
          width: `${SIZE}px`,
          height: `${canvasInfo.height / canvasInfo.width * SIZE}px`,
          border: '1px solid red',
          transition: 'width 0.2s,height 0.2s'
        }}
        onMouseDown={e=>this.state.moveCenterStart=true}
        onMouseMove={e=>{
          if(this.state.moveCenterStart && e.target.className ==='layerItem'){
            e = e.nativeEvent
            let tX = e['layerX']/SIZE * (activeSubData['position']['xUnit']==='%' ? 100 :  canvasInfo.width)
            let tY = e['layerY']/(canvasInfo.height / canvasInfo.width * SIZE)  * (activeSubData['position']['yUnit']==='%' ? 100 :  canvasInfo.height)
            activeSubData['position']['x'] = tX
            activeSubData['position']['y'] = tY
            rootComponent.setState({})
          }
        }}
        onClick={e=>this.state.moveCenterStart=false}
        onMouseLeave={e=>this.state.moveCenterStart=false}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translate(-50%,calc(-100% - 5px)',
            whiteSpace: 'nowrap',
            fontSize: '9px'
          }}
        >
          Edit Center
        </div>
        <div className={'transparent_checker'} style={{width: `100%`, height: `100%`, cursor: 'pointer', borderRadius: '4px', overflow: 'hidden', transition: 'height 0.2s'}}>
          <div className={'layerItem'} style={{background: Red_Layer.calcGradientItem(activeSubData)}} />
        </div>
        <div
          style={{
            position: 'absolute',
            top: `${activeSubData.position.y * (activeSubData.position.yUnit === '%' ? 1 : SIZE / canvasInfo.height) % 100}%`,
            left: `${activeSubData.position.x * (activeSubData.position.xUnit === '%' ? 1 : SIZE / canvasInfo.width) % 100}%`,
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

      </div>
    </div>;
  }
}

export default Red_Canvas;
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
    overflow: 'auto',
    transition: 'transform 0.01s'
  }
};
