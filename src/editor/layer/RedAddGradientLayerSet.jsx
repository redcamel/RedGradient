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
import RedSelect from "../../core/RedSelect.jsx";
import GRADIENT_TYPE from "../GRADIENT_TYPE.js";
import DataColor from "../data/DataColor.js";
import {ColorPicker} from "@easylogic/colorpicker";
import RedTitle from "../../core/RedTitle";

const easeNameList = [
  'none',
  'power1',
  'power2',
  'power3',
  'power4',
  'circ',
  'expo',
  'sine',
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
      type: gradientTypes.LINEAR
    };
    this.refColorPickerContainer = [];
    let i = 20;
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
    return <div style={style.bg}>

      <div style={style.container}>
        <div style={{width: '100%'}}><RedTitle title={"Add Layer Set"} /></div>
        <div style={{
          display: 'flex',
          width: '700px',
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
              let tColor = tempColorList[index] ? tempColorList[index]['color'] : `rgba(255,${255 * t0},${255 - 255 * t0},1)`;
              tempColorList[index] = tempColorList[index] || (new DataColor(tColor, tS, '%', false, false, true, tE));
              tempColorList[index]['range'] = tS;
              tempColorList[index]['rangeEnd'] = tE;
              tempColorList[index]['colorEnd'] = tempColorList[index]['color'];
              const tColorData = tempColorList[index];
              return <div style={{
                position: 'relative',
                padding: '5px',
                borderLeft: index ? '1px solid #777' : 0,
                width: `${100 / rangeList.length}%`,
              }}>
                <div>{tS.toFixed()}% ~</div>
                <div>{tE.toFixed()}%</div>
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
                    cursor:'pointer',
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


                <div style={{...style.colorPicker, display: this.state.openColorPicker[index] ? 'block' : 'none'}}>
                  <div ref={this.refColorPickerContainer[index]} />
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
              <RedNumber
                title={'division'}

                maxValue={15}
                value={this.state['division'] || 2}
                HD_onInput={e => {
                  let t0 = Math.max(e.target.value, 2);
                  this.setState({division: t0});
                }} />
              <div />
              <RedSelect title={'ease'} value={this.state['easeName']} options={easeNameList} HD_change={e => {
                this.setState({easeName: e.target.value});
              }} />
              <div />
              <RedSelect title={'easeType'} value={this.state['easeType']} options={easeTypeList} HD_change={e => {
                this.setState({easeType: e.target.value});
              }} />
              <div />
              <RedSelect title={'gradient type'} value={this.state['type']} options={Object.entries(gradientTypes)}
                         HD_change={e => {
                           this.setState({type: e.target.value});
                         }} />
            </div>
          </div>

          <div style={{
            marginLeft: '16px',
            borderRadius: '10px',
          }}>
            Preview
            <div style={{
              width: '470px',
              height: '400px',
              borderRadius: '16px',
              background: this.renderGradientColorList(tempColorList)
            }}>
              {tempColorList.map((v, index) => {
                if (index >= rangeList.length) return '';
                return <div style={{
                  position: 'absolute',
                  // borderRight : '1px dashed rgba(0,0,0,1)',
                  top: 0,
                  left: v['range'] + '%',
                  width: (v['rangeEnd'] - v['range']) + '%',
                  bottom: 0
                }} />;
              })}
            </div>
          </div>
        </div>
        <div style={{margin: '16px 0px'}}>
          <button
            style={{color:'#fff',background : '#666',padding: '8px 16px', borderRadius: '8px', outline: 'none', border: 0,cursor:'pointer'}}
            onClick={e => this.props.HD_cancel()}
          >Cancel
          </button>
          <button
            style={{color:'#fff',background : 'linear-gradient(rgb(94, 122, 222), rgb(58, 73, 125))',padding: '8px 16px', borderRadius: '8px', outline: 'none', border: 0,marginLeft:'10px',cursor:'pointer'}}
            onClick={v => {
              let t0 = JSON.parse(JSON.stringify(tempColorList))
              this.props.HD_apply(t0,this.state.type)
            }}
          >Apply
          </button>
        </div>
      </div>
    </div>;
  }
}

export default RedAddGradientLayerSet;
const style = {
  bg: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    background: 'rgba(0,0,0,0.46)',
    zIndex: 2
  },
  container: {
    position: 'fixed',
    overflow: 'hidden',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',

    height: '600px',
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
    zIndex: 1, position: 'absolute', top: 0, left: '50%', transform: 'translate(-50% , 150px)',
    boxShadow: '0px 0px 16px rgba(0,0,0,0.5)',
    background: '#fff',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  complete: {padding: '4px', background: '#5e7ade', cursor: 'pointer', textAlign: 'center'},
};