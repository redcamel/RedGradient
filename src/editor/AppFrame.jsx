/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import '../App.css';
import React from 'react';
import RedCanvas from "./canvas/RedCanvas.jsx";
import RedLayer from "./layer/RedLayer.jsx";
import RedPropertyEdit from "./property/RedPropertyEdit.jsx";
import RedContainerEdit from "./canvas/edit/RedContainerEdit";
import RedTitle from "../core/RedTitle";
import RedFrameMenuOpen from "./frameMainMenu/RedFrameMenuOpen.jsx";
import RedFrameMenuSave from "./frameMainMenu/RedFrameMenuSave.jsx";
import RedPreset from "./property/preset/RedPreset.jsx";
import 'react-toastify/dist/ReactToastify.css';
import RedTitleTB from "../core/RedTitleTB.jsx";
import LOCAL_STORAGE_MANAGER from "./LOCAL_STORAGE_MANAGER.js";
import {faFolder, faFolderOpen} from "@fortawesome/free-solid-svg-icons";
import ACTIVE_FRAME_KEY from "./ACTIVE_FRAME_KEY";
import getActiveLayer from "./getActiveLayer";
import getActiveSubData from "./getActiveSubData";
import BORDER_REPEAT_TYPE from "./BORDER_REPEAT_TYPE";
import DataLayer from "./data/DataLayer";
import RedContainerBorderEdit from "./canvas/edit/RedContainerBorderEdit";
import RedPreview from "./RedPreview.jsx";
import getUUID from "../getUUID.js";

class AppFrame extends React.Component {
  constructor(props) {
    super(props);
  }

  checkData() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    Object.values(ACTIVE_FRAME_KEY).forEach(key => {
      {
        const activeFrameState = rootComponentState[key];
        activeFrameState['key'] = key
        activeFrameState.activeLayer = getActiveLayer(activeFrameState);
        activeFrameState.activeSubData = getActiveSubData(activeFrameState);
        //
        if (!activeFrameState.borderGradientInfo) {
          activeFrameState.borderGradientInfo = {
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
          };
        }
        const canvasInfo = activeFrameState.canvasInfo;
        if (!canvasInfo.hasOwnProperty('border_radius')) {
          canvasInfo['border_radius'] = 0;
          canvasInfo['border_radius_unit'] = 'px';
        }
        if (!canvasInfo.hasOwnProperty('border_radius_mergeMode')) {
          canvasInfo['border_radius_mergeMode'] = 1;
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
          canvasInfo['border_width_mergeMode'] = 1;
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
        activeFrameState.borderGradientInfo.canvasInfo = activeFrameState.canvasInfo;
        activeFrameState.borderGradientInfo.activeLayer = getActiveLayer(activeFrameState.borderGradientInfo);
        activeFrameState.borderGradientInfo.activeSubData = getActiveSubData(activeFrameState.borderGradientInfo);
      }
    })
  }

  updateRootState(v = {}) {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    for (const k in v) this.state[k] = v[k];
    this.setState({});
    rootComponent.updateRootState({
      [rootComponentState.activeFrameKey]: this.state
    });
  }

