/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import GRADIENT_TYPE from "../../../../js/const/GRADIENT_TYPE";
import RedGradientColorItem from "./RedGradientColorItem";
import {faExchangeAlt, faSave} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import RedPreset from "../preset/RedPreset.jsx";
import RedPresetBorder from "../../border/preset/RedPresetBorder.jsx";
import RedGradientOffsetEdit from "./RedGradientOffsetEdit.jsx";
import {AutoSizer, List} from "react-virtualized";

//TODO - 일단 더미로 쭉 쳐보고 정리
class RedGradientColorEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIDX: 0,
      layerBgColor: 'transparent',
      //
    };
    this.refBar = React.createRef();
  }

  _rowRender(v) {
    // console.log(v)
    let idx = v['index'];
    let key = v['key'];
    let style = v['style'];
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    return <div style={{...style, padding: '10px 0px'}} key={key}>
      <RedGradientColorItem

        rootComponent={rootComponent}
        colorData={activeSubData['colorList'][idx]}
        activeYn={this.state.activeIDX === idx}
        HD_active={index => {
          this.setState({activeIDX: index});
        }}
        HD_sort={() => {
          // this.sortColorList();
        }}
      />
    </div>;
  }

  renderGradientColorList(data) {
    const itemList = [];
    const gradients = data['colorList'].map((v, index) => {
      const activeYn = this.state.activeIDX === index;
      itemList.push(this.renderColorStep(v, index, activeYn));
      let colorRangeTxt = '';
      if (v['useRange']) {
        let divideTxt = '';
        divideTxt = v['useDivide'] ? `,${v['colorEnd']} calc(${v['range']}${v['rangeUnit']} + 1px)` : '';
        let divideEndTxt = '';
        divideEndTxt = v['useDivideEnd'] && data['colorList'][index + 1] ? `,${data['colorList'][index + 1]['color']} calc(${v['rangeEnd']}${v['rangeUnit']} + 1px)` : '';
        return `${v['color']} ${v['range']}${v['rangeUnit']} ${divideTxt}, ${v['colorEnd']} ${v['rangeEnd']}${v['rangeUnit']} ${divideEndTxt}`;
      } else {
        colorRangeTxt = `${v['range']}${v['rangeUnit']}`;
        let divideTxt = '';
        divideTxt = v['useDivide'] && data['colorList'][index + 1] ? `,${data['colorList'][index + 1]['color']} calc(${v['range']}${v['rangeUnit']} + 1px)` : '';
        return `${v['color']} ${colorRangeTxt} ${divideTxt}`;
      }
    });
    const code = `${GRADIENT_TYPE.LINEAR}(90deg, ${gradients}),${this.state.layerBgColor}`;
    // console.log(code)
    return <div style={{
      height: '55px',
      background: code,
      transition: 'background 0.2s'
    }}>
      {itemList}
    </div>;
  };

  renderColorStep(v, index, activeYn) {
    let tLeft;
    tLeft = `${v['range']}%`;
    return <div
      style={{
        position: 'absolute',
        height: '10px',
        bottom: 0,
        left: tLeft,
        borderRadius: '4px',
        width: '4px',
        background: activeYn ? '#5e7ade' : '#fff',
        border: '1px solid #000',
        transform: `translate(-50%,100%)`,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'background 0.2s, top 0.2s, bottom 0.2s',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.46)'
      }}
    />;
  };

  sortColorList() {
    const canvasInfo = this.props.rootComponent.state.canvasInfo;
    this.props.rootComponent.state.activeSubData.colorList.sort((a, b) => {
      const aX = a['rangeUnit'] === '%' ? a['range'] : (a['range'] / canvasInfo['width'] * 100);
      const bX = b['rangeUnit'] === '%' ? b['range'] : (b['range'] / canvasInfo['width'] * 100);
      if (aX > bX) return 1;
      if (aX < bX) return -1;
      return 0;
    });
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    return <div style={style.container}>
      <div style={{display: 'flex', margin: '4px 0px', justifyContent: 'space-between'}}>
        <div className={'ui_subTitle'}>Preview</div>
        <div>
          <button style={{...style.bgItem, background: '#000', color: '#fff'}}
                  onClick={() => this.setState({layerBgColor: 'black'})}>B
          </button>
          <button style={{...style.bgItem, background: '#fff', color: '#000'}}
                  onClick={() => this.setState({layerBgColor: 'white'})}>W
          </button>
          <button style={{...style.bgItem}} className={'transparent_checker'}
                  onClick={() => this.setState({layerBgColor: 'transparent'})}>T
          </button>
        </div>
      </div>
      <div style={{display:'flex',margin: '4px 0px'}}>
        <button
          style={{...style.preset}}
          onClick={() => {
            this.props.borderMode ? RedPresetBorder.addUserPreset(rootComponent, activeSubData) : RedPreset.addUserPreset(rootComponent, activeSubData);
          }}
        ><FontAwesomeIcon icon={faSave} style={{marginRight: '5px'}} /> Add Preset
        </button>
        <button
          style={style.reverse}
          onClick={() => {
            // console.log('원본', JSON.parse(JSON.stringify(activeSubData['colorList'])));
            let t0 = JSON.parse(JSON.stringify(activeSubData['colorList']));
            t0 = t0.reverse();
            t0.forEach(v => {
              let base = 100;
              if (v['rangeUnit'] === '%') base = 100;
              else if (v['rangeUnit'] === 'deg') base = 360;
              else base = this.props.rootComponent.state.canvasInfo.width;
              if (v['useRange']) {
                let t0 = base - v['range'];
                v['range'] = base - v['rangeEnd'];
                v['rangeEnd'] = t0;
                t0 = v['color'];
                v['color'] = v['colorEnd'];
                v['colorEnd'] = t0;
              } else {
                v['range'] = base - v['range'];
                v['rangeEnd'] = base - v['rangeEnd'];
              }
            });
            activeSubData['colorList'] = t0;
            rootComponent.updateRootState({});
            // console.log('결과', t0);
          }}
        ><FontAwesomeIcon icon={faExchangeAlt} style={{marginRight: '5px'}} /> Reverse
        </button>
        <button
          style={{...style.preset}}
          onClick={() => {
            this.sortColorList()
            rootComponent.updateRootState({});
          }}
        ><FontAwesomeIcon icon={faSave} style={{marginRight: '5px'}} /> Auto Sort
        </button>
      </div>
      <div
        ref={this.refBar}
        className={'transparent_checker'}
        style={{border: '1px solid rgba(0,0,0,1)'}}
      >
        {this.renderGradientColorList(activeSubData)}
      </div>
      <div style={{marginTop: '20px'}}>
        <RedGradientOffsetEdit rootComponent={rootComponent} />
      </div>
      <div style={{marginTop: '15px'}}>
        <AutoSizer disableHeight>
          {({width}) => (
            <List
              ref="List"
              minHeight={window.innerHeight - 500}
              height={window.innerHeight - 500}
              overscanRowCount={10}
              rowCount={activeSubData['colorList'].length}
              rowHeight={110}
              rowRenderer={v => this._rowRender(v)}
              width={width}
            />
          )}
        </AutoSizer>
        {/*{*/}
        {/*  activeSubData['colorList'].map((v, index) => {*/}
        {/*    // js height=97*/}
        {/*    // if(height * index)*/}
        {/*    return <RedGradientColorItem*/}
        {/*      rootComponent={rootComponent}*/}
        {/*      colorData={v}*/}
        {/*      activeYn={this.state.activeIDX === index}*/}
        {/*      HD_active={index => {*/}
        {/*        this.setState({activeIDX: index});*/}
        {/*      }}*/}
        {/*      HD_sort={() => {*/}
        {/*        this.sortColorList();*/}
        {/*      }}*/}
        {/*    />;*/}
        {/*  })*/}
        {/*}*/}
      </div>

    </div>;
  }
}

export default RedGradientColorEdit;
const style = {
  container: {},
  bgItem: {
    padding: '2px',
    marginRight: '1px',
    width: '30px',
    height: '20px',
    fontSize: '10px',
    cursor: 'pointer',
    border: 0,
    fontWeight: 'bold'
  },
  preset: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '3px',
    background: '#5e7ade',
    color: '#fff',
    fontSize: '12px',
    border: '1px solid #000',
    borderRadius: '4px',
    height: '21px',
    whiteSpace: 'nowrap',
    cursor: 'pointer'
  },
  reverse: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '3px',
    background: '#5e7ade',
    color: '#fff',
    fontSize: '12px',
    border: '1px solid #000',
    borderRadius: '4px',
    height: '21px',
    cursor: 'pointer'
  }
};

