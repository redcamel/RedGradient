import UI_Number from "../../core/UI_Number";
import {SketchPicker} from "react-color";
import Red_CANVAS_PRESET from "./Red_CANVAS_PRESET";


function draw_canvasUI() {
  const rootComponent = this.props.rootComponent;
  const rootComponentState = rootComponent.state;
  const canvasInfo = rootComponentState.canvasInfo;
  return <>
    <div style={style.canvasViewInfo}>
      <div>center : {this.state.canvasViewOffsetX},{this.state.canvasViewOffsetY} / canvasViewScale : {this.state.canvasViewScale}</div>
      <button style={style.toCenter} onClick={e => this.setState({canvasViewOffsetX: 0, canvasViewOffsetY: 0})}>set Center</button>
      <button style={style.toScale} onClick={e => this.setState({canvasViewScale: 1})}>setScale 1</button>
      <button style={style.toScale} onClick={e => this.setState({canvasViewScale: 0.5})}>setScale 0.5</button>
    </div>
    <div style={style.canvasResizer}>
      <UI_Number width={'60px'} value={canvasInfo.width} HD_onInput={e => {canvasInfo.width = e.target.value;rootComponent.setState({});}} />
      <UI_Number width={'60px'} value={canvasInfo.height} HD_onInput={e => {canvasInfo.height = e.target.value;rootComponent.setState({});}} />
      <div style={{display: 'inline-flex', alignItems: 'center'}}>
        배경색상
        <div
          className={rootComponentState.bgColor === 'transparent' ? 'transparent_checker' : ''}
          style={{display: 'inline-block', width: '25px', height: '25px', background: rootComponentState.bgColor === 'transparent' ? '' : rootComponentState.bgColor, borderRadius: '4px', marginRight: '10px', border: '1px solid #000', cursor: 'pointer'}}
          onClick={e => this.setState({canvasBgColorPickerOpenYn: true})}
        />
        {
          this.state.canvasBgColorPickerOpenYn ? <div style={{
              zIndex: 1, position: 'absolute', top: 0, left: '0%', transform: 'translate(-50% , 0px)',
              boxShadow: '0px 0px 16px rgba(0,0,0,0.16)',
              background: '#fff',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <SketchPicker
                width={250}
                color={rootComponentState.bgColor}
                onChange={color => {
                  rootComponentState.bgColor = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
                  rootComponent.setState({});
                }}
              />
              <div
                style={{padding: '4px', background: '#5e7ade', cursor: 'pointer', textAlign: 'center'}}
                onClick={e => this.setState({canvasBgColorPickerOpenYn: null})}
              >완료
              </div>
            </div>
            : ''
        }
      </div>
      <div>

        {
          Red_CANVAS_PRESET.map(v => {
            return <button
              style={{
                background: '#464141',
                border: 0,
                outline: 'none',
                color: '#fff',
                fontSize: '11px',
                padding: '8px',
                borderRadius: '4px',
                margin: '1px',
                cursor: 'pointer'
              }}
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
      <div className={'todo'}>Todo - 패스기반 레이어도 추가해야하는데 아직 오묘...</div>

    </div>
  </>;
}

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
