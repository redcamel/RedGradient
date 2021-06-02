/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import DataItem from "../data/DataItem.js";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faEye,
  faEyeSlash,
  faFolder,
  faFolderOpen,
  faMinusCircle,
  faPlusCircle
} from '@fortawesome/free-solid-svg-icons';
import CALC_GRADIENT from "../CALC_GRADIENT";
import RedLayerSubItem from "./RedLayerSubItem.jsx";
import RedAddGradientLayerSet from "./RedAddGradientLayerSet";

let startDragLayer

//TODO - 여기 정리해야함
class RedLayerItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SIZE: props.size || 100,
      dragOverYn: false,
      openPanel: false,
      draggable: true
    };
  }

  _toggleVisible(data) {
    data.visible = !data.visible;
    this.props.rootComponent.updateRootState({});
  }

  handleDragStart(e) {
    console.log('start ///////////////////')
    console.log(this)
    console.log(this.props.layer)
    RedLayerItem.clearDragInfo()
    if (!RedLayerSubItem.getDragInfo()) {
      RedLayerSubItem.clearDragInfo()
      startDragLayer = this.props.layer
    }
  }

  handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    if (startDragLayer && e.target.className === 'droparea_title2') this.setState({dragOverYn: false})
  }

  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    if (startDragLayer) this.setState({dragOverYn: true})
  }

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    if (startDragLayer) {
      console.log('drop ///////////////////')
      console.log(this)
      this.setState({dragOverYn: false})
      const layers = this.props.rootComponent.state.layers
      const dropAreaLayer = this.props.layer
      const dstIDX = layers.indexOf(dropAreaLayer)
      const startIDX = layers.indexOf(startDragLayer)
      layers.splice(startIDX, 1)
      layers.splice(dstIDX, 0, startDragLayer)
    }
    RedLayerItem.clearDragInfo()
    RedLayerSubItem.clearDragInfo()
    this.props.rootComponent.updateRootState({})
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const layers = rootComponentState.layers;
    const layer = this.props.layer;
    return <div
      style={{
        opacity: layer.visible ? 1 : 0.5, transition: 'opacity 0.2s',
        border: '1px solid rgba(0,0,0,0.36)', borderRadius: '4px',
        background: '#0e0d0d',
        margin: '4px', padding: '0px 4px'
      }}
      draggable={this.state.draggable}
      onDragStart={e => this.handleDragStart(e)}
      onDrop={e => this.handleDrop(e)}
      onDragOver={e => this.handleDragOver(e)}
      onDragEnter={e => this.handleDragEnter(e)}
      onDragLeave={e => this.handleDragLeave(e)}

    >
      <

      >

        <div
          className={'layerItemTitle'}
          style={{
            cursor: 'pointer',
            textOverflow: 'ellipsis',
            width: '123px',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
          }}
          onClick={() => {
            layer.openYn = !layer.openYn;
            rootComponent.updateRootState({});
          }}
        >

          <FontAwesomeIcon
            icon={layer.openYn ? faFolderOpen : faFolder}
            style={{fontSize: '11px', marginRight: '5px',}}
          />
          {layer.title}
        </div>
        <div>
          <button className={'layerVisible'} onClick={() => this._toggleVisible(layer)}>
            <FontAwesomeIcon icon={layer.visible ? faEye : faEyeSlash}/>
          </button>
          <button className={'layerDel'}
                  style={{opacity: layers.length > 1 ? 1 : 0.25}}
                  onClick={e => {
                    e.stopPropagation();
                    if (layers.length > 1) {
                      let idx = layers.indexOf(layer);
                      layers.splice(idx, 1);
                      let targetLayer;
                      if (layers[idx]) targetLayer = layers[idx];
                      else targetLayer = layers[0];
                      rootComponent.updateRootState({
                        activeLayer: targetLayer,
                        activeSubData: targetLayer['items'][0]
                      });
                    }
                  }}
          ><FontAwesomeIcon icon={faMinusCircle}/>
          </button>
          <button className={'layerAdd'}
                  onClick={e => {
                    e.stopPropagation();
                    layer.items.splice(0, 0, new DataItem());
                    rootComponent.updateRootState({activeSubData: layer.items[0]});
                  }}
          ><FontAwesomeIcon icon={faPlusCircle}/>
          </button>
        </div>
        <div style={style.addGradientLayerItem}
             onClick={() => {
               this.setState({openPanel: true, draggable: false})
             }}
        >add with template
        </div>
        {this.state.openPanel ? <RedAddGradientLayerSet
          rootComponent={this}
          HD_cancel={e => this.setState({openPanel: false, draggable: true})}
          HD_apply={(v, type) => {
            let t0 = new DataItem()
            t0.colorList = v
            t0.type = type
            layer.items.splice(0, 0, t0)
            this.setState({openPanel: false, draggable: true})
            rootComponent.updateRootState({
              layers: rootComponentState.layers,
              activeSubData: t0
            })
          }}
        /> : ''}
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
          onClick={() => rootComponent.updateRootState({activeLayer: layer, activeSubData: layer.items[0]})}

        >
          <div className={'layerItem'}
               style={{background: `${CALC_GRADIENT.calcGradientItems(layer['items'], false, layer)},${this.props.layerBgColor}`}}/>
        </div>
      </>
      <div>{layer.openYn ? layer.items.map(item => <RedLayerSubItem
        layer={layer} item={item}
        rootComponent={rootComponent}
        size={this.state.SIZE}/>) : ''}</div>
      <div
        className={'droparea_title2'}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0, left: 0, right: 0, overflow: 'hidden',
          height: this.state.dragOverYn ? '100%' : 0,
          opacity: this.state.dragOverYn ? 0.75 : 0,
          transition: 'opacity 0.2s',
          background: 'rgb(255, 122, 222)',
          fontSize: '16px',
          borderRadius: '4px'
        }}>drop here
      </div>
    </div>;
  }
}

RedLayerItem.clearDragInfo = () => {
  startDragLayer = null
}
export default RedLayerItem;
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
  },
  addGradientLayerItem: {
    marginTop: '2px',
    background: '#5e7ade',
    padding: '3px 5px',
    fontSize: '11px',
    borderRadius: '4px',
    marginBottom: '2px',
    cursor: 'pointer'
  },
};
