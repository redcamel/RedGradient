/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedSelect from "../../core/RedSelect.jsx";
import ENDING_SHAPE_TYPE from "../ENDING_SHAPE_TYPE";

class RedPropertyTypeEndingShapeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubLayerData = rootComponentState.activeSubLayerData;
    return <div style={{display: 'flex', alignItems: 'center'}}>

      <div className={'ui_subTitle'}>EndingShape</div>
      <RedSelect
        value={activeSubLayerData['typeEndingShape']}
        options={Object.entries(ENDING_SHAPE_TYPE)}
        HD_change={e => {
          activeSubLayerData['typeEndingShape'] = e.target.value;
          rootComponent.updateRootState({});
        }}/>
    </div>;
  }
}

export default RedPropertyTypeEndingShapeEdit;
