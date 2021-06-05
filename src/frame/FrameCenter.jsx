/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedCanvas from "../editor/canvas/RedCanvas.jsx";

class FrameCenter extends React.Component {
  constructor(props) {
    super(props);
  }
  updateRootState(v) {
    this.props.rootComponent.updateRootState(v)
  }
  render() {
    const rootComponent = this.props.rootComponent
    const rootComponentState = rootComponent.state
    this.state = rootComponentState[rootComponentState.activeEditKey]

    return <div className={'frame_center'}>
      {/*frame_center*/}
      <RedCanvas rootComponent={this} appComponent={rootComponent}/>
    </div>
  }
}

export default FrameCenter
