import React from "react";
import RedSelect from "../../core/RedSelect.jsx";
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
    return <div>
      Todo - Blend Mode
      <RedSelect
        value={activeSubData['blendMode'].split('-')[0].toUpperCase()}
        options={Object.entries(BLEND_MODE_TYPE)}
        HD_change={e => {
          activeSubData['blendMode'] = e.target.value;
          rootComponent.setState({});
        }} />
    </div>;
  }
}

export default RedPropertyBlendEdit;
