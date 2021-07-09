/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import '../App.css';
import React from 'react';
import RedCanvas from "../editor/canvas/RedCanvas.jsx";
import RedLayerComp from "../editor/layer/RedLayerComp.jsx";
import RedGradientEditComp from "../editor/edit/gradient/RedGradientEditComp.jsx";
import RedContainerEdit from "../editor/edit/RedContainerEdit";
import RedTitle from "../core/RedTitle";
import RedFrameMenuOpen from "../editor/frameMainMenu/RedFrameMenuOpen.jsx";
import RedFrameMenuSave from "../editor/frameMainMenu/RedFrameMenuSave.jsx";
import RedPreset from "../editor/edit/gradient/preset/RedPreset.jsx";
import 'react-toastify/dist/ReactToastify.css';
import RedTitleTB from "../core/RedTitleTB.jsx";
import LOCAL_STORAGE_MANAGER from "../editor/js/LOCAL_STORAGE_MANAGER.js";
import {faFolder, faFolderOpen} from "@fortawesome/free-solid-svg-icons";
import ACTIVE_FRAME_KEY from "../const/ACTIVE_FRAME_KEY";
import getActiveLayer from "../editor/js/getActiveLayer";
import getActiveSubData from "../editor/js/getActiveSubData";
import BORDER_REPEAT_TYPE from "../const/BORDER_REPEAT_TYPE";
import DataLayer from "../editor/data/DataLayer";
import RedContainerBorderEdit from "../editor/edit/RedContainerBorderEdit";

class AppFrame extends React.Component {
  constructor(props) {
    super(props);
  }

  /**
   * 데이터를 돌면서 누락된 데이터들을 채워준다.
   */
  checkDatas() {
    const appComponent = this.props.appComponent;
    const appComponentState = appComponent.state;
    Object.values(ACTIVE_FRAME_KEY).forEach(key => {
      {
        const checkTargetState = appComponentState[key];
        checkTargetState['key'] = key;
        checkTargetState.activeLayer = getActiveLayer(checkTargetState);
        checkTargetState.activeSubData = getActiveSubData(checkTargetState);
        if (!checkTargetState.borderGradientInfo) {
          checkTargetState.borderGradientInfo = {
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
        const canvasInfo = checkTargetState.canvasInfo;
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
        checkTargetState.borderGradientInfo.canvasInfo = checkTargetState.canvasInfo;
        checkTargetState.borderGradientInfo.activeLayer = getActiveLayer(checkTargetState.borderGradientInfo);
        checkTargetState.borderGradientInfo.activeSubData = getActiveSubData(checkTargetState.borderGradientInfo);
      }
    });
  }

  updateRootState(v = {}) {
    const appComponent = this.props.appComponent;
    const appComponentState = appComponent.state;
    for (const k in v) this.state[k] = v[k];
    this.setState({});
    appComponent.updateRootState({[appComponentState.activeFrameKey]: this.state});
  }

  render() {
    LOCAL_STORAGE_MANAGER.check();
    this.checkDatas();
    const appComponent = this.props.appComponent;
    const appComponentState = appComponent.state;
    this.state = appComponentState[appComponentState.activeFrameKey];
    return <div className={'frame'}>
      <div className={'frame_main_menu'}>
        <div style={{display: 'flex', alignItems: 'center', fontSize: '16px', fontWeight: 'bold', margin: '0px 8px'}}>
          <img alt={'logo'} src={'./tempLogo.svg'} height={'26px'} style={{marginRight: '7px'}} />
          RedGradient
        </div>
        <RedFrameMenuOpen rootComponent={appComponent} />
        <RedFrameMenuSave rootComponent={appComponent} />
      </div>
      {/*<div className={'frame_toolbar'}>*/}
      {/* */}
      {/*</div>*/}
      <div className={'frame_middle'}>
        <div className={'frame_middle_container'}>
          <div className={'frame_left'}>
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
                    <RedContainerEdit rootComponent={this} />
                  </div> : ''
              }
              {
                LOCAL_STORAGE_MANAGER.getTabOpenYn('Border') ?
                  <div style={{
                    display: "flex", height: '100%', overflowY: 'auto',
                    borderLeft: '1px solid rgb(26, 26, 26)',
                  }}>
                    <RedContainerBorderEdit rootComponent={this} />
                  </div> : ''
              }
            </div>
          </div>
          <div className={'frame_center'}>
            <RedCanvas rootComponent={this} appComponent={appComponent} />
          </div>
          <div className={'frame_right'}>
            <div style={{height: '100%'}}>
              {
                LOCAL_STORAGE_MANAGER.getTabOpenYn('Gradient') ?
                  <>
                    <div style={{height: '200px', overflowY: 'auto', background: '#2d2d2d'}}>
                      <RedTitle title={'Gradient Preset'} />
                      <div style={{padding: '4px'}}>
                        <RedPreset rootComponent={this} />
                      </div>
                    </div>
                    <div style={{display: "flex", height: 'calc(100% - 190px)'}}>
                      <RedLayerComp rootComponent={this} />
                      {this.state.activeSubData ? <RedGradientEditComp rootComponent={this} /> : ''}
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
