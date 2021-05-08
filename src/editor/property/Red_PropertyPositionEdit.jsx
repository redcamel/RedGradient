import React from "react";
import UI_Select from "../../core/UI_Select";
import UI_Number from "../../core/UI_Number";

class Red_PropertyPositionEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    return <div>
      Start Position
      <div>
        <UI_Number
          width={'80px'}
          value={activeSubData['position']['x'] || 0}
          HD_onInput={e => {
            activeSubData['position']['x'] = e.target.value;
            rootComponent.setState({});
          }} />
        <UI_Select value={activeSubData['position']['xUnit']} options={['px', '%']} HD_change={e => {
          activeSubData['position']['xUnit'] = e.target.value;
          rootComponent.setState({});
        }} />
        <UI_Number
          width={'80px'}
          value={activeSubData['position']['y'] || 0}
          HD_onInput={e => {
            activeSubData['position']['y'] = e.target.value;
            rootComponent.setState({});
          }} />
        <UI_Select value={activeSubData['position']['yUnit']} options={['px', '%']} HD_change={e => {
          activeSubData['position']['yUnit'] = e.target.value;
          rootComponent.setState({});
        }} />
      </div>
    </div>;
  }

}

export default Red_PropertyPositionEdit;
