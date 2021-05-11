import React from "react";
import RedSelect from "../../core/RedSelect.jsx";
import RedNumber from "../../core/RedNumber.jsx";

class RedPropertyPositionEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    return <div>
      Position
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <RedNumber
          width={'80px'}
          value={activeSubData['position']['x'] || 0}
          HD_onInput={e => {
            activeSubData['position']['x'] = e.target.value;
            rootComponent.setState({});
          }} />
        <RedSelect value={activeSubData['position']['xUnit']} options={['px', '%']} HD_change={e => {
          activeSubData['position']['xUnit'] = e.target.value;
          rootComponent.setState({});
        }} />
        <RedNumber
          width={'80px'}
          value={activeSubData['position']['y'] || 0}
          HD_onInput={e => {
            activeSubData['position']['y'] = e.target.value;
            rootComponent.setState({});
          }} />
        <RedSelect value={activeSubData['position']['yUnit']} options={['px', '%']} HD_change={e => {
          activeSubData['position']['yUnit'] = e.target.value;
          rootComponent.setState({});
        }} />
      </div>
    </div>;
  }
}

export default RedPropertyPositionEdit;
