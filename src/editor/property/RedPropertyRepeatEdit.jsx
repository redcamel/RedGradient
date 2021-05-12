import React from "react";
import RedSelect from "../../core/RedSelect.jsx";
import REPEAT_TYPE from "../REPEAT_TYPE.js";

class RedPropertyRepeatEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    return <div>
      Repeat Mode
      <RedSelect
        value={activeSubData['typeRepeat'].replace('-', '_').toUpperCase()}
        options={Object.entries(REPEAT_TYPE)}
        HD_change={e => {
          activeSubData['typeRepeat'] = e.target.value;
          rootComponent.setState({});
        }} />
    </div>;
  }
}

export default RedPropertyRepeatEdit;
