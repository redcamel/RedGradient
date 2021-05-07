import React from "react";
import Red_Layer from "../Red_Layer";
import draw_canvasUI from "./draw_canvasUI";

class Red_Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
