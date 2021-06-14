/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedPropertyBorderGradientEdit from "./RedPropertyBorderGradientEdit.jsx";
import RedCanvasBorderModeGradientEdit from "./RedCanvasBorderModeGradientEdit.jsx";
import getActiveLayerData from "../../../getActiveLayerData.js";
import getActiveSubLayerData from "../../../getActiveSubLayerData.js";

class RedCanvasBorderGradientFrame extends React.Component {
  constructor(props) {
    super(props);
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    this.state = rootComponentState['borderGradientInfo']
    this.state.activeLayerData = getActiveLayerData(this.state)
    this.state.activeSubLayerData = getActiveSubLayerData(this.state)
    this.state.activeSubLayerData.colorList[0].color = 'rgba(255,255,0,1)'
    this.state.activeSubLayerData.colorList[1].color = 'rgba(0,255,0,1)'
    this.state.activeSubLayerData.colorList[1].range = 50
  }

  updateRootState(v = {}) {
    this.setState(v)
    this.props.rootComponent.setState({borderGradientInfo: this.state})
  }

  render() {
    return <>
      <RedCanvasBorderModeGradientEdit
        rootComponent={this}/>
      {this.state.activeSubLayerData ? <RedPropertyBorderGradientEdit rootComponent={this}/> : ''}
    </>;
  }
}

export default RedCanvasBorderGradientFrame;