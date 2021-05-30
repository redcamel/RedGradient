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
import getUUID from "../../getUUID.js";

class RedPropertyPositionEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    return <div>
      <div className={'ui_subTitle'}>Position</div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 10px',
        flexDirection: 'column'
      }}>
        <div >
          <RedNumber
            title={'x'}
            width={'179px'}
            value={activeSubData['position']['x'] || 0}
            HD_onInput={e => {
              activeSubData['position']['x'] = +e.target.value;
              rootComponent.updateRootState({});
            }}/>
          <RedSelect value={activeSubData['position']['xUnit']} options={['px', '%']} HD_change={e => {
            activeSubData['position']['xUnit'] = e.target.value;
            rootComponent.updateRootState({});
          }}/>
        </div>
        <div style={{width: '5px'}}/>
        <div>
          <RedNumber
            title={'y'}
            width={'179px'}
            value={activeSubData['position']['y'] || 0}
            HD_onInput={e => {
              activeSubData['position']['y'] = +e.target.value;
              rootComponent.updateRootState({});
            }}/>
          <RedSelect value={activeSubData['position']['yUnit']} options={['px', '%']} HD_change={e => {
            activeSubData['position']['yUnit'] = e.target.value;
            rootComponent.updateRootState({});
          }}/>
        </div>
      </div>
    </div>;
  }
}

export default RedPropertyPositionEdit;
