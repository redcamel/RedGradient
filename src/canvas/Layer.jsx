import React from "react";

class Layer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const layers = rootComponentState.layers;
    return <div style={style.container}>
      {
        layers.map((v, index) => {
          const activeDataYn = rootComponentState.activeData === v;
          return <div
            className={'transparent_checker'}
            style={{height: '35px'}}
            onClick={e => rootComponent.setState({activeData: v})}
          >
            <div
              className={'layerItem'}
              style={{background: Layer.calcItemGradient(v)}}
            />
            <div style={activeDataYn ? style.activeLine : style.deActiveLine} />
          </div>;
        })
      }
    </div>;
  }
}

Layer.calcGradients = layers => layers.map(v => Layer.calcItemGradient(v)).join(',');
Layer.calcItemGradient = v => v.items.join(',');
export default Layer;
const style = {
  container: {
    width: '100px',
    borderRight: '1px solid #000',
    overflowX: 'hidden',
    overflowY: 'scroll'
  },
  layerItem: {
    height: '35px',
    cursor: 'pointer'
  },
  activeLine: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    border: '2px solid rgba(255,0,0,1)',
    transition: 'border 0.2s'
  },
  deActiveLine: {
    border: '2px solid rgba(255,0,0,0)',
  }
};
