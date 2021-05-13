import React from "react";
import RedSelect from "../../../core/RedSelect.jsx";
import RedNumber from "../../../core/RedNumber.jsx";

class RedCanvasFilterBlurEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getCss(){
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const filterData = rootComponentState['canvasInfo']['filterData']
    return `blur(${filterData['amount']}px)`
  }
  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const filterData = rootComponentState['canvasInfo']['filterData']
    return <div>
      Blur
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <RedNumber
          value={filterData['amount'] || 0}
          HD_onInput={e => {
            filterData['amount'] = e.target.value;
            filterData['css'] = this.getCss()
            rootComponent.setState({});
          }} />


      </div>
    </div>;
  }
}

export default RedCanvasFilterBlurEdit;
