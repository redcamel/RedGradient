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

      Size
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <RedNumber
          width={'80px'}
          value={activeSubData['size']['w'] || 0}
          HD_onInput={e => {
            activeSubData['size']['w'] = e.target.value;
            rootComponent.updateRootState({});
          }} />
        <RedSelect value={activeSubData['size']['wUnit']} options={['px', '%']} HD_change={e => {
          activeSubData['size']['wUnit'] = e.target.value;
          rootComponent.updateRootState({});
        }} />
        <RedNumber
          width={'80px'}
          value={activeSubData['size']['h'] || 0}
          HD_onInput={e => {
            activeSubData['size']['h'] = e.target.value;
            rootComponent.updateRootState({});
          }} />
        <RedSelect value={activeSubData['size']['hUnit']} options={['px', '%']} HD_change={e => {
          activeSubData['size']['hUnit'] = e.target.value;
          rootComponent.updateRootState({});
        }} />
      </div>
    </div>;
  }
}

export default RedPropertySizeEdit;
