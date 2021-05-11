import React from "react";
import RedSelect from "../../core/RedSelect.jsx";
import GRADIENT_TYPE from "../GRADIENT_TYPE";
import ENDING_SHAPE_TYPE from "../ENDING_SHAPE_TYPE";

class RedPropertyTypeEndingShapeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    return <div>
      EndingShape
      <RedSelect
        value={activeSubData['typeEndingShape'].toUpperCase()}
        options={Object.keys(ENDING_SHAPE_TYPE)}
        HD_change={e => {
          activeSubData['typeEndingShape'] = ENDING_SHAPE_TYPE[e.target.value];
          rootComponent.setState({});
        }}/>
    </div>;
  }
}

export default RedPropertyTypeEndingShapeEdit;
