/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedTitle from "../core/RedTitle.jsx";
import RedPreset from "../editor/property/preset/RedPreset.jsx";
import RedLayer from "../editor/layer/RedLayer.jsx";
import RedPropertyEdit from "../editor/property/RedPropertyEdit.jsx";

class FrameRight extends React.Component {
  constructor(props) {
    super(props);
  }
  updateRootState(v) {
    this.props.rootComponent.updateRootState(v)
  }
  render() {
    this.state = this.props.rootComponent.state[this.props.rootComponent.state.activeEditKey]

    return <div className={'frame_right'}>
      {/*frame_right Right*/}
      <div style={{height: '100%'}}>
        <div style={{height: '200px', overflowY: 'auto', background: '#2d2d2d'}}>
          <RedTitle title={'Gradient Preset'}/>
          <div style={{padding: '4px'}}>
            <RedPreset rootComponent={this}/>
          </div>
        </div>
        <div style={{display: "flex", height: 'calc(100% - 190px)'}}>
          <RedLayer rootComponent={this}/>
          {this.state.activeSubData ? <RedPropertyEdit rootComponent={this}/>:''}
        </div>
      </div>
    </div>
  }
}

export default FrameRight
