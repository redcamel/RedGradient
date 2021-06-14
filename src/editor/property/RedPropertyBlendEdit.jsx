/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedSelect from "../../core/RedSelect.jsx";
import BLEND_MODE_TYPE from "../BLEND_MODE_TYPE";

class RedPropertyBlendEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubLayerData = rootComponentState.activeSubLayerData;
    return <div style={{display: 'flex', alignItems: 'center'}}>
      <div className={'ui_subTitle'}>Blend Mode</div>
      <RedSelect
        value={activeSubLayerData['blendMode']}
        options={Object.entries(BLEND_MODE_TYPE)}
        HD_change={e => {
          activeSubLayerData['blendMode'] = e.target.value;
          rootComponent.updateRootState({});
        }}/>
    </div>;
  }
}

export default RedPropertyBlendEdit;
