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

class RedCanvasBorderGradientFrame extends React.Component {
  constructor(props) {
    super(props);
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    this.state = rootComponentState['borderGradientInfo']
    this.state.activeLayer = this.state.layers[0];
    this.state.activeSubData = this.state.activeLayer['items'][0];
    this.state.activeSubData.colorList[0].color = 'rgba(255,255,0,1)'
    this.state.activeSubData.colorList[1].color = 'rgba(0,255,0,1)'
    this.state.activeSubData.colorList[1].range = 50
  }

  updateRootState(v = {}) {
    this.setState(v)
    this.props.rootComponent.setState({borderGradientInfo: this.state})
  }

  render() {
    return <>
      <RedCanvasBorderModeGradientEdit
        rootComponent={this}/>
      {this.state.activeSubData ? <RedPropertyBorderGradientEdit rootComponent={this}/> : ''}
    </>;
  }
}

export default RedCanvasBorderGradientFrame;
const style = {}
