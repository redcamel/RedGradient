import React from "react";
import RedSelect from "../../core/RedSelect.jsx";
import RedNumber from "../../core/RedNumber.jsx";

class RedPropertyAtEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    return <div>
      At
      <div>
        <RedNumber
          width={'80px'}
          value={activeSubData['at']['x'] || 0}
          HD_onInput={e => {
            activeSubData['at']['x'] = e.target.value;
            rootComponent.setState({});
          }} />
        <RedSelect value={activeSubData['at']['xUnit']} options={['px', '%']} HD_change={e => {
          activeSubData['at']['xUnit'] = e.target.value;
          rootComponent.setState({});
        }} />
        <RedNumber
          width={'80px'}
          value={activeSubData['at']['y'] || 0}
          HD_onInput={e => {
            activeSubData['at']['y'] = e.target.value;
            rootComponent.setState({});
          }} />
        <RedSelect value={activeSubData['at']['yUnit']} options={['px', '%']} HD_change={e => {
          activeSubData['at']['yUnit'] = e.target.value;
          rootComponent.setState({});
        }} />
      </div>
      Size
      <div>
        <RedNumber
          width={'80px'}
          value={activeSubData['size']['w'] || 0}
          HD_onInput={e => {
            activeSubData['size']['w'] = e.target.value;
            rootComponent.setState({});
          }} />
        <RedSelect value={activeSubData['size']['wUnit']} options={['px', '%']} HD_change={e => {
          activeSubData['size']['wUnit'] = e.target.value;
          rootComponent.setState({});
        }} />
        <RedNumber
          width={'80px'}
          value={activeSubData['size']['h'] || 0}
          HD_onInput={e => {
            activeSubData['size']['h'] = e.target.value;
            rootComponent.setState({});
          }} />
        <RedSelect value={activeSubData['size']['hUnit']} options={['px', '%']} HD_change={e => {
          activeSubData['size']['hUnit'] = e.target.value;
          rootComponent.setState({});
        }} />
      </div>
    </div>;
  }
}

export default RedPropertyAtEdit;
