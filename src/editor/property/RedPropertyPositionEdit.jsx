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

class RedPropertyPositionEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubLayerData = rootComponentState.activeSubLayerData;
    return <div>
      <div className={'ui_subTitle'}>Position</div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 10px',
        flexDirection: 'column'
      }}>
        <div>
          <RedNumber
            title={'x'}
            width={'179px'}
            value={activeSubLayerData['position']['x'] || 0}
            HD_onInput={e => {
              activeSubLayerData['position']['x'] = +e.target.value;
              rootComponent.updateRootState({});
            }}/>
          <RedSelect value={activeSubLayerData['position']['xUnit']} options={['px', '%']} HD_change={e => {
            activeSubLayerData['position']['xUnit'] = e.target.value;
            rootComponent.updateRootState({});
          }}/>
        </div>
        <div style={{width: '5px'}}/>
        <div>
          <RedNumber
            title={'y'}
            width={'179px'}
            value={activeSubLayerData['position']['y'] || 0}
            HD_onInput={e => {
              activeSubLayerData['position']['y'] = +e.target.value;
              rootComponent.updateRootState({});
            }}/>
          <RedSelect value={activeSubLayerData['position']['yUnit']} options={['px', '%']} HD_change={e => {
            activeSubLayerData['position']['yUnit'] = e.target.value;
            rootComponent.updateRootState({});
          }}/>
        </div>
      </div>
    </div>;
  }
}

export default RedPropertyPositionEdit;
