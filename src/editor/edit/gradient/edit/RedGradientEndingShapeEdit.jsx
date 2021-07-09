/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedSelect from "../../../../core/RedSelect.jsx";
import ENDING_SHAPE_TYPE from "../../../../const/ENDING_SHAPE_TYPE";

class RedGradientEndingShapeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    return <div style={{display: 'flex', alignItems: 'center'}}>

      <div className={'ui_subTitle'}>EndingShape</div>
      <RedSelect
        value={activeSubData['typeEndingShape']}
        options={Object.entries(ENDING_SHAPE_TYPE)}
        HD_change={e => {
          activeSubData['typeEndingShape'] = e.target.value;
          rootComponent.updateRootState({});
        }} />
    </div>;
  }
}

export default RedGradientEndingShapeEdit;
