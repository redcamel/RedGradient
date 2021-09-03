/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import DataItem from "../data/DataItem.js";
import {faClone, faCopy, faEye, faEyeSlash, faMinusCircle, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CALC_GRADIENT from "../../js/CALC_GRADIENT";
import RedLayerItem from "./RedLayerItem.jsx";
import getActiveSubData from "../js/getActiveSubData";

let startDragLayer;
let startDragItem;
let emptyImage;

class RedLayerSubItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layerBgColor: 'transparent',
      dragOverYn: false
    };
  }

  _toggleVisible(data) {
    data.visible = !data.visible;
    this.props.rootComponent.updateRootState({});
  }

  handleDragStart(e) {
    // console.log('start ///////////////////');
    // console.log(this);
    // console.log(this.props.layer);
    // console.log(this.props.item);
    RedLayerItem.clearDragInfo();
    RedLayerSubItem.clearDragInfo();
    startDragLayer = this.props.layer;
    startDragItem = this.props.item;
    if (!emptyImage) emptyImage = new Image();
    e.nativeEvent.dataTransfer.setDragImage(emptyImage, 0, 0);
  }

  handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    if (startDragLayer && e.target.className === 'drop_area_title') this.setState({dragOverYn: false});
  }

  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    if (startDragLayer) this.setState({dragOverYn: true});
  }

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    let t0 = {};
    if (startDragLayer) {
      // console.log('drop ///////////////////');
      // console.log(this);
      // console.log(this.props.layer);
      // console.log(this.props.item);
      // console.log(e.nativeEvent);
      this.setState({dragOverYn: false});
      const dropAreaLayer = this.props.layer;
      const dropAreaItem = this.props.item;
      const dstIDX = dropAreaLayer.items.indexOf(dropAreaItem);
      const startIDX = startDragLayer.items.indexOf(startDragItem);
      startDragLayer.items.splice(startIDX, 1);
      dropAreaLayer.items.splice(dstIDX, 0, startDragItem);
      t0.activeLayer = dropAreaLayer;
      t0.activeSubData = dropAreaItem;
      t0.activeLayerIndex = this.props.layers.indexOf(dropAreaLayer);
      t0.activeSubDataIndex = this.props.layer['items'].indexOf(dropAreaItem);
    }
    RedLayerItem.clearDragInfo();
    RedLayerSubItem.clearDragInfo();
    this.props.rootComponent.updateRootState(t0);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const item = this.props.item;
    const layers = this.props.layers;
    const layer = this.props.layer;
    const activeSubDataYn = rootComponentState.activeSubData === item;
    const dragAble = layer.items.length > 1;
    const SIZE = this.props.layerViewSizeMode === 0 ? 100 : this.props.layerViewSizeMode === 1 ? 50 : 0;
    let layerType = item.type.split('-');
    layerType = layerType[0].charAt(0).toUpperCase() + (layerType.length === 3 ? layerType[1].charAt(0).toUpperCase() : '');
    return <div
      style={{
        opacity: item.visible ? 1 : 0.5, transition: 'opacity 0.2s, border 0.2s', padding: '0px 5px 5px 5px',
        background: '#232323',
        boxShadow: activeSubDataYn ? '0px 0px 15px rgba(94, 122, 222,0.25)' : '',
        border: activeSubDataYn ? '1px solid rgba(58, 78, 150,1)' : '1px solid #333',
        borderRadius: '8px',
        margin: '4px 0px 4px 10px',
      }}
      draggable={dragAble}
      onDragStart={e => this.handleDragStart(e)}
      onDrop={e => this.handleDrop(e)}
      onDragOver={e => this.handleDragOver(e)}
      onDragEnter={e => this.handleDragEnter(e)}
      onDragLeave={e => this.handleDragLeave(e)}
      onDragEnd={() => {
        RedLayerItem.clearDragInfo();
        RedLayerSubItem.clearDragInfo();
        this.setState({dragOverYn: false});
        this.props.rootComponent.updateRootState({});
      }}
      onClick={() => {
        rootComponent.updateRootState({
          activeLayerIndex: layers.indexOf(layer),
          activeSubDataIndex: layer['items'].indexOf(item),
          activeLayer: layer, activeSubData: item
        });
      }}
    >
      <div
        className={'layerItemSubTitle'}
        style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap'}}
      >
        {item.title}
      </div>
      <div
        style={{margin: '2px 2px 1px 0px', display: this.props.layerViewSizeMode === 2 ? 'none' : ''}}
      >
        <button
          style={{...style.bgItem, background: '#000', color: '#fff',opacity : this.state.layerBgColor==='black' ? 1 : 0.2}}
          onClick={() => this.setState({layerBgColor: 'black'})}
        >B
        </button>
        <button
          style={{...style.bgItem, background: '#fff', color: '#000',opacity : this.state.layerBgColor==='white' ? 1 : 0.2}}
          onClick={() => this.setState({layerBgColor: 'white'})}
        >W
        </button>
        <button
          style={{...style.bgItem, borderRight: 0,opacity : this.state.layerBgColor==='transparent' ? 1 : 0.2}} className={'transparent_checker'}
          onClick={() => this.setState({layerBgColor: 'transparent'})}
        >T
        </button>
      </div>
      <div style={{margin: '1px 2px 2px 0px',display:'flex'}}>
        <button
          className={'layerVisible2 hoverButtonStyle'}
          onClick={() => this._toggleVisible(item)}
        >
          <FontAwesomeIcon icon={item.visible ? faEye : faEyeSlash} style={{fontSize:'14px'}}/>
        </button>
        <button
          className={'layerDel2 hoverButtonStyle'}
          style={{opacity: layer.items.length > 1 ? 1 : 0.25}}
          onClick={e => {
            e.stopPropagation();
            if (layer.items.length > 1) {
              let idx = layer.items.indexOf(item);
              layer.items.splice(idx, 1);
              if (!layer.items.length) {
                layer.items.push(new DataItem());
                idx = 0;
              }
              if (!layer.items[idx]) idx = idx - 1;
              rootComponent.updateRootState({activeSubData: layer.items[idx],activeSubDataIndex :idx});

            }
          }}
        >
          <FontAwesomeIcon icon={faTrash} style={{fontSize:'14px'}}/>
        </button>
        <button className={'layerType'}>{layerType}</button>
      </div>
      <div
        className={'hoverButtonStyle'}
        style={style.addGradientLayerItem}
        onClick={() => {
          const idx = layer.items.indexOf(item);
          const t0 = JSON.parse(JSON.stringify(item));
          layer.items.splice(idx, 0, t0);
          console.log('흠 뭐징',rootComponent,t0)
          rootComponent.updateRootState({activeSubData: t0});
        }}
      >
        <FontAwesomeIcon icon={faClone} style={{fontSize:'16px'}}/>
        <div style={{marginLeft: '5px'}}>duplicate</div>
      </div>
      <div
        className={'transparent_checker'}
        style={{
          display: this.props.layerViewSizeMode === 2 ? 'none' : '',
          width: `100%`,
          height: `${SIZE}px`,
          cursor: 'move',
          borderRadius: '4px',
          overflow: 'hidden',
          transition: 'height 0.2s'
        }}
      >
        <div
          className={'layerItem'}
          style={{background: `${CALC_GRADIENT.calcGradientItem(item, false, layer)},${this.state.layerBgColor}`}}
        />
        <div style={activeSubDataYn ? style.activeLine : style.deActiveLine} />
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0, left: 0, right: 0, overflow: 'hidden',
          height: this.state.dragOverYn ? '100%' : 0,
          opacity: this.state.dragOverYn ? 1 : 0,
          transition: 'opacity 0.2s',
          background: 'rgba(255, 122, 222,0.75)',
          borderRadius: '4px'
        }}>
        <div style={{
          background: '#fff',
          color: '#000',
          fontSize: '12px',
          borderRadius: '5px',
          padding: '3px 12px',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.6)',
          zIndex: 0
        }}>
          drop here
        </div>
        <div
          className={'drop_area_title'}
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, overflow: 'hidden',
            height: '100%'
          }}>
        </div>
      </div>
    </div>;
  }
}

RedLayerSubItem.clearDragInfo = () => {
  startDragLayer = null;
  startDragItem = null;
};
RedLayerSubItem.getDragInfo = () => startDragLayer;
export default RedLayerSubItem;
const style = {
  activeLine: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    border: '2px solid transparent',
    transition: 'border 0.2s'
  },
  deActiveLine: {
    border: '2px solid transparent',
  },
  bgItem: {
    padding: '2px',
    width: 'calc(100%/3)',
    border: 0,
    borderRight: '1px solid #000',
    height: '20px',
    fontSize: '10px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  addGradientLayerItem: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '2px',
    // background: 'linear-gradient(#5e7ade, #2c3565)',
    padding: '5px 5px',
    fontSize: '11px',
    borderRadius: '4px',
    border:'1px solid #111',
    marginBottom: '2px',
    cursor: 'pointer'
  },
};
