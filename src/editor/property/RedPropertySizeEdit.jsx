/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedSelect from "../../core/RedSelect.jsx";
import RedNumber from "../../core/RedNumber.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLink} from "@fortawesome/free-solid-svg-icons";

class RedPropertySizeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    const canvasInfo = rootComponentState.canvasInfo;
    return <div>
      <div className={'ui_subTitle'}>Size</div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
          <div style={{
            opacity: activeSubData['fixRatioYn'] ? 0.1 : 0.01,
            position: 'absolute',
            top: '50%',
            left: 'calc(50% + 4px)',
            height: '30px',
            transform: 'translate(0,-50%)',
            borderRight: '1px solid #fff'
          }}/>
          <div style={{
            opacity: activeSubData['fixRatioYn'] ? 0.1 : 0.01,
            position: 'absolute',
            top: '-10px',
            left: 'calc(50% + 4px)',
            width: '12px',
            borderTop: '1px solid #fff'
          }}/>
          <div style={{
            opacity: activeSubData['fixRatioYn'] ? 0.1 : 0.01,
            position: 'absolute',
            bottom: '-10px',
            left: 'calc(50% + 4px)',
            width: '12px',
            borderTop: '1px solid #fff'
          }}/>
          <FontAwesomeIcon icon={faLink}
                           style={{
                             filter: activeSubData['fixRatioYn'] ? '' : 'brightness(0.5)',
                             marginLeft: '10px',
                             opacity: 1,
                             cursor: 'pointer',
                             transition: 'filter 0.2s'
                           }}
                           onClick={() => {
                             activeSubData['fixRatioYn'] = !activeSubData['fixRatioYn'];
                             if (activeSubData['fixRatioYn']) {
                               // - 픽스된경우 비쥬얼 에디터의 리사이즈도 모양과 동작이 변화되어야함
                               const sizeInfo = activeSubData['size']
                               if (sizeInfo['wUnit'] === sizeInfo['hUnit']) {
                               } else {
                                 const cW = (canvasInfo.width);
                                 const cH = (canvasInfo.height);
                                 const layoutSize = {
                                   w: sizeInfo['wUnit'] === '%' ? cW * sizeInfo['w'] / 100 : +sizeInfo['w'],
                                   h: sizeInfo['hUnit'] === '%' ? cH * sizeInfo['h'] / 100 : +sizeInfo['h'],
                                 };
                                 let t0, t1
                                 if (layoutSize['w'] > layoutSize['h']) {
                                   t0 = 'w'
                                   t1 = 'h'
                                 } else {
                                   t0 = 'h'
                                   t1 = 'w'
                                 }
                                 if (sizeInfo[`${t0}Unit`] === 'px') {
                                   sizeInfo[`${t1}Unit`] = 'px'
                                   sizeInfo[`${t1}`] = layoutSize[t1]
                                 } else {
                                   sizeInfo[`${t1}Unit`] = '%'
                                   sizeInfo[`${t1}`] = layoutSize[t1] / (t1 === 'w' ? cW : cH) * 100
                                 }
                               }
                             }
                             rootComponent.updateRootState({});
                           }}
          />

        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'column'}}>
          <div>
            <RedNumber
              title={'SizeW'}
              width={'165px'}
              value={activeSubData['size']['w'] || 0}
              HD_onInput={e => {
                activeSubData['size']['w'] = +e.target.value;
                if (activeSubData['fixRatioYn']) activeSubData['size']['h'] = activeSubData['size']['w']
                rootComponent.updateRootState({});
              }}/>
            <RedSelect value={activeSubData['size']['wUnit']} options={['px', '%']} HD_change={e => {
              activeSubData['size']['wUnit'] = e.target.value;
              if (activeSubData['fixRatioYn']) activeSubData['size']['hUnit'] = activeSubData['size']['wUnit']
              rootComponent.updateRootState({});
            }}/>
          </div>
          <div style={{width: '5px'}}/>
          <div>
            <RedNumber
              title={'SizeH'}
              width={'165px'}
              value={activeSubData['size']['h'] || 0}
              HD_onInput={e => {
                activeSubData['size']['h'] = +e.target.value;
                if (activeSubData['fixRatioYn']) activeSubData['size']['w'] = activeSubData['size']['h']
                rootComponent.updateRootState({});
              }}/>
            <RedSelect value={activeSubData['size']['hUnit']} options={['px', '%']} HD_change={e => {
              activeSubData['size']['hUnit'] = e.target.value;
              if (activeSubData['fixRatioYn']) activeSubData['size']['wUnit'] = activeSubData['size']['hUnit']
              rootComponent.updateRootState({});
            }}/>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default RedPropertySizeEdit;
