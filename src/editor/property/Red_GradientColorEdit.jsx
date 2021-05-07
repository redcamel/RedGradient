import React from "react";
import GRADIENT_TYPE from "../GRADIENT_TYPE";
import {SketchPicker} from 'react-color';
import UI_Number from "../../core/UI_Number";
import UI_Select from "../../core/UI_Select";

//TODO - 일단 더미로 쭉 쳐보고 정리
class Red_GradientColorEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIDX: 0,
      colorPicker: null
    };
  }

  renderGradientColorList(data) {
    const itemList = [];
    const gradients = data['colorList'].map((v, index) => {
      // console.log('this.state.activeIDX === index', this.state.activeIDX === index);
      const activeYn = this.state.activeIDX === index;
      let colorRangeTxt;
      colorRangeTxt = `${v['range']}%`;
      itemList.push(this.renderColorStep(v, index, activeYn));
      return `${v['color']} ${colorRangeTxt}`;
    });
    const code = `${GRADIENT_TYPE.LINEAR}(90deg, ${gradients})`;
    return <div style={{
      height: '35px',
      background: code
    }}>
      {itemList}
    </div>;
  };

  renderColorStep(v, index, activeYn) {

    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    let tLeft;
    tLeft = `${v['range'] / canvasInfo['width'] * 100}%`;
    return <div
      style={{
        position: 'absolute',
        top: '-3px',
        bottom: '-3px',
        left: tLeft,
        borderRadius: '5px',
        width: '10px',
        background: activeYn ? '#5e7ade' : '#fff',
        border: '1px solid #000',
        transform: 'translate(-50%,0)',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'left 0.2s,background 0.2s'
      }}
      onClick={e => {
        e.stopPropagation();
        this.setState({
          activeIDX: index
        });
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          transform: 'translate(-25%,100%)',
          textAlign: 'center',
          fontSize: '9px',
          whiteSpace: 'nowrap'
        }}>
        {v['range']}%
      </div>
    </div>;
  };

  sortColorList(colorList) {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    colorList.sort((a, b) => {
      const aX = a['range'];
      const bX = b['range'];
      if (aX > bX) return 1;
      if (aX < bX) return -1;
      return 0;
    });
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const data = rootComponentState.activeSubData;
    const canvasInfo = rootComponentState.canvasInfo;

    return <div style={style.container}>
      <div
        className={'transparent_checker'}
        onClick={e => {
          const percentX = (e.nativeEvent.layerX / canvasInfo['width'] * 100).toFixed(0);
          let targetIndex = 0;
          const len = data.colorList.length;
          for (let i = 0; i < len; i++) {
            const v = data.colorList[i];
            const vPercentX =  v['range'];
            if (vPercentX > percentX) {
              targetIndex = i;
              break;
            }
          }
          const newData = {
            color: data.colorList[targetIndex - 1] ? data.colorList[targetIndex - 1]['color'] : '#ffffff',
            range: percentX
          };
          data.colorList.splice(targetIndex, null, newData);
          this.setState({activeIDX: targetIndex});
          rootComponent.setState({});
        }}
      >
        {this.renderGradientColorList(data)}
      </div>
      <div style={{marginTop: '20px'}}>
        {
          data['colorList'].map((v, index) => {
            const activeYn = this.state.activeIDX === index;
            const colorInfo = v['color'];
            return <div

              style={{
                margin: '3px',
                border: activeYn ? '1px solid #5e7ade' : '1px solid rgba(255,255,255,0.1)',
                padding: '4px',
                cursor: 'pointer'
              }}
              onClick={e => {
                this.setState({
                  activeIDX: index
                });
              }}
            >
              <div style={{
                display: 'flex'
              }}>
                <div
                  className={colorInfo === 'transparent' ? 'transparent_checker' : ''}
                  style={{
                    width: '50px',
                    height: '50px',
                    background: colorInfo === 'transparent' ? '' : colorInfo,
                    borderRadius: '4px',
                    marginRight: '10px',
                    border: '1px solid #000'
                  }}
                  onClick={e => {
                    this.setState({
                      colorPicker: v
                    });
                  }}
                />
                <div>
                  <UI_Number
                    width={'45px'}
                    value={v['range'] || 0}
                    HD_onInput={e => {
                      v['range'] = +e.target.value;
                      let i = data.colorList.length;
                      while (i--) {
                        if (data.colorList[i] === v) this.setState({activeIDX: i});
                      }
                      rootComponent.setState({});
                    }}
                    HD_blur={e => {
                      this.sortColorList(data.colorList);
                      rootComponent.setState({});
                    }}
                  />% {v['color']}
                  <div className={'todo'}>Todo - 컬러지원범위 & 포멧 결정</div>
                  <div
                    onClick={e=>{
                      data.colorList.splice(data.colorList.indexOf(v),1)
                      rootComponent.setState({})
                    }}
                  >삭제</div>
                  {/*<div>r:{rgba[0]} g:{rgba[1]} b:{rgba[2]} a:{rgba[3]}</div>*/}
                  {/*<div>#{rgba2hex(`rgba(${rgba.join(',')})`)}</div>*/}
                </div>

              </div>
            </div>;
          })
        }
      </div>
      {
        this.state.colorPicker ?
          <div style={{
            zIndex: 1, position: 'absolute', top: 0, left: '50%', transform: 'translate(-50% , 0px)',
            boxShadow: '0px 0px 16px rgba(0,0,0,0.16)',
            background: '#fff',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>

            <SketchPicker
              width={250}
              color={this.state.colorPicker.color}
              onChange={color => {
                this.state.colorPicker.color = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
                rootComponent.setState({});
              }}
            />
            <div
              style={{padding: '4px', background: '#5e7ade', cursor: 'pointer', textAlign: 'center'}}
              onClick={e => {
                this.setState({colorPicker: null});
              }}
            >완료
            </div>
          </div> : ''
      }
    </div>;
  }
}

export default Red_GradientColorEdit;
const style = {
  container: {
    paddingTop: '10px',
  }
};
