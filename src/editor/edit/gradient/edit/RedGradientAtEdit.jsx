/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedSelect from "../../../../core/RedSelect.jsx";
import RedNumber from "../../../../core/RedNumber.jsx";

class RedGradientAtEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    return <div>
      <div className={'ui_subTitle'}>Center</div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px 10px',
        flexDirection: 'column'
      }}>
        <div>
          <RedNumber
            title={'cX'}
            width={'179px'}
            value={activeSubData['at']['x'] || 0}
            HD_onInput={e => {
              activeSubData['at']['x'] = +e.target.value;
              rootComponent.updateRootState({});
            }} />
          <RedSelect value={activeSubData['at']['xUnit']} options={['px', '%']} HD_change={e => {
            activeSubData['at']['xUnit'] = e.target.value;
            rootComponent.updateRootState({});
          }} />
        </div>
        <div style={{width: '5px'}} />
        <div>
          <RedNumber
            title={'cY'}
            width={'179px'}
            value={activeSubData['at']['y'] || 0}
            HD_onInput={e => {
              activeSubData['at']['y'] = +e.target.value;
              rootComponent.updateRootState({});
            }} />
          <RedSelect value={activeSubData['at']['yUnit']} options={['px', '%']} HD_change={e => {
            activeSubData['at']['yUnit'] = e.target.value;
            rootComponent.updateRootState({});
          }} />
        </div>
      </div>

    </div>;
  }
}

export default RedGradientAtEdit;
