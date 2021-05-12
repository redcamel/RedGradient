import React from "react";
import PresetCircle from "./PresetCircle";
import RedLayer from "../editor/layer/RedLayer";
import PresetCircle2 from "./PresetCircle2";
import PresetCircle3 from "./PresetCircle3";
import PresetCircle4 from "./PresetCircle4";

const presetList = [
  {
    name: 'circle',
    component: PresetCircle
  },
  {
    name: 'circle2',
    component: PresetCircle2
  },
  {
    name: 'circle3',
    component: PresetCircle3
  },
  {
    name: 'circle4',
    component: PresetCircle4
  },
];

class RedPreset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    return <div style={style.container}>
      {
        presetList.map(v => {
          return <div
            style={style.iconContainer}
            onClick={e => {
              let t0 = new v['component']();
              const idx = rootComponentState.activeLayer.items.indexOf(activeSubData)
              rootComponentState.activeLayer.items.splice(idx,1,t0)
              rootComponentState.activeSubData = t0
              rootComponent.setState({});
            }}
          >
            <div style={{
              ...style.icon,
              background: RedLayer.calcGradientItem(new v['component']())
            }}>
            </div>
            {v['name']}
          </div>;
        })
      }
    </div>;
  }
}

export default RedPreset;
const style = {
  container: {
    display: 'flex'
  },
  iconContainer: {
    margin: '5px',
    cursor: 'pointer',
    textAlign : 'center'
  },
  icon: {
    width: '30px',
    height: '30px',
    background: '#fff',
    borderRadius: '5px',
    border : '1px solid rgba(0,0,0,0.5)'
  }
};
