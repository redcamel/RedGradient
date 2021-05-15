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
import RedPropertyRepeatEdit from "../../../property/RedPropertyRepeatEdit.jsx";
import GRADIENT_TYPE from "../../../GRADIENT_TYPE.js";
import RedPropertyTypeEndingShapeEdit from "../../../property/RedPropertyTypeEndingShapeEdit.jsx";
import RedCanvasBorderGradientRepeatEdit from "./RedCanvasBorderGradientRepeatEdit.jsx";

class RedCanvasBorderModeGradientEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {canvasBgColorPickerOpenYn: false}
    this.refColorPickerContainer = React.createRef()
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    const activeSubData = rootComponentState.activeSubData;
    return <div style={style.container}>
      width <RedNumber
        width={'71px'}
        value={canvasInfo['border_width'] || 0}
        HD_onInput={e => {
          canvasInfo['border_width'] = e.target.value;
          rootComponent.updateRootState({});
        }}/>
      slice <RedNumber
      width={'71px'}
      value={canvasInfo['border_image_slice'] || 1}
      HD_onInput={e => {
        canvasInfo['border_image_slice'] = e.target.value;
        rootComponent.updateRootState({});
      }}/>
      outset <RedNumber
      width={'71px'}
      value={canvasInfo['border_image_outset'] || 0}
      HD_onInput={e => {
        canvasInfo['border_image_outset'] = e.target.value;
        rootComponent.updateRootState({});
      }}/>
      <RedCanvasBorderGradientRepeatEdit rootComponent={rootComponent} />

    </div>;
  }
}

export default RedCanvasBorderModeGradientEdit;
const style = {
  container: {
    // display: 'flex',
    alignItems: 'center'
  }
}
