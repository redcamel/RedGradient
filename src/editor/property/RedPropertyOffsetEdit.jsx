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
import GRADIENT_TYPE from "../GRADIENT_TYPE.js";

class RedPropertyOffsetEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubLayerData = rootComponentState.activeSubLayerData;
    if (activeSubLayerData.type === GRADIENT_TYPE.CONIC || activeSubLayerData.type === GRADIENT_TYPE.REPEAT_CONIC) {
      activeSubLayerData['offsetUnit'] = 'deg'
    } else {
      if (activeSubLayerData['offsetUnit'] === 'deg') activeSubLayerData['offsetUnit'] = '%'
    }
    const unitList = activeSubLayerData.type === GRADIENT_TYPE.CONIC || activeSubLayerData.type === GRADIENT_TYPE.REPEAT_CONIC ? ['deg'] : ['px', '%']
    {
      activeSubLayerData['offsetUnit'] = activeSubLayerData['type'] === GRADIENT_TYPE.CONIC || activeSubLayerData['type'] === GRADIENT_TYPE.REPEAT_CONIC ? 'deg' : (activeSubLayerData['offsetUnit'] === 'deg' ? '%' : (activeSubLayerData['offsetUnit'] || '%'))
    }
    return <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <div className={'ui_item_title'}>start offset</div>
        <RedNumber
          width={'calc(100% - 80px)'}
          value={activeSubLayerData['offset'] || 0}
          HD_onInput={e => {
            activeSubLayerData['offset'] = +e.target.value;
            rootComponent.updateRootState({});
          }}/>
        <RedSelect
          width={80}
          value={activeSubLayerData['offsetUnit']} options={unitList} HD_change={e => {
          activeSubLayerData['offsetUnit'] = e.target.value;
          rootComponent.updateRootState({});
        }}/>
      </div>
    </div>;
  }
}

export default RedPropertyOffsetEdit;
