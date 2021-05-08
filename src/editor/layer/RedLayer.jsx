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
    return <div style={style.container}>
      <div style={style.addLayer}>
        <div style={style.addLayerItem}
             onClick={() => {
               let targetLayer;
               layers.splice(0, 0, targetLayer = new DataLayer());
               rootComponent.setState({activeLayer: targetLayer, activeSubData: targetLayer['items'][0]});
             }}
        >Add Layer
        </div>
        <div style={{...style.bgItem, background: '#000', color: '#fff'}}
             onClick={() => this.setState({layerBgColor: 'black'})}>black
        </div>
        <div style={{...style.bgItem, background: '#fff', color: '#000'}}
             onClick={() => this.setState({layerBgColor: 'white'})}>white
        </div>
        <div style={{...style.bgItem}} className={'transparent_checker'}
             onClick={() => this.setState({layerBgColor: 'transparent'})}>transparent
        </div>
      </div>
      {
        layers.map((layer) => {
          const layerSize = layer['size'];
          return <div style={{
            opacity: layer.visible ? 1 : 0.5, transition: 'opacity 0.2s',
            border: '1px solid rgba(0,0,0,0.36)',
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '4px',
            margin: '4px',
            padding: '4px'
          }}>
            <div
              className={'layerItemTitle'}
              style={{
                textOverflow: 'ellipsis',
                width: '120px',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
              }}
            >
              <FontAwesomeIcon
                icon={layer.openYn ? faFolderOpen : faFolder}
                style={{
                  fontSize: '11px',
                  marginRight: '5px', cursor: 'pointer'
                }}
                onClick={() => {
                  layer.openYn = !layer.openYn
                  rootComponent.setState({})
                }}/>
              {layer.title}
            </div>
            <div>
              <button className={'layerVisible'}
                      onClick={() => this._toggleVisible(layer)}>
                <FontAwesomeIcon icon={layer.visible ? faEye : faEyeSlash}/>
              </button>
              <button className={'layerDel'}
                      onClick={e => {
                        e.stopPropagation();
                        layers.splice(layers.indexOf(layer), 1);
                        let targetLayer = layer;
                        if (!layers.length) layers.push(new DataLayer());
                        rootComponent.setState({activeLayer: targetLayer, activeSubData: targetLayer['items'][0]});
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
                height: `${layerSize.h / layerSize.w * SIZE}px`,
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
            <div style={style.itemContainer}>
              Layer Size
              <div>
                <RedNumber
                  width={'70px'}
                  value={layerSize['w'] || 0}
                  HD_onInput={e => {
                    layerSize['w'] = e.target.value;
                    rootComponent.setState({});
                  }}/>
                <RedSelect value={layerSize['wUnit']} options={['px', '%']} HD_change={e => {
                  layerSize['wUnit'] = e.target.value;
                  rootComponent.setState({});
                }}/>
              </div>
              <div>
                <RedNumber
                  width={'70px'}
                  value={layerSize['h'] || 0}
                  HD_onInput={e => {
                    layerSize['h'] = e.target.value;
                    rootComponent.setState({});
                  }}/>
                <RedSelect value={layerSize['hUnit']} options={['px', '%']} HD_change={e => {
                  layerSize['hUnit'] = e.target.value;
                  rootComponent.setState({});
                }}/>
              </div>
            </div>
            <div>{layer.openYn ? layer.items.map(item => <RedLayerSubItem layer={layer} item={item} rootComponent={rootComponent}/>) : ''}</div>
          </div>;
        })
      }
    </div>;
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
    let colorRangeTxt = v['range'] === undefined ? '' : `${v['range']}%`;
    return `${v['color']} ${colorRangeTxt}`;
  });
  const positionTxt = data['position'] ? ` ${data['position']['x']}${data['position']['xUnit']} ${data['position']['y']}${data['position']['yUnit']}` : '';
  const sizeTxt = layer['size'] ? ` ${layer['size']['w']}${layer['size']['wUnit']} ${layer['size']['h']}${layer['size']['hUnit']}` : '';
  const repeatTxt = data['repeatType'] === REPEAT_TYPE.REPEAT ? '' : data['repeatType']
  let result
  if (data['type'] === GRADIENT_TYPE.LINEAR) result = `${data['type']}(${data['deg']}deg, ${gradients}) ${positionTxt} / ${sizeTxt} ${repeatTxt}`;
  else result = `${data['type']}(${gradients}) ${positionTxt} / ${sizeTxt} ${repeatTxt}`;
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
  },
  addLayer: {
    position: 'sticky',
    padding: '5px 4px 3px 4px',
    top: 0,
    zIndex: 1,
    background: '#000'
  },
  addLayerItem: {
    background: '#5e7ade',
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
  }
};
