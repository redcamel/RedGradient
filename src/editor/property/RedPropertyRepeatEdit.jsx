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
      Repeat
      <RedSelect
        value={activeSubData['repeatType'].replace('-', '_').toUpperCase()}
        options={Object.keys(REPEAT_TYPE)}
        HD_change={e => {
          activeSubData['repeatType'] = REPEAT_TYPE[e.target.value];
          rootComponent.setState({});
        }}/>
    </div>;
  }
}

export default RedPropertyRepeatEdit;