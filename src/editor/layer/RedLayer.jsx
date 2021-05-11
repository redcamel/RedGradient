/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */

import React from "react";
import GRADIENT_TYPE from "../GRADIENT_TYPE";
import DataItem from "../DataItem";
import RedNumber from "../../core/RedNumber.jsx";
import RedSelect from "../../core/RedSelect.jsx";
import DataLayer from "../DataLayer";
import RedLayerSubItem from "./RedLayerSubItem.jsx";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faEyeSlash, faFolder, faFolderOpen, faMinusCircle, faPlusCircle} from '@fortawesome/free-solid-svg-icons'
import REPEAT_TYPE from "../REPEAT_TYPE.js";
import RedLayerTop from "./RedLayerTop.jsx";
import ENDING_SHAPE_TYPE from "../ENDING_SHAPE_TYPE";

const SIZE = 100;

//TODO - 여기 정리해야함
class RedLayer extends React.Component {
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
    const layers = rootComponentState.layers;
    return <div style={{flexDirection: 'column', display: 'flex'}}>
      <RedLayerTop rootComponent={rootComponent} layersComponent={this}/>
      <div style={style.container}>
        {
          layers.map((layer) => {
            const layerSize = layer['size'];
            return <div style={{
              opacity: layer.visible ? 1 : 0.5, transition: 'opacity 0.2s',
              border: '1px solid rgba(0,0,0,0.36)', borderRadius: '4px',
              background: '#0e0d0d',
              margin: '4px', padding: '0px 4px'
            }}>
              <div
                className={'layerItemTitle'}
                style={{textOverflow: 'ellipsis', width: '123px', overflow: 'hidden', whiteSpace: 'nowrap'}}>
                <FontAwesomeIcon
                  icon={layer.openYn ? faFolderOpen : faFolder}
                  style={{fontSize: '11px', marginRight: '5px', cursor: 'pointer'}}
                  onClick={() => {
                    layer.openYn = !layer.openYn
                    rootComponent.setState({})
                  }}/>
                {layer.title}
              </div>
              <div>
                <button className={'layerVisible'} onClick={() => this._toggleVisible(layer)}>
                  <FontAwesomeIcon icon={layer.visible ? faEye : faEyeSlash}/>
                </button>
                <button className={'layerDel'}
                        style={{opacity : layers.length>1 ? 1 : 0.25 }}
                        onClick={e => {
                          e.stopPropagation();
                          if(layers.length>1 ){
                            let idx = layers.indexOf(layer)
                            layers.splice(idx, 1);
                            let targetLayer
                            if(layers[idx]) targetLayer = layers[idx]
                            else targetLayer = layers[0]
                            rootComponent.setState({activeLayer: targetLayer, activeSubData: targetLayer['items'][0]});
                          }
                        }}
                ><FontAwesomeIcon icon={faMinusCircle}/>
                </button>
                <button className={'layerAdd'}
                        onClick={e => {
                          e.stopPropagation();
                          layer.items.splice(0, 0, new DataItem());
                          rootComponent.setState({activeSubData: layer.items[0]});
                        }}
                ><FontAwesomeIcon icon={faPlusCircle}/>
                </button>
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
                onClick={() => rootComponent.setState({activeLayer: layer, activeSubData: layer.items[0]})}
              >
                <div className={'layerItem'}
                     style={{background: `${RedLayer.calcGradientItems(layer['items'], false, layer)},${this.state.layerBgColor}`}}/>
              </div>
              <div>{layer.openYn ? layer.items.map(item => <RedLayerSubItem layer={layer} item={item}
                                                                            rootComponent={rootComponent}/>) : ''}</div>
            </div>;
          })
        }
      </div>
    </div>
  }
}

RedLayer.calcGradients = (layers, checkVisible, bgColor = 'transparent') => layers.map(layer => RedLayer.calcGradientItems(layer['items'], checkVisible, layer)).join(',') + `,${bgColor}`;
RedLayer.calcGradientItems = (items, checkVisible, layer) => items.length ? items.map(item => RedLayer.calcGradientItem(item, checkVisible, layer)).join(',') : '';
RedLayer.calcGradientItem = (data, checkVisible, layer) => {
  if (!data) return '';
  if (!data['colorList'].length) return '';
  if (checkVisible && !data['visible']) return 'linear-gradient(45deg, transparent,transparent )';
  if (layer && !layer['visible']) return 'linear-gradient(45deg, transparent,transparent )';
  //TODO - 여기정리
  const gradients = data['colorList'].map(v => {
    let colorRangeTxt = v['range'] === undefined ? '' : `${v['range']}${v['rangeUnit']}`;
    return `${v['color']} ${colorRangeTxt}`;
  });
  let TEMP;
  TEMP = data['position']
  const positionTxt = TEMP ? ` ${TEMP['x']}${TEMP['xUnit']} ${TEMP['y']}${TEMP['yUnit']}` : '';
  TEMP = data['size']
  const sizeTxt = TEMP ? ` ${TEMP['w']}${TEMP['wUnit']} ${TEMP['h']}${TEMP['hUnit']}` : '100% 100%';
  const repeatTxt = data['typeRepeat'] === REPEAT_TYPE.REPEAT ? '' : data['typeRepeat']
  let result
  if (data['type'] === GRADIENT_TYPE.LINEAR) result = `${data['type']}(${data['deg']}deg, ${gradients}) ${positionTxt} / ${sizeTxt} ${repeatTxt}`;
  else {
    const endingShape = data['typeEndingShape'] === ENDING_SHAPE_TYPE.NONE ? '' : (data['typeEndingShape'])
    TEMP = data['at']
    const atTxt = TEMP ? ` ${endingShape} at ${TEMP['x']}${TEMP['xUnit']} ${TEMP['y']}${TEMP['yUnit']}` : '';
    result = `${data['type']}(${[atTxt,gradients].join(',')}) ${positionTxt} / ${sizeTxt} ${repeatTxt}`;
  }
  return result
};
export default RedLayer;
const style = {
  container: {
    borderRight: '1px solid #000',
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
