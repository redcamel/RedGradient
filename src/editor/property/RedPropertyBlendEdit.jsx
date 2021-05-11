import React from "react";
import RedSelect from "../../core/RedSelect.jsx";
import GRADIENT_TYPE from "../GRADIENT_TYPE";
import BLEND_MODE_TYPE from "../BLEND_MODE_TYPE";

class RedPropertyBlendEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    return <RedSelect
      value={activeSubData['blendMode'].split('-')[0].toUpperCase()}
      options={Object.keys(BLEND_MODE_TYPE)}
      HD_change={e => {
        activeSubData['blendMode'] = BLEND_MODE_TYPE[e.target.value];
        rootComponent.setState({});
      }}/>
  }
}

export default RedPropertyBlendEdit;
