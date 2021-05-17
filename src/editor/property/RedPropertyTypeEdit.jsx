/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import GRADIENT_TYPE from "../GRADIENT_TYPE";
import RedRadio from "../../core/RedRadio";

class RedPropertyTypeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    return <RedRadio
      value={activeSubData['type']}
      options={Object.entries(GRADIENT_TYPE)}
      HD_change={e => {
        activeSubData['type'] = e.target.value;
        rootComponent.updateRootState({});
      }}/>;
  }
}

export default RedPropertyTypeEdit;
