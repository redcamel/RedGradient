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

class RedPropertyAtEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    return <div>
      Center
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <RedNumber
          width={'80px'}
          value={activeSubData['at']['x'] || 0}
          HD_onInput={e => {
            activeSubData['at']['x'] = e.target.value;
            rootComponent.updateRootState({});
          }}/>
        <RedSelect value={activeSubData['at']['xUnit']} options={['px', '%']} HD_change={e => {
          activeSubData['at']['xUnit'] = e.target.value;
          rootComponent.updateRootState({});
        }}/>
        <RedNumber
          width={'80px'}
          value={activeSubData['at']['y'] || 0}
          HD_onInput={e => {
            activeSubData['at']['y'] = e.target.value;
            rootComponent.updateRootState({});
          }}/>
        <RedSelect value={activeSubData['at']['yUnit']} options={['px', '%']} HD_change={e => {
          activeSubData['at']['yUnit'] = e.target.value;
          rootComponent.updateRootState({});
        }}/>
      </div>

    </div>;
  }
}

export default RedPropertyAtEdit;
