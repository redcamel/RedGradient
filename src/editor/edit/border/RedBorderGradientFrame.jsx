/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedBorderGradientEdit from "./RedBorderGradientEdit.jsx";
import RedBorderModeGradientEdit from "./RedBorderModeGradientEdit.jsx";
import getActiveLayer from "../../js/getActiveLayer.js";
import getActiveSubData from "../../js/getActiveSubData.js";

class RedBorderGradientFrame extends React.Component {
  constructor(props) {
    super(props);
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    this.state = rootComponentState['borderGradientInfo'];
    this.state.activeLayer = getActiveLayer(this.state);
    this.state.activeSubData = getActiveSubData(this.state);
    this.state.activeSubData.colorList[0].color = 'rgba(255,255,0,1)';
    this.state.activeSubData.colorList[1].color = 'rgba(0,255,0,1)';
    this.state.activeSubData.colorList[1].range = 50;
  }

  updateRootState(v = {}) {
    this.setState(v);
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    rootComponentState['borderGradientInfo'] = this.state;
    this.props.rootComponent.setState({});
  }

  render() {
    return <>
      <RedBorderModeGradientEdit rootComponent={this} />
      {this.state.activeSubData ? <RedBorderGradientEdit rootComponent={this} /> : ''}
    </>;
  }
}

export default RedBorderGradientFrame;
