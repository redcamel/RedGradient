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
import RedPropertyEdit from "./editor/property/RedPropertyEdit.jsx";
import RedCanvasEdit from "./editor/canvas/edit/RedCanvasEdit";
import RedTitle from "./core/RedTitle";
import RedStart from "./start/RedStart.jsx";
import RedFrameMenuOpen from "./editor/frameMainMenu/RedFrameMenuOpen.jsx";
import RedFrameMenuSave from "./editor/frameMainMenu/RedFrameMenuSave.jsx";
import RedPreset from "./editor/property/preset/RedPreset.jsx";
import DataLayer from "./editor/data/DataLayer.js";
import BORDER_REPEAT_TYPE from "./editor/BORDER_REPEAT_TYPE.js";
import DataCanvas from "./editor/data/DataCanvas.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.history = []
    this.historyRedo = []
    window.addEventListener('resize',e=>{
      this.updateRootState()
    })
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
    // console.log(v)
    this.setState(v)
    if (this.history.length > 50) this.history.shift()
    this.history.push(JSON.parse(JSON.stringify(this.state)))
  }

  setNewCanvas(newState) {
    this.state = newState
    this.state.activeLayer = this.state.layers[0];
    this.state.activeSubData = this.state.activeLayer['items'][0];
    //
    if (!this.state.beforeInfo) {
      this.state.beforeInfo = new DataCanvas()
      this.state.beforeInfo.activeLayer = this.state.beforeInfo.layers[0];
      this.state.beforeInfo.activeSubData = this.state.beforeInfo.activeLayer['items'][0];
    }
    if (!this.state.afterInfo) {
      this.state.afterInfo = new DataCanvas()
      this.state.afterInfo.activeLayer = this.state.afterInfo.layers[0];
      this.state.afterInfo.activeSubData = this.state.afterInfo.activeLayer['items'][0];
    }
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
    this.checkUnloadEvent()
    return <div className={'frame'}>
      <div className={'frame_main_menu'}>
        <div style={{display: 'flex', alignItems: 'center', fontSize: '16px', fontWeight: 'bold', margin: '0px 8px'}}>
          <img src={'./tempLogo.svg'} height={'26px'} style={{marginRight: '7px'}}/>
          RedGradient
        </div>
        <RedFrameMenuOpen rootComponent={this}/>
        <RedFrameMenuSave rootComponent={this}/>
      </div>
      <div className={'frame_toolbar'}>
        <div style={{display: 'flex', height: '100%', alignItem: 'center'}}>
          <div style={{width: '360px'}}/>
          <div style={{
            cursor: 'pointer',
            padding: '10px',
            borderLeft: '1px solid #000',
            transition: 'all 0.2s',
            background: this.state.activeContainerLayer === 'beforeLayer' ? 'linear-gradient(rgb(94, 122, 222), rgb(58, 73, 125))' : ''
          }} onClick={e => {
            this.state.activeContainerLayer = 'beforeLayer'
            this.setState({})
          }}>Todo -
            ::before
          </div>
          <div style={{
            cursor: 'pointer',
            padding: '10px',
            borderLeft: '1px solid #000',
            transition: 'all 0.2s',
            background: this.state.activeContainerLayer === 'mainLayer' || !this.state.activeContainerLayer ? 'linear-gradient(rgb(94, 122, 222), rgb(58, 73, 125))' : ''
          }} onClick={e => {
            this.state.activeContainerLayer = 'mainLayer'
            this.setState({})
          }}>Todo - main
          </div>
          <div style={{
            cursor: 'pointer',
            padding: '10px',
            borderLeft: '1px solid #000',
            borderRight: '1px solid #000',
            transition: 'all 0.2s',
            background: this.state.activeContainerLayer === 'afterLayer' ? 'linear-gradient(rgb(94, 122, 222), rgb(58, 73, 125))' : ''
          }} onClick={e => {
            this.state.activeContainerLayer = 'afterLayer'
            this.setState({})
          }}>Todo - ::after
          </div>
        </div>
      </div>
      <div className={'frame_middle'}>
        <div className={'frame_middle_container'}>
          <div className={'frame_left'}>
            {/*frame Left*/}
            <div style={{display: "flex", height: '100%', overflowY: 'auto'}}>
              {
                this.state.activeContainerLayer === 'mainLayer' || !this.state.activeContainerLayer
                  ? <RedCanvasEdit rootComponent={this}/>
                  : <div>{this.state.activeContainerLayer} 콘테이너 프로퍼티 에디터 창</div>
              }

            </div>
          </div>
          <div className={'frame_center'}>
            {/*frame_center*/}
            <RedCanvas rootComponent={this}/>
          </div>
          <div className={'frame_right'}>
            {/*frame_right Right*/}

            <div style={{height: '100%'}}>
              <div style={{height: '200px', overflowY: 'auto', background: '#2d2d2d'}}>
                <RedTitle title={'Gradient Preset'}/>
                <div style={{padding: '4px'}}>
                  <RedPreset rootComponent={this}/>
                </div>
              </div>
              <div style={{display: "flex", height: 'calc(100% - 230px)'}}>
                {
                  this.state.activeContainerLayer === 'mainLayer' || !this.state.activeContainerLayer
                    ? <>
                      <RedLayer rootComponent={this}/>
                      {this.state.activeSubData ? <RedPropertyEdit rootComponent={this}/> : ''}
                    </>
                    : <div>{this.state.activeContainerLayer} 그라디언트 에디터 창</div>
                }

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
};
