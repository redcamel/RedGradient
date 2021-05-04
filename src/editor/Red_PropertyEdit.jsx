import React from "react";
import UI_Title from "../core/UI_Title";
import UI_TextField from "../core/UI_TextField";
import UI_Number from "../core/UI_Number";

class Red_PropertyEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const data = rootComponentState.activeSubData;
    return <div style={style.container}>
      <UI_Title title={'Red_PropertyEdit'} />
      <div>
        <div>
          타이틀
          <UI_TextField value={data['title']} HD_onInput={e => {
            data['title'] = e.target.value;
            rootComponent.setState({});
          }} />
        </div>
        <div>TODO - 그라디언트 Edit</div>
        <div>
          Position
          <div>
            <UI_Number
              width={80}
              value={data['position']['x'] || 0}
              HD_onInput={e => {
                data['position']['x'] = e.target.value;
                rootComponent.setState({});
              }} />
            <UI_Number
              width={80}
              value={data['position']['y'] || 0}
              HD_onInput={e => {
                data['position']['y'] = e.target.value;
                rootComponent.setState({});
              }} />
          </div>
        </div>
        <div>
          Size
          <div>
            <UI_Number
              width={80}
              value={data['size']['w'] || 0}
              HD_onInput={e => {
                data['size']['w'] = e.target.value;
                rootComponent.setState({});
              }} />
            <UI_Number
              width={80}
              value={data['size']['h'] || 0}
              HD_onInput={e => {
                data['size']['h'] = e.target.value;
                rootComponent.setState({});
              }} />
          </div>
        </div>
        <div>TODO - 반복 Edit</div>
      </div>
      <div>
        <div>Current Data</div>
        {JSON.stringify(data)}
      </div>
    </div>;
  }

}

export default Red_PropertyEdit;
const style = {
  container: {
    width: '300px'
  },
  layer: {
    height: '30px'
  }
};
