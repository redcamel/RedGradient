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
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
import CleanCSS from "clean-css"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.history = []
    this.historyRedo = []
  }

  HD_keydown(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'Z') {
      // console.log('리두 실행해야함')
      let targetState = this.historyRedo.pop()
      if (targetState) {
        this.state = JSON.parse(JSON.stringify(targetState))
        this.state.activeLayer = this.state.layers[0];
        this.state.activeSubData = this.state.activeLayer['items'][0];
        this.updateRootState(this.state)
      }
      // console.log('history',this.history)
      // console.log('historyRedo',this.historyRedo)
    } else if (e.ctrlKey && e.key === 'z') {
      // console.log('언두 실행해야함')
      let targetState = this.history.pop()
      if (targetState) {
        this.historyRedo.push(JSON.parse(JSON.stringify(targetState)))
        targetState = this.history[this.history.length - 1]
        if (targetState) {
          this.state = JSON.parse(JSON.stringify(targetState))
          this.state.activeLayer = this.state.layers[0];
          this.state.activeSubData = this.state.activeLayer['items'][0];
          this.setState(this.state)
        }
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.HD_keydown.bind(this))
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.HD_keydown.bind(this))
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
    if (this.history.length > 50) this.history.shift()
    this.history.push(JSON.parse(JSON.stringify(this.state)))
  }

  setNewCanvas(newState) {
    this.state = newState
    this.state.activeLayer = this.state.layers[0];
    this.state.activeSubData = this.state.activeLayer['items'][0];
    //
    if (!this.state.borderGradientInfo) {
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
      canvasInfo['border_radius_split'] = [0, 0, 0, 0];
      canvasInfo['border_radius_unit_split'] = ['px', 'px', 'px', 'px'];
    }
    if (!canvasInfo.hasOwnProperty('border_width')) {
      canvasInfo['border_width'] = 0;
      canvasInfo['border_width_unit'] = 'px';
      canvasInfo['border_type'] = 'solid';
      canvasInfo['border_color'] = '#000';
    }
    if (!canvasInfo.hasOwnProperty('border_width_mergeMode')) {
      canvasInfo['border_width_mergeMode'] = 1
      canvasInfo['border_width_split'] = [0, 0, 0, 0];
      canvasInfo['border_width_unit_split'] = ['px', 'px', 'px', 'px'];
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
      containerCssText = Object.entries(RedCanvas.getContainerCss(canvasInfo, this.state.borderGradientInfo))
      containerCssText = containerCssText.map(v => {
        return `${v[0]} : ${v[1]}`
      });
      containerCssText = containerCssText.join(';\n').replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)
      containerCssText = `.result {
          background : ${JSON.stringify(CALC_GRADIENT.calcGradients(this.state.layers, true, this.state.bgColor), null, 2).replace(/"/g, '')};
          background-blend-mode : ${CALC_GRADIENT.calcBlendMode(this.state.layers)};
          ${containerCssText}
          }`.replace(/\s\s+/g, ' ')
      containerCssText = new CleanCSS({}).minify(containerCssText).styles;
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
                  <div style={{maxHeight : '400px',overflowY:'auto'}}>
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
                    <SyntaxHighlighter language="css" wrapLongLines={'pre'} style={dracula}>
                      {containerCssText}
                    </SyntaxHighlighter>
                    {/*optimized*/}
                    {/*<SyntaxHighlighter language="css" wrapLongLines={'pre'}>*/}
                    {/*  {containerCssTextOptimize}*/}
                    {/*</SyntaxHighlighter>*/}
                  </div>

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
