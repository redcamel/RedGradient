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

class RedCanvasBorderRadiusEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    return <div style={style.container}>
      radius
      <RedNumber
        width={'51px'}
        value={canvasInfo['border_radius'] || 0}
        HD_onInput={e => {
          canvasInfo['border_radius'] = e.target.value;
          rootComponent.updateRootState({});
        }}/>
      <RedSelect value={canvasInfo['border_radius_unit']} options={['px', '%']} HD_change={e => {
        canvasInfo['border_radius_unit'] = e.target.value;
        rootComponent.updateRootState({});
      }}/>
    </div>;
  }
}

export default RedCanvasBorderRadiusEdit;
const style = {
  container: {
    display: 'flex',
    alignItems: 'center'
  }
}
