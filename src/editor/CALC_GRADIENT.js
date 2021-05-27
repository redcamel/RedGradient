/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import GRADIENT_TYPE from "./GRADIENT_TYPE";
import REPEAT_TYPE from "./REPEAT_TYPE";
import ENDING_SHAPE_TYPE from "./ENDING_SHAPE_TYPE";
//TODO - 여기정리
const CALC_GRADIENT = {
  calcBlendMode: ((layers) => layers.map(layer => layer['items'].map(item => item['visible'] ? item['blendMode'] : '').join(',')).join(',')),
  calcGradients: (layers, checkVisible, bgColor = 'transparent') => layers.map(layer => CALC_GRADIENT.calcGradientItems(layer['items'], checkVisible, layer)).join(',') + `,${bgColor}`,
  calcGradientItems: (items, checkVisible, layer) => items.length ? items.map(item => CALC_GRADIENT.calcGradientItem(item, checkVisible, layer)).join(',') : '',
  calcGradientItem: (data, checkVisible, layer) => {
    if (!data) return '';
    if (!data['colorList'].length) return '';
    if (checkVisible && !data['visible']) return 'linear-gradient(45deg, transparent,transparent )';
    if (layer && !layer['visible']) return 'linear-gradient(45deg, transparent,transparent )';
    const offset = data['offset'] || 0
    const offsetUnit = data['type'] === GRADIENT_TYPE.CONIC || data['type'] === GRADIENT_TYPE.REPEAT_CONIC ? 'deg' : (data['offsetUnit'] === 'deg' ? '%' : (data['offsetUnit'] || '%'))
    let offsetTxt
    const gradients = []
    {
      let index = data['colorList'].length
      while (index--) {
        //TODO - divideTxt 이거 좀더 보강해야함
        let v = data['colorList'][index]
        offsetTxt = `${offset < 0 ? '-' : '+'} ${Math.abs(offset) + offsetUnit}`
        // 코닉일떄는 단위를 맞춘다.
        if (data['type'] === GRADIENT_TYPE.CONIC || data['type'] === GRADIENT_TYPE.REPEAT_CONIC) {
          if (v['rangeUnit'] === '%') offsetTxt = `${offset < 0 ? '-' : '+'} ${Math.abs(offset / 360 * 100)}%`
        }
        let colorRangeTxt = '';
        if (v['useRange']) {
          colorRangeTxt = `calc(${v['range']}${v['rangeUnit']} ${offsetTxt})`;
          let colorRangeEndTxt = `calc(${v['rangeEnd']}${v['rangeUnit']} ${offsetTxt})`;
          let divideTxt = '';
          if (data['type'] === GRADIENT_TYPE.CONIC || data['type'] === GRADIENT_TYPE.REPEAT_CONIC) divideTxt = v['useDivide'] ? `,${v['colorEnd']} calc(${v['range']}${v['rangeUnit']} ${offsetTxt})` : '';
          else divideTxt = v['useDivide'] ? `,${v['colorEnd']} calc(${v['range']}${v['rangeUnit']} + 1px ${offsetTxt})` : '';
          let divideEndTxt = '';
          if (data['type'] === GRADIENT_TYPE.CONIC || data['type'] === GRADIENT_TYPE.REPEAT_CONIC) divideEndTxt = v['useDivideEnd'] && data['colorList'][index + 1] ? `,${data['colorList'][index + 1]['color']} calc(${v['rangeEnd']}${v['rangeUnit']} ${offsetTxt})` : '';
          else divideEndTxt = v['useDivideEnd'] && data['colorList'][index + 1] ? `,${data['colorList'][index + 1]['color']} calc(${v['rangeEnd']}${v['rangeUnit']} + 1px ${offsetTxt})` : '';
          gradients[index] = `${v['color']} ${colorRangeTxt} ${divideTxt}, ${v['colorEnd']} ${colorRangeEndTxt} ${divideEndTxt}`;
        } else {
          colorRangeTxt = `calc(${v['range']}${v['rangeUnit']} ${offsetTxt})`;
          let divideTxt = '';
          if (data['type'] === GRADIENT_TYPE.CONIC || data['type'] === GRADIENT_TYPE.REPEAT_CONIC) divideTxt = v['useDivide'] && data['colorList'][index + 1] ? `,${data['colorList'][index + 1]['color']} calc(${v['range']}${v['rangeUnit']} ${offsetTxt})` : '';
          else divideTxt = v['useDivide'] && data['colorList'][index + 1] ? `,${data['colorList'][index + 1]['color']} calc(${v['range']}${v['rangeUnit']} + 1px ${offsetTxt})` : '';
          gradients[index] = `${v['color']} ${colorRangeTxt} ${divideTxt}`;
        }
      }
    }
    let TEMP;
    TEMP = data['position'];
    const positionTxt = TEMP ? ` ${TEMP['x']}${TEMP['xUnit']} ${TEMP['y']}${TEMP['yUnit']}` : '';
    TEMP = data['size'];
    const sizeTxt = TEMP ? ` ${TEMP['w']}${TEMP['wUnit']} ${TEMP['h']}${TEMP['hUnit']}` : '100% 100%';
    const repeatTxt = data['typeRepeat'] === REPEAT_TYPE.REPEAT ? '' : data['typeRepeat'];
    // const blendTxt = data['blendMode'] === BLEND_MODE_TYPE.NORMAL ? '' : data['blendMode'];
    const etcs = ` ${sizeTxt} ${repeatTxt}`;
    let result;
    let atTxt = '';
    switch (data['type']) {
      case  GRADIENT_TYPE.LINEAR:
      case  GRADIENT_TYPE.REPEAT_LINEAR:
        result = `${data['type']}(${data['deg']}deg, ${gradients}) ${positionTxt} / ${etcs}`;
        break;
      case GRADIENT_TYPE.RADIAL :
      case GRADIENT_TYPE.REPEAT_RADIAL :
        const endingShape = data['typeEndingShape'] === ENDING_SHAPE_TYPE.NONE ? '' : (data['typeEndingShape']);
        TEMP = data['at'];
        atTxt = TEMP ? ` ${endingShape} at ${TEMP['x']}${TEMP['xUnit']} ${TEMP['y']}${TEMP['yUnit']}` : '';
        result = `${data['type']}(${[atTxt, gradients].join(',')}) ${positionTxt} / ${etcs}`;
        break;
      case GRADIENT_TYPE.CONIC :
      case GRADIENT_TYPE.REPEAT_CONIC :
        TEMP = data['at'];
        atTxt = TEMP ? `${data['deg']}deg at ${TEMP['x']}${TEMP['xUnit']} ${TEMP['y']}${TEMP['yUnit']}` : '';
        result = `${data['type']}(from ${[atTxt, gradients].join(',')}) ${positionTxt} / ${etcs}`;
        break;
    }
    return result;
  }
};
export default CALC_GRADIENT;
