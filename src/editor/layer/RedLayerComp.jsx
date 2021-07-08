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

class RedLayerComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layerBgColor: 'transparent',
      layerViewSizeMode: 0
    };
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const layers = rootComponentState.layers;
    return <div style={{flexDirection: 'column', display: 'flex'}}>
      <RedLayerTop rootComponent={rootComponent} layersComponent={this} />
      <div style={style.container}>
        {
          layers.map((layer) => {
            return <RedLayerItem
              layerViewSizeMode={this.state.layerViewSizeMode}
              layerBgColor={this.state.layerBgColor}
              layer={layer}
              rootComponent={rootComponent}
            />;
          })
        }
      </div>
    </div>;
  }
}

export default RedLayerComp;
const style = {
  container: {
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: `0px 0px 10px 0px`
  }
};
