import React from "react";
import GRADIENT_TYPE from "./GRADIENT_TYPE";


const SIZE_MARGIN = 20;
const paddingH = 6;
const SIZE = 120;

class Red_Layer extends React.Component {


  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const layers = rootComponentState.layers;
    const canvasInfo = rootComponentState.canvasInfo;
    return <div style={style.container}>
      <div className={'todo'}>Todo - 레이어 추가 삭제</div>
      <div className={'todo'}>Todo - 레이어 그룹 열고닫기</div>
      <div className={'todo'}>Todo - 레이어 배경 색상 설정</div>
      <div className={'todo'}>Todo - 각도(L), range(R)<br/>개별 레이어위에서 Edit</div>
      {
        layers.map((layer, index) => {
          return <div style={{
            opacity: layer.visible ? 1 : 0.5,
            transition: 'opacity 0.2s'
          }}>
            <div className={'layerItemTitle'}>{layer.title}</div>
            <div
              className={'transparent_checker'}
              style={{
                width: `${SIZE}px`,
                height: `${canvasInfo.height / canvasInfo.width * SIZE}px`,
                cursor: 'pointer',
                borderRadius: '4px',
                overflow: 'hidden'
              }}
              onClick={e => rootComponent.setState({activeData: layer, activeSubData: layer.items[0]})}
            >
              <div className={'layerItem'} style={{background: Red_Layer.calcGradientItems(layer['items'])}} />
              <button
                className={'layerVisible'}
                onClick={e => {
                  layer.visible = !layer.visible;
                  rootComponent.setState({});
                }}
              >{layer.visible ? 'on' : 'off'}</button>
            </div>
            <div>
              {
                layer.items.map(item => {
                  const activeSubDataYn = rootComponentState.activeSubData === item;
                  return <div style={{
                    opacity: item.visible ? 1 : 0.5,
                    transition: 'opacity 0.2s'
                  }}>
                    <div className={'layerItemSubTitle'}>{item.title}</div>
                    <div
                      className={'transparent_checker'}
                      style={{
                        width: `${SIZE - SIZE_MARGIN}px`,
                        height: `${canvasInfo.height / canvasInfo.width * (SIZE - SIZE_MARGIN)}px`,
                        marginLeft: `${SIZE_MARGIN}px`,
                        cursor: 'pointer',
                        borderRadius: '4px',
                        overflow: 'hidden'
                      }}
                      onClick={e => rootComponent.setState({activeData: layer, activeSubData: item})}
                    >
                      <div className={'layerItem'} style={{background: Red_Layer.calcGradientItem(item)}} />
                      <button
                        className={'layerVisible'}
                        onClick={e => {
                          item.visible = !item.visible;
                          rootComponent.setState({});
                        }}
                      >{item.visible ? 'on' : 'off'}</button>
                      <button className={'layerType'}>{item.type.charAt(0).toUpperCase()}</button>
                      <div style={activeSubDataYn ? style.activeLine : style.deActiveLine} />
                    </div>

                  </div>;
                })
              }

            </div>
          </div>;
        })
      }
    </div>;
  }
}

Red_Layer.calcGradients = (layers, checkVisible) => layers.map(layer => Red_Layer.calcGradientItems(layer['items'], checkVisible, layer)).join(',');
Red_Layer.calcGradientItems = (items, checkVisible, layer) => items.map(item => Red_Layer.calcGradientItem(item, checkVisible, layer)).join(',');
Red_Layer.calcGradientItem = (data, checkVisible, layer) => {
  if (!data) return '';
  if (checkVisible && !data['visible']) return 'linear-gradient(45deg, transparent,transparent )';
  if (layer && !layer['visible']) return 'linear-gradient(45deg, transparent,transparent )';

  //TODO - 여기정리
  if (data['type'] === GRADIENT_TYPE.LINEAR) {
    const gradients = data['colorList'].map(v => {
      let colorRangeTxt = v['range'] === undefined ? '' : `${v['range']}${v['rangeUnit']}`;
      return `${v['color']} ${colorRangeTxt}`;
    });
    let positionTxt = data['position'] ? ` ${data['position']['x']}${data['position']['xUnit']} ${data['position']['y']}${data['position']['yUnit']}` : '';
    let sizeTxt = data['size'] ? ` ${data['size']['w']}${data['size']['wUnit']} ${data['size']['h']}${data['size']['hUnit']}` : '';

    return `${data['type']}(${data['deg']}deg, ${gradients}) ${positionTxt} / ${sizeTxt}`;
  } else {
    const gradients = data['colorList'].map(v => {
      let colorRangeTxt = v['range'] === undefined ? '' : `${v['range']}${v['rangeUnit']}`;
      return `${v['color']} ${colorRangeTxt}`;
    });
    let positionTxt = data['position'] ? ` ${data['position']['x']}${data['position']['xUnit']} ${data['position']['y']}${data['position']['yUnit']}` : '';
    let sizeTxt = data['size'] ? ` ${data['size']['w']}${data['size']['wUnit']} ${data['size']['h']}${data['size']['hUnit']}` : '';

    return `${data['type']}(${gradients}) ${positionTxt} / ${sizeTxt}`;
  }

};
export default Red_Layer;
const style = {
  container: {
    borderRight: '1px solid #000',
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: `10px ${paddingH}px`
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
