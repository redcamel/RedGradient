/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedNumber from "../../../../core/RedNumber.jsx";
import ACTIVE_EDIT_KEY from "../../../ACTIVE_EDIT_KEY.js";

let colorPicker

class RedCanvasSizeEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const appComponent = this.props.appComponent;
    const rootComponentState = rootComponent.state;
    const appComponentState = appComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    return <div style={style.container}>

      <div className={'ui_subTitle'}>Container Size</div>
      <RedNumber title={'width'} width={'160px'} value={canvasInfo.width} HD_onInput={e => {
        canvasInfo.width = +e.target.value;
        appComponentState[ACTIVE_EDIT_KEY.BEFORE]['canvasInfo']['width'] = canvasInfo.width
        appComponentState[ACTIVE_EDIT_KEY.MAIN]['canvasInfo']['width'] = canvasInfo.width
        appComponentState[ACTIVE_EDIT_KEY.AFTER]['canvasInfo']['width'] = canvasInfo.width
        this.props.canvasComponent.state.useMove = false
        rootComponent.updateRootState({});
      }}/>
      <div style={{width: '5px'}}/>
      <RedNumber title={'height'} width={'160px'} value={canvasInfo.height} HD_onInput={e => {
        canvasInfo.height = +e.target.value;
        appComponentState[ACTIVE_EDIT_KEY.BEFORE]['canvasInfo']['height'] = canvasInfo.height
        appComponentState[ACTIVE_EDIT_KEY.MAIN]['canvasInfo']['height'] = canvasInfo.height
        appComponentState[ACTIVE_EDIT_KEY.AFTER]['canvasInfo']['height'] = canvasInfo.height
        this.props.canvasComponent.state.useMove = false
        rootComponent.updateRootState({});
      }}/>
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
