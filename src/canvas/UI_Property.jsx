import React from "react";

class UI_Property extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const data = rootComponentState.activeData
    return <div style={style.container}>
      TODO - Property
      <div>
        {JSON.stringify(data)}
      </div>
    </div>;
  }

}

export default UI_Property;
const style = {
  container: {
    width : '300px'
  },
  layer: {
    height: '30px'
  }
};
