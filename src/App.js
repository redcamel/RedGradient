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
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RedTitleTB from "./core/RedTitleTB.jsx";
import LOCAL_STORAGE_MANAGER from "./editor/LOCAL_STORAGE_MANAGER.js";
import {faFolder, faFolderOpen} from "@fortawesome/free-solid-svg-icons";
import getActiveLayerData from "./editor/getActiveLayerData.js";
import getActiveSubLayerData from "./editor/getActiveSubLayerData.js";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.history = []
    this.historyRedo = []
    window.addEventListener('resize', () => {
      this.updateRootState()
    })
  }

  HD_keydown(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'Z') {
      // console.log('리두 실행해야함')
      let targetState = this.historyRedo.pop()
      if (targetState) {
        this.state = JSON.parse(JSON.stringify(targetState))
        this.state.activeLayerData = getActiveLayerData(this.state);
        this.state.activeSubLayerData = getActiveSubLayerData(this.state);
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
          this.state.activeLayerData = getActiveLayerData(this.state);
          this.state.activeSubLayerData = getActiveSubLayerData(this.state);
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
      window.onbeforeunload = () => {
        return "~";
      }
    }
  }

  updateRootState(v = {}) {
    // console.log(v)
    if (!this.state || !this.state.canvasInfo) return
    this.setState(v)
    if (this.history.length > 50) this.history.shift()
    this.history.push(JSON.parse(JSON.stringify(this.state)))
  }

  setNewCanvas(newState) {
    this.state = newState
    this.state.activeLayerData = getActiveLayerData(this.state);
    this.state.activeSubLayerData = getActiveSubLayerData(this.state);
    //
    if (!this.state.borderGradientInfo) {
      this.state.borderGradientInfo = {
        'border_image_sliceT': 1,
        'border_image_sliceR': 1,
        'border_image_sliceL': 1,
        'border_image_sliceB': 1,
        'border_image_repeat': BORDER_REPEAT_TYPE.STRETCH,
        'border_image_outset': 0,
        "activeLayerData": null,
        "activeSubLayerData": null,
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
    this.state.borderGradientInfo.activeLayerData = getActiveLayerData(this.state.borderGradientInfo);
    this.state.borderGradientInfo.activeSubLayerData = getActiveSubLayerData(this.state.borderGradientInfo);
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
          <img alt={'logo'} src={'./tempLogo.svg'} height={'26px'} style={{marginRight: '7px'}}/>
          RedGradient
        </div>
        <RedFrameMenuOpen rootComponent={this}/>
        <RedFrameMenuSave rootComponent={this}/>
      </div>
      <div className={'frame_toolbar'}>
        <div style={{display: 'flex', height: '100%', alignItem: 'center'}}>
          <div style={{width: '360px'}}/>
        </div>
      </div>
      <div className={'frame_middle'}>
        <div className={'frame_middle_container'}>
          <div className={'frame_left'}>
            {/*frame Left*/}
            <div style={{display: "flex", height: '100%'}}>
              <div
                style={{background: 'rgb(60, 60, 60)'}}
                onClick={() => {
                  LOCAL_STORAGE_MANAGER.toggleTabOpenYn('containerProperty')
                  this.setState({})
                }}
              >
                <RedTitleTB
                  icon={LOCAL_STORAGE_MANAGER.getTabOpenYn('containerProperty') ? faFolderOpen : faFolder}
                  title={'Container Property'}
                  writingMode={'tb'}
                  background={LOCAL_STORAGE_MANAGER.getTabOpenYn('containerProperty') ? 'rgb(32, 32, 32)' : ''}
                />
              </div>
              {
                LOCAL_STORAGE_MANAGER.getTabOpenYn('containerProperty') ?
                  <div style={{
                    display: "flex", height: '100%', overflowY: 'auto',
                    borderLeft: '1px solid rgb(26, 26, 26)',
                  }}>
                    <RedCanvasEdit rootComponent={this}/>
                  </div> : ''
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
              <div style={{display: "flex", height: 'calc(100% - 190px)'}}>
                <RedLayer rootComponent={this}/>
                {this.state.activeSubLayerData ? <RedPropertyEdit rootComponent={this}/> : ''}

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
      <ToastContainer
        hideProgressBar={true}
      />
    </div>;
  }
}

export default App;
