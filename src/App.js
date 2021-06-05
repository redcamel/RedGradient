/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import './App.css';
import React from 'react';
import RedStart from "./start/RedStart.jsx";
import DataLayer from "./editor/data/DataLayer.js";
import BORDER_REPEAT_TYPE from "./editor/BORDER_REPEAT_TYPE.js";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FrameStatus from "./frame/FrameStatus.jsx";
import FrameMainMenu from "./frame/FrameMainMenu.jsx";
import FrameLeft from "./frame/FrameLeft.jsx";
import FrameCenter from "./frame/FrameCenter.jsx";
import FrameRight from "./frame/FrameRight.jsx";
import DataRedGradient from "./editor/data/DataRedGradient.js";
import ACTIVE_EDIT_KEY from "./editor/ACTIVE_EDIT_KEY.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.history = []
    this.historyRedo = []
    window.addEventListener('resize', e => {
      this.updateRootState()
    })
  }

  HD_keydown(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'Z') {
      // console.log('리두 실행해야함')
      let targetState = this.historyRedo.pop()
      if (targetState) {
        this.state = JSON.parse(JSON.stringify(targetState))
        this.state[this.state.activeEditKey].activeLayer = this.state[this.state.activeEditKey].layers[0];
        this.state[this.state.activeEditKey].activeSubData = this.state[this.state.activeEditKey].activeLayer['items'][0];
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

          this.state[this.state.activeEditKey].activeLayer = this.state[this.state.activeEditKey].layers[0];

          this.state[this.state.activeEditKey].activeSubData = this.state[this.state.activeEditKey].activeLayer['items'][0];
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
    if (!this.state || !this.state[this.state.activeEditKey] || !this.state[this.state.activeEditKey]['canvasInfo']) return
    this.setState(v)
    if (this.history.length > 50) this.history.shift()
    this.history.push(JSON.parse(JSON.stringify(this.state)))
    console.log('~~~', this.state)
  }

  setNewCanvas(newState = {}) {
    if (newState.hasOwnProperty('activeEditKey')) {
      this.state = newState;
    } else {
      this.state = new DataRedGradient()
      this.state[ACTIVE_EDIT_KEY.MAIN] = newState
    }
    console.log(this.state)
    this.state.activeEditKey = ACTIVE_EDIT_KEY.MAIN;
    [ACTIVE_EDIT_KEY.BEFORE, ACTIVE_EDIT_KEY.MAIN, ACTIVE_EDIT_KEY.AFTER].forEach(v => {
      v = this.state[v]
      v.activeLayer = v.layers[0];
      v.activeSubData = v.activeLayer['items'][0];
      //
      if (!v.borderGradientInfo) {
        v.borderGradientInfo = {
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
      const canvasInfo = v.canvasInfo
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
      v.borderGradientInfo.canvasInfo = v.canvasInfo
      v.borderGradientInfo.activeLayer = v.borderGradientInfo.layers[0];
      v.borderGradientInfo.activeSubData = v.borderGradientInfo.activeLayer['items'][0];
    })
    //
    this.updateRootState(this.state);
  }

  render() {
    // console.log(this.state);
    if (!this.state) return <RedStart rootComponent={this}/>
    this.checkUnloadEvent()
    return <div className={'frame'}>
      <FrameMainMenu rootComponent={this}/>
      {/*<FrameToolbar rootComponent={this}/>*/}
      <div className={'frame_middle'}>
        <div className={'frame_middle_container'}>
          <FrameLeft rootComponent={this}/>
          <FrameCenter rootComponent={this}/>
          <FrameRight rootComponent={this}/>
        </div>
      </div>
      <div className={'frame_bottom'}/>
      <FrameStatus/>
      <ToastContainer hideProgressBar={true}/>
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
