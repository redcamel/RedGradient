/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import DataLayer from "../data/DataLayer.js";
import RedTitle from "../../core/RedTitle.jsx";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const options = [
  'black',
  'white',
  'transparent'
];

class RedLayerTop extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const layers = rootComponentState.layers;
    const layersComponent = this.props.layersComponent;
    return <div>
      <RedTitle title={'Layer Edit'}/>
      <div style={style.addLayer}>
        <div style={style.addLayerItem}
             onClick={() => {
               let targetLayer;
               layers.splice(0, 0, targetLayer = new DataLayer());
               rootComponent.updateRootState({activeLayer: targetLayer, activeSubData: targetLayer['items'][0]});
             }}
        ><FontAwesomeIcon icon={faPlusCircle}/> Add Layer
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{width: '40%', textAlign: 'center',color:'rgba(255,255,255,0.5)'}}>layer Bg</div>
          <select style={{width: '60%', border: 0, outline: 'none', margin: 0}}
                  onChange={e => layersComponent.setState({layerBgColor: e.target.value})}>
            {options.map(v => <option value={v}>{v}</option>)}
          </select>
        </div>
        <div style={{marginTop: '3px', display: 'flex', overflow: 'hidden', borderRadius: '4px', height: '24px'}}>
          <div
            style={{
              ...style.viewScaleItem,
              opacity: layersComponent.state.viewScaleMode ? 0.25 : 1
            }}
            onClick={e => {
              layersComponent.setState({viewScaleMode: 0})
            }}
          >big
          </div>
          <div
            style={{
              ...style.viewScaleItem,
              opacity: layersComponent.state.viewScaleMode ? 1 : 0.25
            }}
            onClick={e => {
              layersComponent.setState({viewScaleMode: 1})
            }}
          >small
          </div>
        </div>
      </div>

    </div>;
  }
}

export default RedLayerTop;
const style = {
  addLayer: {
    position: 'sticky',
    padding: '4px 4px 4px 4px',
    top: 0,
    zIndex: 1,
    background: '#000'
  },
  addLayerItem: {
    background: 'linear-gradient(#7235d4, #4d1d93)',
    padding: '4px 8px',
    fontSize: '11px',
    borderRadius: '4px',
    marginBottom: '4px',
    cursor: 'pointer'
  },
  bgItem: {
    padding: '2px',
    margin: '2px 0px',
    fontSize: '11px',
    cursor: 'pointer',
    border: '1px solid rgba(255,255,255,0.16)',
    borderRadius: '4px'
  },
  viewScaleItem: {
    background: 'linear-gradient(rgb(114, 53, 212), rgb(77, 29, 147))',
    cursor: 'pointer',
    width: '50%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
