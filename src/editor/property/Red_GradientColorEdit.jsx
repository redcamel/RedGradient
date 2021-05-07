import React from "react";
import GRADIENT_TYPE from "../GRADIENT_TYPE";
import {SketchPicker} from 'react-color';
import UI_Number from "../../core/UI_Number";

//TODO - 일단 더미로 쭉 쳐보고 정리
let targetContext;
let targetData;
const HD_move = e => {
  if (targetContext.state.moveStepMode && targetContext.refBar.current) {
    const tX = e.pageX - targetContext.refBar.current.getBoundingClientRect().x;
    const percentX = (tX / targetContext.refBar.current.clientWidth * 100);
    targetData.range = percentX;
    targetContext.props.rootComponent.setState({});
  }
};
const HD_up = e => {
  targetContext.sortColorList();
  window.removeEventListener('mousemove', HD_move);
  window.removeEventListener('mouseup', HD_up);
  requestAnimationFrame(e => {
    targetContext.setState({activeIDX: targetContext.props.rootComponent.state.activeSubData.colorList.indexOf(targetData)});
    targetContext = null;
    targetData = null;
  });
};

class Red_GradientColorEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIDX: 0,
      colorPicker: null
    };
    this.refBar = React.createRef();
  }

  renderGradientColorList(data) {
    const itemList = [];
    const gradients = data['colorList'].map((v, index) => {
      const activeYn = this.state.activeIDX === index;
      let colorRangeTxt;
      colorRangeTxt = `${v['range']}%`;
      itemList.push(this.renderColorStep(v, index, activeYn));
      return `${v['color']} ${colorRangeTxt}`;
    });
    const code = `${GRADIENT_TYPE.LINEAR}(90deg, ${gradients})`;
    return <div style={{
      height: '55px',
      background: code,
      transition: 'background 0.2s'
    }}>
      {itemList}
    </div>;
  };

  renderColorStep(v, index, activeYn) {
    const rootComponent = this.props.rootComponent;
    let tLeft;
    tLeft = `${v['range']}%`;
    return <div
      style={{
        position: 'absolute',
        height: '20px',
        bottom: 0,
        left: tLeft,
        borderRadius: '50%',
        width: '20px',
        background: activeYn ? '#5e7ade' : '#fff',
        border: '1px solid #000',
        transform: `translate(-50%,50%)`,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'background 0.2s, top 0.2s, bottom 0.2s',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.46)'
      }}
      onClick={e => {
        e.stopPropagation();
        let t0;
        if (this.state.moveStepMode) {
          t0 = {
            activeIDX: index,
            moveStepMode: false
          };
        } else {
          t0 = {
            activeIDX: index
          };
        }
        this.setState(t0);

      }}
      onMouseDown={e => {
        this.setState({
          moveStepMode: true,
          activeIDX: index
        });
        targetContext = this;
        targetData = v;

        window.addEventListener('mousemove', HD_move);
        window.addEventListener('mouseup', HD_up);
      }}

    />;

  };

  sortColorList() {
    this.props.rootComponent.state.activeSubData.colorList.sort((a, b) => {
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

    return <div style={style.container}>
      <div
        ref={this.refBar}
        className={'transparent_checker'}
        onClick={e => {
          const percentX = (e.nativeEvent.layerX / e.target.clientWidth * 100).toFixed(0);
          let targetIndex = 0;
          const len = data.colorList.length;
          for (let i = 0; i < len; i++) {
            const v = data.colorList[i];
            const vPercentX = v['range'];
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
                margin: '3px 0px',
                border: activeYn ? '1px solid #5e7ade' : '1px solid rgba(255,255,255,0.1)',

                cursor: 'pointer'
              }}
              onClick={e => {
                this.setState({
                  activeIDX: index
                });
              }}
            >
              <div style={{
                display: 'flex',
                padding: '4px',
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
                    width={'auto'}
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
                  />


                  {v['color']}
                  <div className={'todo'}>Todo - 컬러지원범위 & 포멧 결정</div>
                  <div
                    onClick={e => {
                      data.colorList.splice(data.colorList.indexOf(v), 1);
                      rootComponent.setState({});
                    }}
                  >삭제
                  </div>
                  {/*<div>r:{rgba[0]} g:{rgba[1]} b:{rgba[2]} a:{rgba[3]}</div>*/}
                  {/*<div>#{rgba2hex(`rgba(${rgba.join(',')})`)}</div>*/}
                </div>

              </div>
              <div style={{height : '25px',marginBottom : '10px',alignItems:'center'}}>
                <div style={{height:'1px',background:'rgba(255,255,255,0.25)',position : 'absolute',top:'16px',left:0,right:0}}/>
                <div
                  style={{
                    position: 'absolute',
                    height: '20px',
                    bottom: 0,
                    left: `${v['range']}%`,
                    borderRadius: '50%',
                    width: '20px',
                    background: activeYn ? '#5e7ade' : '#fff',
                    border: '1px solid #000',
                    transform: `translate(-50%,0%)`,
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'background 0.2s, top 0.2s, bottom 0.2s',
                    boxShadow: '0px 0px 10px rgba(0,0,0,0.46)'
                  }}
                  onClick={e => {
                    e.stopPropagation();
                    let t0;
                    if (this.state.moveStepMode) {
                      t0 = {
                        activeIDX: index,
                        moveStepMode: false
                      };
                    } else {
                      t0 = {
                        activeIDX: index
                      };
                    }
                    this.setState(t0);

                  }}
                  onMouseDown={e => {
                    this.setState({
                      moveStepMode: true,
                      activeIDX: index
                    });
                    targetContext = this;
                    targetData = v;

                    window.addEventListener('mousemove', HD_move);
                    window.addEventListener('mouseup', HD_up);
                  }}
                />
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
