import React from "react";
import UI_Title from "../core/UI_Title";
import UI_TextField from "../core/UI_TextField";

class Red_Property extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const data = rootComponentState.activeSubData;
    return <div style={style.container}>
      <UI_Title title={'Property'} />
      <div>
        <div>
          타이틀
          <UI_TextField value={data['title']} HD_onInput={e => {
            data['title'] = e.target.value;
            rootComponent.setState({});
          }} />
        </div>
        <div>TODO - 그라디언트 Edit</div>
        <div>TODO - 포지션 Edit</div>
        <div>TODO - 사이즈 Edit</div>
        <div>TODO - 반복 Edit</div>
      </div>
      <div>
        <div>Current Data</div>
        {JSON.stringify(data)}
      </div>
    </div>;
  }

}

export default Red_Property;
const style = {
  container: {
    width: '300px'
  },
  layer: {
    height: '30px'
  }
};
