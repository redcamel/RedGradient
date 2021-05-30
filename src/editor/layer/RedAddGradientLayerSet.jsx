/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedNumber from "../../core/RedNumber.jsx";
import gsap from "gsap";
import GRADIENT_TYPE from "../GRADIENT_TYPE.js";
import DataColor from "../data/DataColor.js";
import {ColorPicker} from "@easylogic/colorpicker";
import RedTitle from "../../core/RedTitle";
import RedSelect from "../../core/RedSelect";

const easeNameList = [
  'none',
  'power1',
  'power2',
  'power3',
  'power4',
  'circ',
  // 'back',
  // 'bounce',
  // 'elastic',
  'sine',
  'expo',
  'step'
];
const easeTypeList = [
  'in',
  'out',
  'inOut'
];
const gradientTypes = {
  LINEAR: GRADIENT_TYPE.LINEAR,
  RADIAL: GRADIENT_TYPE.RADIAL,
  CONIC: GRADIENT_TYPE.CONIC
};
let targetColorData;

// TODO - 여기정리
class RedAddGradientLayerSet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      division: 5,
      easeName: 'none',
      easeType: 'out',
      tempColorList: [],
      colorPicker: [],
      openColorPicker: [],
      type: gradientTypes.LINEAR,
      startColor: new DataColor('yellow'),
      endColor: new DataColor('red')
    };
    this.refColorPickerContainer = [];
    let i = 500;
    while (i--) {
      this.refColorPickerContainer[i] = React.createRef();
    }
  }

  renderGradientColorList(colorList) {
    const gradients = colorList.map((v, index) => {
      let colorRangeTxt = '';
      if (v['useRange']) {
        let divideTxt = '';
        divideTxt = v['useDivide'] ? `,${v['colorEnd']} calc(${v['range']}${v['rangeUnit']} + 1px)` : '';
        let divideEndTxt = '';
        divideEndTxt = v['useDivideEnd'] && colorList[index + 1] ? `,${colorList[index + 1]['color']} calc(${v['rangeEnd']}${v['rangeUnit']} + 1px)` : '';
        return `${v['color']} ${v['range']}${v['rangeUnit']} ${divideTxt}, ${v['colorEnd']} ${v['rangeEnd']}${v['rangeUnit']} ${divideEndTxt}`;
      } else {
        colorRangeTxt = `${v['range']}${v['rangeUnit']}`;
        let divideTxt = '';
        divideTxt = v['useDivide'] && colorList[index + 1] ? `,${colorList[index + 1]['color']} calc(${v['range']}${v['rangeUnit']} + 1px)` : '';
        return `${v['color']} ${colorRangeTxt} ${divideTxt}`;
      }
    });
    let code = '';
    switch (this.state.type) {
      case GRADIENT_TYPE.LINEAR:
        code = `${GRADIENT_TYPE.LINEAR}(90deg, ${gradients})`;
        break;
      case GRADIENT_TYPE.RADIAL:
        code = `${GRADIENT_TYPE.RADIAL}(circle,${gradients})`;
        break;
      case GRADIENT_TYPE.CONIC:
        code = `${GRADIENT_TYPE.CONIC}(${gradients})`;
        break;
    }
    return code;
  };

  render() {
    let rangeList = new Array(this.state.division);
    rangeList.fill(1);
    const tempColorList = this.state.tempColorList;
    const startIndex = 498;
    const lastIndex = 499;
    return <div style={style.bg}

    >

      <div style={style.container}>
        <div style={{width: '100%'}}><RedTitle title={"add with template"}/></div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '1024px',
          justiceContent: 'space-between',
          margin: '10px',
          border: '1px solid #777',
          borderRadius: '8px'
        }}>
          {
            rangeList.map((v, index) => {
              let ease = this.state.easeName === 'none' ? 'none' : `${this.state.easeName}.${this.state.easeType}`;
              let tS = {value: 0};
              let tE = {value: 0};
              let tSTween = gsap.to(tS, {value: 100, duration: 1, ease: ease});
              tSTween.pause();
              tSTween.seek(index / rangeList.length);
              let tETween = gsap.to(tS, {value: 100, duration: 1, ease: ease});
              tETween.pause();
              tETween.seek((index + 1) / rangeList.length);
              // console.log(tSTween)
              tS = tSTween.ratio * 100;
              tE = tETween.ratio * 100;
              let t0 = index / rangeList.length / 2 + 0.5;
              let tColor = tempColorList[index] ? tempColorList[index]['color'] : gsap.utils.interpolate(this.state.startColor['color'], this.state.endColor['color'], index / rangeList.length);
              if (!tempColorList[index]) {
                tempColorList[index] = tempColorList[index] || (new DataColor(tColor, tS, '%', false, false, true, tE));
                tempColorList[index]['range'] = tS;
                tempColorList[index]['rangeEnd'] = tE;
              }
              tempColorList[index]['rangeEnd'] = tempColorList[index + 1] ? tempColorList[index + 1]['range'] : tempColorList[index]['rangeEnd'];
              const tColorData = tempColorList[index];
              return <div style={{
                position: 'relative',
                padding: '5px',
                background: (index + Math.floor(index / 10)) % 2 ? 'rgba(0,0,0,0.25)' : '',
                // borderLeft: index ? '1px solid #777' : 0,
                width: `${100 / rangeList.length}%`,
                minWidth: '10%'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '9px',
                  width: '100px'
                }}>
                  <RedNumber
                    fontSize={'11px'}
                    width={'100%'}
                    minValue={0}
                    maxValue={tempColorList[index + 1] ? tempColorList[index + 1]['range'] : 100}
                    value={tempColorList[index]['range']}
                    HD_onInput={e => {
                      tempColorList[index]['range'] = +e.target.value;
                      this.setState({});
                    }}
                  />
                  <div style={{margin: '0px 2px 0px 2px'}}>%</div>
                </div>
                {/*<div>{tE.toFixed()}%</div>*/}
                <div
                  style={{
                    width: '28px', height: '28px', margin: '1px',
                    textAlign: 'center',
                  }}
                  className={'transparent_checker'}
                >
                  <div style={{
                    background: tColor,
                    width: '28px', height: '28px',
                    cursor: 'pointer',
                    borderRadius: '4px', border: '1px solid #000',
                    marginRight: '10px',
                    textAlign: 'center',
                  }}
                       onClick={() => {
                         if (!this.state.colorPicker[index]) {
                           this.state.colorPicker[index] = new ColorPicker({
                             type: "sketch",
                             position: 'inline',
                             color: tColor,
                             container: this.refColorPickerContainer[index].current,
                             onChange: color => {
                               tColorData['color'] = color;
                               this.setState({});
                             }
                           });
                         }
                         targetColorData = tColorData;
                         // this.state.colorPicker[index].setOption({color: tColor});
                         this.state.colorPicker[index].initColorWithoutChangeEvent(tColor);
                         this.state.openColorPicker = [];
                         this.state.openColorPicker[index] = true;
                         this.setState({});
                       }}
                  />

                </div>


                <div style={{
                  ...style.colorPicker,
                  transform: Math.floor(index / 10) === index / 10 ? 'translate(-25% , 40px)' : index % 10 === 9 ? 'translate(-75% , 40px)' : 'translate(-50% , 40px)',
                  display: this.state.openColorPicker[index] ? 'block' : 'none'
                }}>
                  <div ref={this.refColorPickerContainer[index]}/>
                  <div style={style.complete} onClick={() => {
                    this.state.openColorPicker[index] = false;
                    this.setState({});
                  }}>완료
                  </div>
                </div>
              </div>;
            })
          }
        </div>
        <div style={{display: 'flex',}}>
          <div style={{alignItems: 'center', flexDirection: 'column', width: '200px'}}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div className={'ui_item_title'}>division</div>
              <RedNumber
                minValue={1}
                maxValue={450}
                step={1}
                value={this.state['division'] || 1}
                HD_onInput={e => {
                  let t0 = Math.max(+e.target.value, 1);
                  this.setState({division: t0, tempColorList: []});
                }}/>
              <div/>
              <RedSelect title={'ease'} value={this.state['easeName']} options={easeNameList} HD_change={e => {
                this.setState({easeName: e.target.value, tempColorList: []});
              }}/>
              <div/>
              <RedSelect title={'easeType'} value={this.state['easeType']} options={easeTypeList} HD_change={e => {
                this.setState({easeType: e.target.value, tempColorList: []});
              }}/>
              <div/>
              <RedSelect title={'gradient type'} value={this.state['type']} options={Object.entries(gradientTypes)}
                         HD_change={e => {
                           this.setState({type: e.target.value, tempColorList: []});
                         }}/>
              {/*             */}
              <div style={{display: 'flex', alignItems: 'center'}}>
                start color
                <div
                  style={{
                    width: '28px', height: '28px', margin: '1px',
                    textAlign: 'center',
                  }}
                  className={'transparent_checker'}
                >
                  <div style={{
                    background: this.state.startColor['color'],
                    width: '28px', height: '28px',
                    cursor: 'pointer',
                    borderRadius: '4px', border: '1px solid #000',
                    marginRight: '10px',
                    textAlign: 'center',
                  }}
                       onClick={() => {
                         if (!this.state.colorPicker[startIndex]) {
                           this.state.colorPicker[startIndex] = new ColorPicker({
                             type: "sketch",
                             position: 'inline',
                             color: this.state.startColor['color'],
                             container: this.refColorPickerContainer[startIndex].current,
                             onChange: color => {
                               this.state.startColor['color'] = color;
                               this.setState({});
                             }
                           });
                         }
                         // this.state.colorPicker[index].setOption({color: tColor});
                         this.state.colorPicker[startIndex].initColorWithoutChangeEvent(this.state.startColor['color']);
                         this.state.openColorPicker = [];
                         this.state.openColorPicker[startIndex] = true;
                         this.setState({});
                       }}
                  />
                  <div style={{
                    ...style.colorPicker,
                    transform: 'translate(0% , 40px)',
                    display: this.state.openColorPicker[startIndex] ? 'block' : 'none'
                  }}>
                    <div ref={this.refColorPickerContainer[startIndex]}/>
                    <div style={style.complete} onClick={() => {
                      this.state.openColorPicker[startIndex] = false;
                      this.setState({tempColorList: []});
                    }}>완료
                    </div>
                  </div>
                </div>
                {/* */}
                end Color
                <div
                  style={{
                    width: '28px', height: '28px', margin: '1px',
                    textAlign: 'center',
                  }}
                  className={'transparent_checker'}
                >
                  <div style={{
                    background: this.state.endColor['color'],
                    width: '28px', height: '28px',
                    cursor: 'pointer',
                    borderRadius: '4px', border: '1px solid #000',
                    marginRight: '10px',
                    textAlign: 'center',
                  }}
                       onClick={() => {
                         if (!this.state.colorPicker[lastIndex]) {
                           this.state.colorPicker[lastIndex] = new ColorPicker({
                             type: "sketch",
                             position: 'inline',
                             color: this.state.endColor['color'],
                             container: this.refColorPickerContainer[lastIndex].current,
                             onChange: color => {
                               this.state.endColor['color'] = color;
                               this.setState({});
                             }
                           });
                         }
                         // this.state.colorPicker[index].setOption({color: tColor});
                         this.state.colorPicker[lastIndex].initColorWithoutChangeEvent(this.state.endColor['color']);
                         this.state.openColorPicker = [];
                         this.state.openColorPicker[lastIndex] = true;
                         this.setState({});
                       }}
                  />
                  <div style={{
                    ...style.colorPicker,
                    transform: 'translate(-50% , 40px)',
                    display: this.state.openColorPicker[lastIndex] ? 'block' : 'none'
                  }}>
                    <div ref={this.refColorPickerContainer[lastIndex]}/>
                    <div style={style.complete} onClick={() => {
                      this.state.openColorPicker[lastIndex] = false;
                      this.setState({tempColorList: []});
                    }}>완료
                    </div>
                  </div>
                </div>
              </div>
              {/**/}
            </div>
          </div>

          <div style={{
            marginLeft: '16px',
            borderRadius: '10px',
          }}>
            Preview
            <div style={{
              width: '800px',
              height: '400px',
              overflow: 'hidden',
              borderRadius: '16px',
              background: this.renderGradientColorList(tempColorList)
            }}>
              {tempColorList.map((v, index) => {
                if (index >= rangeList.length) return '';
                return <div style={{
                  position: 'absolute',
                  top: 0,
                  left: v['range'] + '%',
                  width: (v['rangeEnd'] - v['range']) + '%',
                  bottom: 0
                }}/>;
              })}
            </div>
          </div>
        </div>
        <div style={{margin: '16px 0px'}}>
          <button
            style={{
              color: '#fff',
              background: '#666',
              padding: '8px 16px',
              borderRadius: '8px',
              outline: 'none',
              border: 0,
              cursor: 'pointer'
            }}
            onClick={e => this.props.HD_cancel()}
          >Cancel
          </button>
          <button
            style={{
              color: '#fff',
              background: 'linear-gradient(rgb(94, 122, 222), rgb(58, 73, 125))',
              padding: '8px 16px',
              borderRadius: '8px',
              outline: 'none',
              border: 0,
              marginLeft: '10px',
              cursor: 'pointer'
            }}
            onClick={v => {
              let t0 = tempColorList;
              this.props.HD_apply(t0, this.state.type);
            }}
          >Apply
          </button>
        </div>
      </div>
    </div>;
  }
}

export default RedAddGradientLayerSet;
const
  style = {
    bg: {
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.46)',
      zIndex: 2
    },
    container: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      overflowY: 'auto',
      minHeight: '600px',
      maxHeight: '800px',
      background: '#333',
      borderRadius: '8px',
      border: '1px solid #000',
      boxShadow: '0 0 16px rgba(0,0,0,0.16)',
      zIndex: 1,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'column'
    },
    colorPicker: {
      zIndex: 1, position: 'absolute', top: 0, left: '50%', transform: 'translate(-50% , 50px)',
      boxShadow: '0px 0px 16px rgba(0,0,0,0.5)',
      background: '#fff',
      borderRadius: '8px',
      overflow: 'hidden'
    },
    complete: {padding: '4px', background: '#5e7ade', cursor: 'pointer', textAlign: 'center'},
  };
