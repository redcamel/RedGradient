/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import DataLayer from "../../../data/DataLayer.js";
import RedPropertyBorderGradientEdit from "../../../property/RedPropertyBorderGradientEdit.jsx";

class RedCanvasBorderGradientFrame extends React.Component {
  constructor(props) {
    super(props);
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    if(!rootComponentState['canvasInfo']['borderGradientInfo']){
      rootComponentState['canvasInfo']['borderGradientInfo'] = {
        "canvasInfo": rootComponentState.canvasInfo,
        "activeLayer": null,
        "activeSubData": null,
        "bgColor": "#fff",
        "layers": [
          new DataLayer()
        ]
      }
    }
    this.state = rootComponentState['canvasInfo']['borderGradientInfo']
    this.state.activeLayer = this.state.layers[0];
    this.state.activeSubData = this.state.activeLayer['items'][0];
  }
  updateRootState(v = {}) {
    this.setState(v)
    this.props.rootComponent.setState({})
  }
  render() {
    return <>
      {/*<RedLayer rootComponent={this}/>*/}
      {this.state.activeSubData ? <RedPropertyBorderGradientEdit rootComponent={this}/> : ''}
    </>;
  }
}

export default RedCanvasBorderGradientFrame;
const style = {}
