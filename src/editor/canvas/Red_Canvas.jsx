import React from "react";
import Red_Layer from "../layer/Red_Layer";
import draw_canvasUI from "./draw_canvasUI";
import UI_Select from "../../core/UI_Select";
import GRADIENT_TYPE from "../GRADIENT_TYPE";
import UI_Number from "../../core/UI_Number";

const SIZE = 100;

class Red_Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      moveCenterStart: false,
      useMove: false,
      offsetX: 0,
      offsetY: 0,
      scale: 1,
      colorPicker : false
    };
  }

  draw_canvasUI = draw_canvasUI;

  draw(canvasInfo, layers,bgColor) {
    return <div style={{
      ...style.canvas,
      transform: `translate(calc(-50% + ${this.state.offsetX}px),calc(-50% + ${this.state.offsetY}px)) scale(${this.state.scale})`
    }} className={'transparent_checker'}>
      <div
        className={'transparent_checker'}
        style={{
          width: `${canvasInfo.width}px`,
          height: `${canvasInfo.height}px`,
          background: Red_Layer.calcGradients(layers, true,bgColor),
          transition: 'width 0.2s, height 0.2s'
        }}
      >
      </div>
    </div>;
  }

  addItem() {

  }

  removeItem() {

  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    const layers = rootComponentState.layers;
    const activeLayer = rootComponentState.activeLayer;
    const activeSubData = rootComponentState.activeSubData;
    const layerSize = activeLayer['size']
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
      {this.draw(canvasInfo, layers,rootComponentState.bgColor)}
      <div
        style={{
          position: 'absolute',
          right: '4px',
          bottom: '4px',
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
      </div>
      <div style={{
        position: 'absolute',
        bottom: '4px',
        right: SIZE + 8 + 'px',
        background: 'rgba(0,0,0,0.1)',
        borderRadius: '8px',
        padding: '16px'
      }}>
        <div>
          <div style={style.itemContainer}>

            <UI_Select value={activeSubData['type'].split('-')[0].toUpperCase()} options={Object.keys(GRADIENT_TYPE)}
                       HD_change={e => {
                         activeSubData['type'] = GRADIENT_TYPE[e.target.value];
                         rootComponent.setState({});
                       }} />
            {
              activeSubData['type'] === GRADIENT_TYPE.LINEAR ? <>
                Deg <UI_Number
                width={'80px'}
                value={activeSubData['deg'] || 0}
                HD_onInput={e => {
                  activeSubData['deg'] = e.target.value;
                  rootComponent.setState({});
                }} />
              </> : ''
            }
          </div>

          <div style={style.itemContainer}>
            Position
            <div>
              <UI_Number
                width={'80px'}
                value={activeSubData['position']['x'] || 0}
                HD_onInput={e => {
                  activeSubData['position']['x'] = e.target.value;
                  rootComponent.setState({});
                }} />
              <UI_Select value={activeSubData['position']['xUnit']} options={['px', '%']} HD_change={e => {
                activeSubData['position']['xUnit'] = e.target.value;
                rootComponent.setState({});
              }} />
              <UI_Number
                width={'80px'}
                value={activeSubData['position']['y'] || 0}
                HD_onInput={e => {
                  activeSubData['position']['y'] = e.target.value;
                  rootComponent.setState({});
                }} />
              <UI_Select value={activeSubData['position']['yUnit']} options={['px', '%']} HD_change={e => {
                activeSubData['position']['yUnit'] = e.target.value;
                rootComponent.setState({});
              }} />
            </div>
          </div>

          <div className={'todo'}>TODO - 반복 Edit</div>
        </div>
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
  },
  itemContainer: {
    whiteSpace: 'nowrap'
  }
};
