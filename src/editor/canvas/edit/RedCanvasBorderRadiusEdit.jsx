import React from "react";
import RedSelect from "../../../core/RedSelect.jsx";
import REPEAT_TYPE from "../../REPEAT_TYPE.js";
import RedNumber from "../../../core/RedNumber";

class RedCanvasBorderRadiusEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    if(!canvasInfo.hasOwnProperty('border_radius_unit')){
      canvasInfo['border_radius'] = 0
      canvasInfo['border_radius_unit'] = 'px'
    }
    return <div style={style.container}>
      border radius

      <RedNumber
        width={'71px'}
        value={canvasInfo['border_radius'] || 0}
        HD_onInput={e => {
          canvasInfo['border_radius'] = e.target.value;
          rootComponent.setState({});
        }} />
      <RedSelect value={canvasInfo['border_radius_unit']} options={['px', '%']} HD_change={e => {
        canvasInfo['border_radius_unit'] = e.target.value;
        rootComponent.setState({});
      }} />
    </div>;
  }
}

export default RedCanvasBorderRadiusEdit;

const style={
  container : {
    display : 'flex',
    alignItems: 'center'
  }
}
