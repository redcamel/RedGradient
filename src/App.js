/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import './App.css';
import React from 'react';
import RedCanvas from "./editor/canvas/RedCanvas.jsx";
import RedLayer from "./editor/layer/RedLayer.jsx";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import RedPropertyEdit from "./editor/property/RedPropertyEdit.jsx";
import CALC_GRADIENT from "./editor/CALC_GRADIENT";
import RedCanvasEdit from "./editor/canvas/edit/RedCanvasEdit";
import RedTitle from "./core/RedTitle";
import RedStart from "./start/RedStart.jsx";
import RedFrameMenuOpen from "./editor/frameMainMenu/RedFrameMenuOpen.jsx";
import RedFrameMenuSave from "./editor/frameMainMenu/RedFrameMenuSave.jsx";
import RedPreset from "./editor/property/preset/RedPreset.jsx";
import DataLayer from "./editor/data/DataLayer.js";
import BORDER_REPEAT_TYPE from "./editor/BORDER_REPEAT_TYPE.js";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  checkUnloadEvent() {
    if (this.state && !window.onbeforeunload) {
      window.onbeforeunload = e => {
        return "레알 나감????????????";
      }
    }
  }

  updateRootState(v = {}) {
    console.log(v)
    this.setState(v)
  }

  setNewCanvas(newState) {
    this.state = newState
    this.state.activeLayer = this.state.layers[0];
    this.state.activeSubData = this.state.activeLayer['items'][0];
    //
    if(!this.state.borderGradientInfo){
      this.state.borderGradientInfo = {
        'border_image_sliceT': 1,
        'border_image_sliceR': 1,
        'border_image_sliceL': 1,
        'border_image_sliceB': 1,
        'border_image_repeat': BORDER_REPEAT_TYPE.STRETCH,
        'border_image_outset': 0,
        "activeLayer": null,
        "activeSubData": null,
        "bgColor": "#ffffff",
        "layers": [
          new DataLayer()
        ]
      }
    }

    const canvasInfo = this.state.canvasInfo
    if (!canvasInfo.hasOwnProperty('border_radius')) {

      canvasInfo['border_radius'] = 0;
      canvasInfo['border_radius_unit'] = 'px';
    }
    if (!canvasInfo.hasOwnProperty('border_radius_mergeMode')) {
      canvasInfo['border_radius_mergeMode'] = 1
      canvasInfo['border_radius_split'] = [0,0,0,0];
      canvasInfo['border_radius_unit_split'] = ['px','px','px','px'];
    }
    if (!canvasInfo.hasOwnProperty('border_width')) {
      canvasInfo['border_width'] = 0;
      canvasInfo['border_width_unit'] = 'px';
      canvasInfo['border_type'] = 'solid';
      canvasInfo['border_color'] = '#000';
    }
    if (!canvasInfo.hasOwnProperty('outline_width')) {
      canvasInfo['outline_width'] = 0;
      canvasInfo['outline_width_unit'] = 'px';
      canvasInfo['outline_type'] = 'solid';
      canvasInfo['outline_color'] = '#000';
      canvasInfo['outline_offset'] = 0;
      canvasInfo['outline_offset_unit'] = 'px';
    }
    this.state.borderGradientInfo.canvasInfo = this.state.canvasInfo
    this.state.borderGradientInfo.activeLayer = this.state.borderGradientInfo.layers[0];
    this.state.borderGradientInfo.activeSubData = this.state.borderGradientInfo.activeLayer['items'][0];
    //
    this.updateRootState(this.state);
  }

  render() {
    // console.log(this.state);
    if (!this.state) return <RedStart rootComponent={this}/>
    const canvasInfo = this.state.canvasInfo
    let containerCssText
    {
      containerCssText = Object.entries(RedCanvas.getContainerCss(canvasInfo))
      containerCssText = containerCssText.map(v => {
        return `${v[0]} : ${v[1]}`
      });
      containerCssText = containerCssText.join(';\n').replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
      containerCssText = `.result {
          background : ${JSON.stringify(CALC_GRADIENT.calcGradients(this.state.layers), null, 2, this.state.bgColor).replace(/"/g, '')};
          background-blend-mode : ${CALC_GRADIENT.calcBlendMode(this.state.layers)};
          ${containerCssText}
          }`.replace(/\s\s+/g, ' ')
    }
    this.checkUnloadEvent()
    return <div className={'frame'}>
      <div className={'frame_main_menu'}>
        <div style={{display: 'flex', alignItems: 'center', fontSize: '16px', fontWeight: 'bold', margin: '0px 8px'}}>
          <img src={'./tempLogo.svg'} height={'26px'} style={{marginRight: '7px'}}/>
          RedGradient
        </div>
        <RedFrameMenuOpen rootComponent={this}/>
        <RedFrameMenuSave rootComponent={this}/>

        {/*<div style={style.test}>언두/리두</div>*/}
      </div>
      {/*<div className={'frame_toolbar'}>frame ToolBar*/}

      {/*</div>*/}
      <div className={'frame_middle'}>
        <div className={'frame_middle_container'}>
          <div className={'frame_left'}>
            {/*frame Left*/}
            <div style={{display: "flex", height: '100%', overflowY: 'auto'}}>
              <RedCanvasEdit rootComponent={this}/>

            </div>
          </div>
          <div className={'frame_center'}>
            {/*frame_center*/}
            <RedCanvas rootComponent={this}/>
          </div>
          <div className={'frame_right'}>
            {/*frame_right Right*/}
            <div style={{display: "flex", height: '100%'}}>
              <RedLayer rootComponent={this}/>
              {this.state.activeSubData ? <RedPropertyEdit rootComponent={this}/> : ''}
              <div style={{display: "flex", height: '100%', alignContent: 'space-between', flexDirection: 'column'}}>
                <div style={{width: '225px'}}>
                  <RedTitle title={'Gradient Preset'}/>
                  <div style={{height: '400px', overflowY: 'auto', padding: '4px'}}>
                    <RedPreset rootComponent={this}/>
                  </div>
                  <RedTitle title={'Result'}/>
                  <button
                    style={style.copyClass}
                    onClick={e => {
                      var tempElem = document.createElement('textarea');
                      tempElem.value = containerCssText;
                      document.body.appendChild(tempElem);
                      tempElem.select();
                      document.execCommand("copy");
                      document.body.removeChild(tempElem);
                      alert('Copy Class!')
                    }}
                  >Copy Class
                  </button>
                  <SyntaxHighlighter language="css" wrapLongLines={'pre'}>
                    {containerCssText}
                  </SyntaxHighlighter>
                </div>
                <div>TODO - 애드센스자리</div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className={'frame_bottom'}>
        {/*frame Bottom*/}
      </div>
      <div className={'frame_status'}>
        <a href={'https://github.com/redcamel/RedGradient'} target={'_blank'}>GitHub :
          https://github.com/redcamel/RedGradient</a>
        <div>This project is maintained by <a href={'mailto:webseon@gmail.com'}>RedCamel</a></div>
      </div>
    </div>;
  }
}

export default App;
const style = {
  test: {
    background: '#5e7ade',
    margin: '1px'
  },
  copyClass: {
    cursor: 'pointer',
    margin: '4px 4px 0px',
    padding: '4px',
    width: 'calc(100% - 8px)',
    fontSize: '12px',
    color: '#fff',
    outline: 'none',
    border: '1px solid #111',
    background: 'linear-gradient(#5e7ade, #2c3565)',
    borderRadius: '4px'
  }
};
