/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedLayerTop from "./RedLayerTop.jsx";
import RedLayerItem from "./RedLayerItem.jsx";

//TODO - 여기 정리해야함
class RedLayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layerBgColor: 'transparent',
      layerViewSizeMode : 0
    };
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const layers = rootComponentState.layers;
    return <div style={{flexDirection: 'column', display: 'flex'}}>
      <RedLayerTop rootComponent={rootComponent} layersComponent={this}/>
      <div style={style.container}>
        {
          layers.map((layer) => {
            return <RedLayerItem
              layerViewSizeMode = {this.state.layerViewSizeMode}
              layerBgColor={this.state.layerBgColor}
              layer={layer}
              rootComponent={rootComponent}
            />
          })
        }
      </div>
    </div>;
  }
}

export default RedLayer;
const style = {
  container: {
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: `0px 0px 10px 0px`
  },
  layerItem: {
    height: '35px',
    cursor: 'pointer'
  },
  activeLine: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    border: '2px solid #5e7ade',
    transition: 'border 0.2s'
  },
  deActiveLine: {
    border: '2px solid transparent',
  }
};
