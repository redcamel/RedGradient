import React from "react";
import RedNumber from "../../core/RedNumber.jsx";
import {SketchPicker} from "react-color";
import DataColor from "../DataColor";

let targetContext;
let targetColorData;
let targetRefBar;
const HD_move = e => {
  console.log(targetRefBar);
  if (targetRefBar.current) {
    const tX = e.pageX - targetRefBar.current.getBoundingClientRect().x;
    //TODO - FIXME 사이즈 자동으로 결정되게 변경해야함
    let percentX = (tX / (targetRefBar.current.clientWidth + 16) * 100);
    percentX = Math.max(Math.min(100, percentX), 0);
    targetColorData.range = percentX;
    targetContext.props.rootComponent.setState({});
    console.log(tX);
  }
};
const HD_up = e => {
  targetContext.props.HD_sort(e);
  window.removeEventListener('mousemove', HD_move);
  window.removeEventListener('mouseup', HD_up);
  requestAnimationFrame(() => {
    targetContext.setState({activeIDX: targetContext.getIndex()});
    targetContext = null;
    targetColorData = null;
    targetRefBar = null;
  });
};

class RedGradientColorItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.refBar = React.createRef();
  }

  getIndex() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    const colorData = this.props.colorData;
    return activeSubData.colorList.indexOf(colorData);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    const colorData = this.props.colorData;
    const activeYn = this.props.activeYn;
    const colorInfo = colorData['color'];
    return <div
      style={{
        margin: '3px 0px',
        cursor: 'pointer',
        border: activeYn ? '1px solid #5e7ade' : '1px solid rgba(255,255,255,0.1)',
        borderRadius: '4px'
      }}
      onClick={() => this.props.HD_active(this.getIndex())}
      onMouseDown={() => this.props.HD_active(this.getIndex())}
    >
      <button
        style={style.add}
        onClick={() => {
          let prevColorData = activeSubData['colorList'][this.getIndex() - 1];
          let currentRange = colorData['range'];
          let newRange = currentRange;
          if (prevColorData && prevColorData['xUnit'] === colorData['xUnit']) newRange = currentRange - (currentRange - prevColorData['range']) * 0.5;
          const newColorData = new DataColor(colorData['color'], newRange);
          activeSubData['colorList'].splice(this.getIndex(), 0, newColorData);
          rootComponent.setState({});
        }}
      >+
      </button>
      <div style={{display: 'flex', padding: '4px 4px 0px',}}>
        <div
          className={colorInfo === 'transparent' ? 'transparent_checker' : ''}
          style={{
            background: colorInfo === 'transparent' ? '' : colorInfo,
            width: '25px', height: '25px',
            borderRadius: '4px', border: '1px solid #000',
            marginRight: '10px'
          }}
          onClick={() => this.setState({openColorPicker: colorData})}
        />
        <div>
          {/* TODO - 단위모델 변경 처리*/}
          <RedNumber
            width={'auto'}
            value={colorData['range'] || 0}
            HD_onInput={e => {
              colorData['range'] = +e.target.value;
              let i = activeSubData.colorList.length;
              while (i--) {
                if (activeSubData.colorList[i] === colorData) this.props.HD_active(this.getIndex());
              }
              rootComponent.setState({});
            }}
            HD_blur={e => {
              this.props.HD_sort(e);
              this.props.HD_active(this.getIndex());
            }}
          />
          <button
            style={style.del}
            onClick={() => {
              activeSubData.colorList.splice(this.getIndex(), 1);
              rootComponent.setState({});
            }}
          >Del
          </button>
          <button
            style={style.lock}
            onClick={() => {
            }}
          >Todo Lock
          </button>
          <div>{colorData['color']} <span className={'todo'}>Todo - 단위선택 원복</span></div>
          {/*<div>r:{rgba[0]} g:{rgba[1]} b:{rgba[2]} a:{rgba[3]}</div>*/}
          {/*<div>#{rgba2hex(`rgba(${rgba.join(',')})`)}</div>*/}
        </div>
      </div>
      <div style={{margin: '8px 8px', alignItems: 'center'}}>
        <div style={style.line} ref={this.refBar}/>
        <div style={{...style.ball, left: `${colorData['range']}%`, background: activeYn ? '#5e7ade' : '#fff'}}
             onMouseDown={() => {
               targetContext = this;
               targetColorData = colorData;
               targetRefBar = this.refBar;
               window.addEventListener('mousemove', HD_move);
               window.addEventListener('mouseup', HD_up);
             }}
        />
      </div>
      {
        this.state.openColorPicker ?
          <div style={style.colorPicker}>
            <SketchPicker
              width={250}
              color={this.state.openColorPicker.color}
              onChange={color => {
                this.state.openColorPicker.color = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
                rootComponent.setState({});
              }}
            />
            <div style={style.complete} onClick={() => this.setState({openColorPicker: null})}>완료</div>
          </div> : ''
      }
    </div>;
  }
}

export default RedGradientColorItem;
const style = {
  container: {
    paddingTop: '10px',
  },
  colorPicker: {
    zIndex: 1, position: 'absolute', top: 0, left: '50%', transform: 'translate(-50% , -50%)',
    boxShadow: '0px 0px 16px rgba(0,0,0,0.5)',
    background: '#fff',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  complete: {padding: '4px', background: '#5e7ade', cursor: 'pointer', textAlign: 'center'},
  line: {height: '10px', background: 'rgba(255,255,255,0.25)', borderRadius: '5px',boxShadow: 'rgba(0, 0, 0, 0.35) 0px 0px 10px inset',border:'1px solid rgb(31, 31, 31)'},
  add: {
    position: 'absolute',
    width: '20px',
    height: '16px',
    lineHeight: 1,
    top: 0,
    right: 0,
    background: '#5e7ade',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '11px',
    border: '1px solid #000',
    transform: `translate(50%,-50%)`,
    cursor: 'pointer',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.46)'
  },
  ball: {
    position: 'absolute',
    height: '25px',
    top: '50%',
    borderRadius: '50%',
    width: '25px',
    border: '1px solid #000',
    transform: `translate(-50%,-50%)`,
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'background 0.2s, top 0.2s, bottom 0.2s',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.46)'
  },
  del: {
    fontSize: '11px',
    color: '#fff',
    background: '#5e7ade',
    outline: 'none',
    border: '1px solid #000',
    borderRadius: '4px',
    height: '23px',
    cursor: 'pointer'
  },
  lock: {
    fontSize: '11px',
    color: '#fff',
    background: 'red',
    outline: 'none',
    border: '1px solid #000',
    borderRadius: '4px',
    height: '23px',
    cursor: 'pointer'
  }
};
