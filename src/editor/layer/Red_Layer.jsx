import React from "react";
import GRADIENT_TYPE from "../GRADIENT_TYPE";
import DataItem from "../DataItem";
import UI_Number from "../../core/UI_Number";
import UI_Select from "../../core/UI_Select";
import DataLayer from "../DataLayer";
import Red_Layer_subItem from "./Red_Layer_subItem";


const SIZE_MARGIN = 20;
const SIZE = 120;

class Red_Layer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layerBgColor: 'transparent'
    };
  }

  _toggleVisible(data, bool) {
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
             onClick={e => {
               let targetLayer;
               layers.splice(0, 0, targetLayer = new DataLayer());
               rootComponent.setState({activeLayer: targetLayer, activeSubData: targetLayer['items'][0]});
             }}
        >Add Layer
        </div>
        <div style={{...style.bgItem, background: '#000', color: '#fff'}}
             onClick={e => this.setState({layerBgColor: 'black'})}>black
        </div>
        <div style={{...style.bgItem, background: '#fff', color: '#000'}}
             onClick={e => this.setState({layerBgColor: 'white'})}>white
        </div>
        <div style={{...style.bgItem}} className={'transparent_checker'}
             onClick={e => this.setState({layerBgColor: 'transparent'})}>transparent
        </div>
      </div>
      {
        layers.map((layer, index) => {
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
                whiteSpace : 'nowrap'
              }}
            >
              <button
                style={{
                  fontSize : '9px',
                  marginRight: '5px',cursor:'pointer',
                  transform : `rotate(${layer.openYn ? 0 : 180}deg)`
                }}
                onClick={e=>{
                  layer.openYn = !layer.openYn
                  rootComponent.setState({})
                }}
              >▲</button>
              {layer.title}
            </div>
            <div>
              <button className={'layerVisible'}
                      onClick={e => this._toggleVisible(layer)}>{layer.visible ? 'on' : 'off'}</button>
              <button className={'layerDel'}
                      onClick={e => {
                        e.stopPropagation();
                        layers.splice(layers.indexOf(layer), 1);
                        let targetLayer = layer;
                        if (!layers.length) layers.push(new DataLayer());
                        rootComponent.setState({activeLayer: targetLayer, activeSubData: targetLayer['items'][0]});
                      }}
              >Del
              </button>
              <button className={'layerAdd'}
                      onClick={e => {
                        e.stopPropagation();
                        layer.items.splice(0, 0, new DataItem());
                        rootComponent.setState({activeSubData: layer.items[0]});
                      }}
              >Add
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
              onClick={e => rootComponent.setState({activeLayer: layer, activeSubData: layer.items[0]})}
            >
              <div className={'layerItem'}
                   style={{background: `${Red_Layer.calcGradientItems(layer['items'], false, layer)},${this.state.layerBgColor}`}} />
            </div>
            <div style={style.itemContainer}>
              Layer Size
              <div>
                <UI_Number
                  width={'70px'}
                  value={layerSize['w'] || 0}
                  HD_onInput={e => {
                    layerSize['w'] = e.target.value;
                    rootComponent.setState({});
                  }} />
                <UI_Select value={layerSize['wUnit']} options={['px', '%']} HD_change={e => {
                  layerSize['wUnit'] = e.target.value;
                  rootComponent.setState({});
                }} />
              </div>
              <div>
                <UI_Number
                  width={'70px'}
                  value={layerSize['h'] || 0}
                  HD_onInput={e => {
                    layerSize['h'] = e.target.value;
                    rootComponent.setState({});
                  }} />
                <UI_Select value={layerSize['hUnit']} options={['px', '%']} HD_change={e => {
                  layerSize['hUnit'] = e.target.value;
                  rootComponent.setState({});
                }} />
              </div>
            </div>
            <div>
              {
                layer.openYn ? layer.items.map(item => {
                  return <Red_Layer_subItem layer={layer} item={item} rootComponent={rootComponent} />;
                }) : ''
              }
            </div>
          </div>;
        })
      }
    </div>;
  }
}

Red_Layer
  .calcGradients = (layers, checkVisible, bgColor = 'transparent') => layers.map(layer => Red_Layer.calcGradientItems(layer['items'], checkVisible, layer)).join(',') + `,${bgColor}`;
Red_Layer
  .calcGradientItems = (items, checkVisible, layer) => items.length ? items.map(item => Red_Layer.calcGradientItem(item, checkVisible, layer)).join(',') : '';
Red_Layer
  .calcGradientItem = (data, checkVisible, layer) => {
  if (!data) return '';
  if (!data['colorList'].length) return '';
  if (checkVisible && !data['visible']) return 'linear-gradient(45deg, transparent,transparent )';
  if (layer && !layer['visible']) return 'linear-gradient(45deg, transparent,transparent )';

  //TODO - 여기정리
  // console.log('layer', data, checkVisible, layer);
  if (data['type'] === GRADIENT_TYPE.LINEAR) {
    const gradients = data['colorList'].map(v => {
      let colorRangeTxt = v['range'] === undefined ? '' : `${v['range']}%`;
      return `${v['color']} ${colorRangeTxt}`;
    });
    let positionTxt = data['position'] ? ` ${data['position']['x']}${data['position']['xUnit']} ${data['position']['y']}${data['position']['yUnit']}` : '';
    let sizeTxt = layer['size'] ? ` ${layer['size']['w']}${layer['size']['wUnit']} ${layer['size']['h']}${layer['size']['hUnit']}` : '';

    return `${data['type']}(${data['deg']}deg, ${gradients}) ${positionTxt} / ${sizeTxt}`;
  } else {
    const gradients = data['colorList'].map(v => {
      let colorRangeTxt = v['range'] === undefined ? '' : `${v['range']}%`;
      return `${v['color']} ${colorRangeTxt}`;
    });
    let positionTxt = data['position'] ? ` ${data['position']['x']}${data['position']['xUnit']} ${data['position']['y']}${data['position']['yUnit']}` : '';
    let sizeTxt = layer['size'] ? ` ${layer['size']['w']}${layer['size']['wUnit']} ${layer['size']['h']}${layer['size']['hUnit']}` : '';

    return `${data['type']}(${gradients}) ${positionTxt} / ${sizeTxt}`;
  }

};
export default Red_Layer;
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
