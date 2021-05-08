import React from "react";
import UI_Select from "../../core/UI_Select";
import GRADIENT_TYPE from "../GRADIENT_TYPE";
import UI_Number from "../../core/UI_Number";

class Red_PropertyTypeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    return <div>
      Type
      <UI_Select
        value={activeSubData['type'].split('-')[0].toUpperCase()}
        options={Object.keys(GRADIENT_TYPE)}
        HD_change={e => {
          activeSubData['type'] = GRADIENT_TYPE[e.target.value];
          rootComponent.setState({});
        }} />
    </div>;
  }

}

export default Red_PropertyTypeEdit;
