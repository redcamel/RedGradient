/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */

import React from "react";
import DataItem from "../DataItem";
import RedLayer from "./RedLayer.jsx";
import {faEye, faEyeSlash, faMinusCircle} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const SIZE = 100;

class RedLayerSubItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layerBgColor: 'transparent'
    };
  }

  _toggleVisible(data) {
    data.visible = !data.visible;
    this.props.rootComponent.setState({});
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const item = this.props.item;
    const layer = this.props.layer;
    const layerSize = layer['size'];
    const activeSubDataYn = rootComponentState.activeSubData === item;
    return <div style={{
      opacity: item.visible ? 1 : 0.5, transition: 'opacity 0.2s', padding: '0px 5px 5px 5px',
      background: '#232323',
      border: '1px solid #333',
      borderRadius: '8px',
      margin: '4px 0px 4px 10px'
    }}>
      <div
        className={'layerItemSubTitle'}
        style={{textOverflow: 'ellipsis', width: '100px', overflow: 'hidden', whiteSpace: 'nowrap'}}>
        {item.title}</div>
      <div style={{margin: '2px 2px 2px 0px'}}>
        <button style={{...style.bgItem, background: '#000', color: '#fff'}}
                onClick={() => this.setState({layerBgColor: 'black'})}>B
        </button>
        <button style={{...style.bgItem, background: '#fff', color: '#000'}}
                onClick={() => this.setState({layerBgColor: 'white'})}>W
        </button>
        <button style={{...style.bgItem}} className={'transparent_checker'}
                onClick={() => this.setState({layerBgColor: 'transparent'})}>T
        </button>
      </div>
      <div style={{margin: '2px 2px 2px 0px'}}>
        <button className={'layerVisible'}
                onClick={() => this._toggleVisible(item)}><FontAwesomeIcon icon={item.visible ? faEye : faEyeSlash}/>
        </button>
        <button className={'layerDel'}
                onClick={e => {
                  e.stopPropagation();
                  let idx = layer.items.indexOf(item);
                  layer.items.splice(idx, 1);
                  if (!layer.items.length) {
                    layer.items.push(new DataItem());
                    idx = 0;
                  }
                  if (!layer.items[idx]) idx = idx - 1
                  rootComponent.setState({activeSubData: layer.items[idx]});
                }}
        ><FontAwesomeIcon icon={faMinusCircle}/>
        </button>
        <button className={'layerType'}>{item.type.charAt(0).toUpperCase()}</button>
      </div>
      <div
        className={'transparent_checker'}
        style={{
          width: `${SIZE}px`,
          height: `${SIZE}px`,
          cursor: 'pointer',
          borderRadius: '4px',
          overflow: 'hidden',
          transition: 'height 0.2s'
        }}
        onClick={() => rootComponent.setState({activeLayer: layer, activeSubData: item})}
      >
        <div className={'layerItem'}
             style={{
               background: `${RedLayer.calcGradientItem(item, false, layer)},${this.state.layerBgColor}`
             }}
        />

        <div style={activeSubDataYn ? style.activeLine : style.deActiveLine}/>
      </div>
    </div>;
  }
}

export default RedLayerSubItem;
const style = {
  activeLine: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    border: '2px solid #5e7ade',
    transition: 'border 0.2s'
  },
  deActiveLine: {
    border: '2px solid transparent',
  },
  bgItem: {
    padding: '2px',
    marginRight: '1px',
    width: '30px',
    height: '20px',
    fontSize: '10px',
    cursor: 'pointer',
    border: 0,
    fontWeight: 'bold'
  }
};
