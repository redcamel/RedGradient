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
import {ColorPicker} from "@easylogic/colorpicker";

let colorPicker

class RedCanvasSizeEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    return <div style={style.container}>
      <RedNumber width={'60px'} value={canvasInfo.width} HD_onInput={e => {
        canvasInfo.width = e.target.value;
        rootComponent.updateRootState({});
      }} />
      <RedNumber width={'60px'} value={canvasInfo.height} HD_onInput={e => {
        canvasInfo.height = e.target.value;
        rootComponent.updateRootState({});
      }} />
    </div>;
  }
}

export default RedCanvasSizeEdit;
const style = {
  container: {
    display: 'flex',
    alignItems: 'center'
  }
}