  render() {
    LOCAL_STORAGE_MANAGER.check();
    this.checkData()
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    this.state = rootComponentState[rootComponentState.activeFrameKey];
    return <div className={'frame'}>
      <div className={'frame_main_menu'}>
        <div style={{display: 'flex', alignItems: 'center', fontSize: '16px', fontWeight: 'bold', margin: '0px 8px'}}>
          <img alt={'logo'} src={'./tempLogo.svg'} height={'26px'} style={{marginRight: '7px'}}/>
          RedGradient
        </div>
        <RedFrameMenuOpen rootComponent={rootComponent}/>
        <RedFrameMenuSave rootComponent={rootComponent}/>
      </div>
      <div className={'frame_toolbar'}>
        <div style={{display: 'flex', height: '100%', alignItem: 'center'}}>
          <div style={{
            marginLeft: LOCAL_STORAGE_MANAGER.checkAllClose() ? '26px' : '387px',
            width: '360px',
            display: 'flex'
          }}>
            {
              Object.values(ACTIVE_FRAME_KEY).map((key, index) => {
                return <div
                  style={{
                    display: 'flex',
                    width: '100px',
                    height: '30px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    borderLeft: index ? 0 : '1px solid #000',
                    borderRight: '1px solid #000',
                    background: rootComponentState.activeFrameKey === key ? 'linear-gradient(#5e7ade, #2c3565)' : '#333'
                  }}
                  onClick={e => {
                    rootComponentState.activeFrameKey = key;
                    console.log(rootComponentState);
                    rootComponent.updateRootState({});
                  }}
                >{key}</div>;
              })
            }
            <div
              style={{
                display: 'flex',
                width: '100px',
                height: '30px',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                borderRight: '1px solid #000',
                background: '#333'
              }}
              onClick={e => {
                this.previewModeYn = true
                this.previewModeKey = getUUID()
                this.setState({})
              }}
            >Preview
            </div>
            {this.previewModeYn ? <RedPreview
              key={this.previewModeKey}
              rootComponent={rootComponent}
              HD_Close={e => {
                this.previewModeYn = false
                this.setState({})
              }}/> : ''}
          </div>
        </div>
      </div>
      <div className={'frame_middle'}>
        <div className={'frame_middle_container'}>
          <div className={'frame_left'}>
            {/*frame Left*/}
            <div style={{display: "flex", height: '100%'}}>
              <div style={{display: "flex", flexDirection: 'column', height: '100%'}}>
                {
                  RedTitleTB.TAB_LIST.map(key => {
                    return <div
                      style={{background: 'rgb(60, 60, 60)'}}
                      onClick={() => {
                        LOCAL_STORAGE_MANAGER.toggleTabOpenYn(key);
                        this.setState({});
                      }}
                    >
                      <RedTitleTB
                        icon={LOCAL_STORAGE_MANAGER.getTabOpenYn(key) ? faFolderOpen : faFolder}
                        title={key}
                        writingMode={'tb'}
                        background={LOCAL_STORAGE_MANAGER.getTabOpenYn(key) ? 'rgb(32, 32, 32)' : ''}
                      />

                    </div>;
                  })
                }
              </div>

              {
                LOCAL_STORAGE_MANAGER.getTabOpenYn('Container') ?
                  <div style={{
                    display: "flex", height: '100%', overflowY: 'auto',
                    borderLeft: '1px solid rgb(26, 26, 26)',
                  }}>
                    <RedContainerEdit rootComponent={this}/>
                  </div> : ''
              }
              {
                LOCAL_STORAGE_MANAGER.getTabOpenYn('Border') ?
                  <div style={{
                    display: "flex", height: '100%', overflowY: 'auto',
                    borderLeft: '1px solid rgb(26, 26, 26)',
                  }}>
                    <RedContainerBorderEdit rootComponent={this}/>
                  </div> : ''
              }

            </div>
          </div>
          <div className={'frame_center'}>
            {/*frame_center*/}
            <RedCanvas rootComponent={this} appState={rootComponentState}/>
          </div>
          <div className={'frame_right'}>
            {/*frame_right Right*/}
            <div style={{height: '100%'}}>
              {
                LOCAL_STORAGE_MANAGER.getTabOpenYn('Gradient') ?
                  <>
                    <div style={{height: '200px', overflowY: 'auto', background: '#2d2d2d'}}>
                      <RedTitle title={'Gradient Preset'}/>
                      <div style={{padding: '4px'}}>
                        <RedPreset rootComponent={this}/>
                      </div>
                    </div>
                    <div style={{display: "flex", height: 'calc(100% - 190px)'}}>
                      <RedLayer rootComponent={this}/>
                      {this.state.activeSubData ? <RedPropertyEdit rootComponent={this}/> : ''}
                    </div>
                  </> : ''
              }

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

export default AppFrame;
