/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import DataItem from "../data/DataItem.js";
import {faEye, faEyeSlash, faMinusCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CALC_GRADIENT from "../CALC_GRADIENT";
import RedLayerItem from "./RedLayerItem.jsx";

let startDragLayer;
let startDragItem;
let emptyImage

class RedLayerSubItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layerBgColor: 'transparent',
      SIZE: props.size || 100,
      dragOverYn: false
    };
  }

  _toggleVisible(data) {
    data.visible = !data.visible;
    this.props.rootComponent.updateRootState({});
  }

  handleDragStart(e) {
    console.log('start ///////////////////');
    console.log(this);
    console.log(this.props.layer);
    console.log(this.props.item);
    RedLayerItem.clearDragInfo();
    RedLayerSubItem.clearDragInfo();
    startDragLayer = this.props.layer;
    startDragItem = this.props.item;
    if (!emptyImage) emptyImage = new Image()
    e.nativeEvent.dataTransfer.setDragImage(emptyImage, 0, 0);
  }

  handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    if (startDragLayer && e.target.className === 'droparea_title') this.setState({dragOverYn: false});
  }

  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    if (startDragLayer) this.setState({dragOverYn: true});
  }

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    if (startDragLayer) {
      console.log('drop ///////////////////');
      console.log(this);
      console.log(this.props.layer);
      console.log(this.props.item);
      console.log(e.nativeEvent);
      this.setState({dragOverYn: false});
      const dropAreaLayer = this.props.layer;
      const dropAreaItem = this.props.item;
      const dstIDX = dropAreaLayer.items.indexOf(dropAreaItem);
      const startIDX = startDragLayer.items.indexOf(startDragItem);
      startDragLayer.items.splice(startIDX, 1);
      dropAreaLayer.items.splice(dstIDX, 0, startDragItem);
    }
    RedLayerItem.clearDragInfo();
    RedLayerSubItem.clearDragInfo();
    this.props.rootComponent.updateRootState({});
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const item = this.props.item;
    const layer = this.props.layer;
    const activeSubDataYn = rootComponentState.activeSubData === item;
    const dragAble = layer.items.length > 1;
    let layerType = item.type.split('-');
    layerType = layerType[0].charAt(0).toUpperCase() + (layerType.length === 3 ? layerType[1].charAt(0).toUpperCase() : '');
    return <div
      style={{
        opacity: item.visible ? 1 : 0.5, transition: 'opacity 0.2s', padding: '0px 5px 5px 5px',
        background: '#232323',
        boxShadow: activeSubDataYn ? '0px 0px 5px rgba(255,0,0,0.5)' : '',
        border: '1px solid #333',
        borderRadius: '8px',
        margin: '4px 0px 4px 10px',
      }}
      draggable={dragAble}
      onDragStart={e => this.handleDragStart(e)}
      onDrop={e => this.handleDrop(e)}
      onDragOver={e => this.handleDragOver(e)}
      onDragEnter={e => this.handleDragEnter(e)}
      onDragLeave={e => this.handleDragLeave(e)}
      onDragEnd={e => {
        RedLayerItem.clearDragInfo();
        RedLayerSubItem.clearDragInfo();
        this.setState({dragOverYn: false})
        this.props.rootComponent.updateRootState({});
      }}

    >

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
                    rootComponent.updateRootState({activeSubData: layer.items[idx]});
                  }
                }}
        ><FontAwesomeIcon icon={faMinusCircle}/>
        </button>
        <button className={'layerType'}>{layerType}</button>
      </div>
      <div style={style.addGradientLayerItem}
           onClick={e => {
             const idx = layer.items.indexOf(item);
             const t0 = JSON.parse(JSON.stringify(item));
             layer.items.splice(idx, 0, t0);
             rootComponent.updateRootState({activeSubData: t0});
           }}
      >duplicate
      </div>
      <div
        className={'transparent_checker'}
        style={{
          width: `${this.state.SIZE}px`,
          height: `${this.state.SIZE}px`,
          cursor: 'pointer',
          borderRadius: '4px',
          overflow: 'hidden',
          transition: 'height 0.2s'
        }}
        onClick={() => rootComponent.updateRootState({activeLayer: layer, activeSubData: item})}
      >
        <div className={'layerItem'}
             style={{
               background: `${CALC_GRADIENT.calcGradientItem(item, false, layer)},${this.state.layerBgColor}`
             }}
        />

        <div style={activeSubDataYn ? style.activeLine : style.deActiveLine}/>
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
        <div
          style={{
            background: '#fff', color: '#000',
            fontSize: '12px', borderRadius: '5px', padding: '3px 12px',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.6)',
            zIndex: 0
          }}>
          drop here
        </div>
        <div
          className={'droparea_title'}
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
RedLayerSubItem.getDragInfo = () => startDragLayer
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
  }, addGradientLayerItem: {
    marginTop: '2px',
    background: '#5e7ade',
    padding: '3px 5px',
    fontSize: '11px',
    borderRadius: '4px',
    marginBottom: '2px',
    cursor: 'pointer'
  },
};
