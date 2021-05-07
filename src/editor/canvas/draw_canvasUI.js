import UI_Number from "../../core/UI_Number";

const presetSize = [
  {
    title: '512 x 512',
    width: 512,
    height: 512
  },
  {
    title: 'Google Pixel 4, 4XL',
    width: 412,
    height: 870
  },
  {
    title: 'iPhone 12 Pro Max',
    width: 428,
    height: 926
  },
  {
    title: 'web 1366',
    width: 1366,
    height: 768
  },
  {
    title: 'web 1920',
    width: 1920,
    height: 1080
  }
];

function draw_canvasUI() {
  const rootComponent = this.props.rootComponent;
  const rootComponentState = rootComponent.state;
  const canvasInfo = rootComponentState.canvasInfo;
  return <>
    <div style={style.canvasViewInfo}>
      <div>center : {this.state.offsetX},{this.state.offsetY} / scale : {this.state.scale}</div>
      <button
        style={style.toCenter}
        onClick={e => this.setState({offsetX: 0, offsetY: 0})}
      >set Center
      </button>
      <button
        style={style.toScale}
        onClick={e => this.setState({scale: 1})}
      >setScale 1
      </button>
      <button
        style={style.toScale}
        onClick={e => this.setState({scale: 0.5})}
      >setScale 0.5
      </button>
    </div>
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
          presetSize.map(v => {
            return <button
              onClick={e => {
                canvasInfo.width = v.width;
                canvasInfo.height = v.height;
                rootComponent.setState({});
              }}
            >
              <div>{v['title']}({v['width']}x{v['height']})</div>
            </button>;
          })
        }
      </div>
      <div className={'todo'}>Todo - 레이어를 display item화 시켜서... 객체 에디팅으로도 값 변경할수있도록</div>
      <div className={'todo'}>Todo - 패스기반 레이어도 추가해야하는데 아직 오묘...</div>
      <div className={'todo'}>Todo - 캔버스 스케일기반 Viewer</div>

    </div>
  </>;
};
export default draw_canvasUI;

const style = {

  canvasResizer: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 1
  },
  canvasViewInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: '4px',
    fontSize: '10px',
    zIndex: 1
  },
  toCenter: {
    padding: '3px 5px',
    background: '#5e7ade',
    color: '#fff',
    marginTop: '4px',
    borderRadius: '4px',
    border: 0,
    fontSize: '10px',
    outline: 'none',
    cursor: 'pointer'
  },
  toScale: {
    marginLeft: '4px',
    padding: '3px 5px',
    background: '#7235d4',
    color: '#fff',
    marginTop: '4px',
    borderRadius: '4px',
    border: 0,
    fontSize: '10px',
    outline: 'none',
    cursor: 'pointer'
  }
};
