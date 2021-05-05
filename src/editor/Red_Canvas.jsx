import React from "react";
import UI_Number from "../core/UI_Number";
import Red_Layer from "./Red_Layer";
const presetSize = [
  {
    title : '512 x 512',
    width : 512,
    height : 512
  },
  {
    title : 'Google Pixel 4, 4XL',
    width : 412,
    height : 870
  },
  {
    title : 'iPhone 12 Pro Max',
    width : 428,
    height : 926
  },
  {
    title : 'web 1366',
    width : 1366,
    height : 768
  },
  {
    title : 'web 1920',
    width : 1920,
    height : 1080
  }
]
class Red_Canvas extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    const layers = rootComponentState.layers;
    console.log(Red_Layer.calcGradients(layers))
    return <div style={style.container}>
      <div style={style.canvasResizer}>
        <UI_Number value={canvasInfo.width} HD_onInput={e => {
          canvasInfo.width = e.target.value;
          rootComponent.setState({});
        }} />
        <UI_Number value={canvasInfo.height} HD_onInput={e => {
          canvasInfo.height = e.target.value;
          rootComponent.setState({});
        }} />
        <div>
          {
            presetSize.map(v=>{
              return <button
                onClick={e=>{
                  canvasInfo.width = v.width;
                  canvasInfo.height = v.height;
                  rootComponent.setState({});
                }}
              >
                <div>{v['title']}({v['width']}x{v['height']})</div>
              </button>
            })
          }
        </div>
        <div className={'todo'}>Todo - 레이어를 display item화 시켜서... 객체 에디팅으로도 값 변경할수있도록</div>
        <div className={'todo'}>Todo - 패스기반 레이어도 추가해야하는데 아직 오묘...</div>

      </div>
      <div style={style.canvas} className={'transparent_checker'}>
        <div
          className={'transparent_checker'}
          style={{
            width: `${canvasInfo.width}px`,
            height: `${canvasInfo.height}px`,
            background: Red_Layer.calcGradients(layers),
            transition : 'width 0.2s, height 0.2s'
          }}
        >
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
    transform: 'translate(-50%,-50%)',
    overflow: 'auto'
  },
  canvasResizer: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 1
  }
};
