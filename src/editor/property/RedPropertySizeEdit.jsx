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
import {brightness} from "@easylogic/colorpicker/src/util/functions/fromRGB.js";

class RedPropertySizeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    return <div>
      <div className={'ui_subTitle'}>Size</div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center',height : '100%'}}>
          <div style={{opacity: 0.1, position: 'absolute', top: '50%', left : 'calc(50% + 4px)',height : '30px',transform : 'translate(0,-50%)', borderRight: '1px solid #fff'}}/>
          <div style={{opacity: 0.1, position: 'absolute', top: '-10px', left : 'calc(50% + 4px)',width : '12px',borderTop: '1px solid #fff'}}/>
          <div style={{opacity: 0.1, position: 'absolute', bottom: '-10px', left : 'calc(50% + 4px)',width : '12px', borderTop: '1px solid #fff'}}/>
          <FontAwesomeIcon icon={faLink} style={{filter : 'brightness(0.5)',marginLeft: '10px', opacity: 1, cursor: 'pointer'}}
                           onClick={e => {
                             alert('todo - 비율픽스처리, 같은 단위일경우 그냥고정, 다른 단위일경우 큰놈을 기준으로 단위 변환 고정')
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
                rootComponent.updateRootState({});
              }}/>
            <RedSelect value={activeSubData['size']['wUnit']} options={['px', '%']} HD_change={e => {
              activeSubData['size']['wUnit'] = e.target.value;
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
                rootComponent.updateRootState({});
              }}/>
            <RedSelect value={activeSubData['size']['hUnit']} options={['px', '%']} HD_change={e => {
              activeSubData['size']['hUnit'] = e.target.value;
              rootComponent.updateRootState({});
            }}/>
          </div>
        </div>
      </div>
    </div>;
  }
}

export default RedPropertySizeEdit;
