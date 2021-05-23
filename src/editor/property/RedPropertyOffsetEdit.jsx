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
    const activeSubData = rootComponentState.activeSubData;
    if(activeSubData.type === GRADIENT_TYPE.CONIC || activeSubData.type === GRADIENT_TYPE.REPEAT_CONIC){
      activeSubData['offsetUnit'] = '%'
    }else{
      if(activeSubData['offsetUnit']==='%') activeSubData['offsetUnit'] = '%'
    }

    const unitList = activeSubData.type === GRADIENT_TYPE.CONIC || activeSubData.type === GRADIENT_TYPE.REPEAT_CONIC ? ['deg'] : ['px', '%']
    return <div>

      start offset
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <RedNumber
          width={'80px'}
          value={activeSubData['offset'] || 0}
          HD_onInput={e => {
            activeSubData['offset'] = e.target.value;
            rootComponent.updateRootState({});
          }}/>
        <RedSelect value={activeSubData['offsetUnit']} options={[unitList]} HD_change={e => {
          activeSubData['offsetUnit'] = e.target.value;
          rootComponent.updateRootState({});
        }}/>
      </div>
    </div>;
  }
}

export default RedPropertyOffsetEdit;
