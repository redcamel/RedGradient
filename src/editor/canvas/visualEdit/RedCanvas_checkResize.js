/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
const calcE = (info) => {
  const {
    positionInfo,
    sizeInfo,
    originX,
    tW,
    cW,
    gapX
  } = info;
  if (positionInfo['xUnit'] === '%') {
    let targetPixelSize = tW + gapX;
    let targetPercentSize = targetPixelSize / cW * 100;
    if (sizeInfo['wUnit'] === '%') sizeInfo['w'] = Math.max(targetPercentSize, 0.1);
    else sizeInfo['w'] = targetPixelSize;
    let newTargetPercentPosition = (originX) / (cW - targetPixelSize) * 100;
    positionInfo['x'] = Number.isNaN(newTargetPercentPosition) ? 0 : newTargetPercentPosition;
  } else {
    let targetPixelSize = tW + gapX;
    let targetPercentSize = targetPixelSize / cW * 100;
    if (sizeInfo['wUnit'] === '%') sizeInfo['w'] = Math.max(targetPercentSize, 0.1);
    else sizeInfo['w'] = targetPixelSize;
  }
};
const calcW = (info) => {
  const {
    positionInfo,
    sizeInfo,
    originX,
    tW,
    cW,
    gapX
  } = info;
  if (positionInfo['xUnit'] === '%') {
    let targetPixelSize = tW - gapX;
    let targetPercentSize = targetPixelSize / cW * 100;
    if (sizeInfo['wUnit'] === '%') sizeInfo['w'] = Math.max(targetPercentSize, 0.1);
    else sizeInfo['w'] = targetPixelSize;
    let newTargetPercentPosition = (originX + gapX) / (cW - targetPixelSize) * 100;
    positionInfo['x'] = Number.isNaN(newTargetPercentPosition) ? 0 : newTargetPercentPosition;
  } else {
    let targetPixelSize = tW - gapX;
    let targetPercentSize = targetPixelSize / cW * 100;
    if (sizeInfo['wUnit'] === '%') {
      sizeInfo['w'] = Math.max(targetPercentSize, 0.1);
      positionInfo['x'] = originX + gapX;
    } else {
      sizeInfo['w'] = targetPixelSize;
      positionInfo['x'] = originX + gapX;
    }
  }
};
const calcS = (info) => {
  const {
    positionInfo,
    sizeInfo,
    originY,
    tH,
    cH,
    gapY
  } = info;
  if (positionInfo['yUnit'] === '%') {
    let targetPixelSize = tH + gapY;
    let targetPercentSize = targetPixelSize / cH * 100;
    if (sizeInfo['hUnit'] === '%') sizeInfo['h'] = Math.max(targetPercentSize, 0.1);
    else sizeInfo['h'] = targetPixelSize;
    let newTargetPercentPosition = (originY) / (cH - targetPixelSize) * 100;
    positionInfo['y'] = Number.isNaN(newTargetPercentPosition) ? 0 : newTargetPercentPosition;
  } else {
    let targetPixelSize = tH + gapY;
    let targetPercentSize = targetPixelSize / cH * 100;
    if (sizeInfo['hUnit'] === '%') sizeInfo['h'] = Math.max(targetPercentSize, 0.1);
    else sizeInfo['h'] = targetPixelSize;
  }
};
const calcN = (info) => {
  const {
    positionInfo,
    sizeInfo,
    originY,
    tH,
    cH,
    gapY
  } = info;
  if (positionInfo['yUnit'] === '%') {
    let targetPixelSize = tH - gapY;
    let targetPercentSize = targetPixelSize / cH * 100;
    if (sizeInfo['hUnit'] === '%') sizeInfo['h'] = Math.max(targetPercentSize, 0.1);
    else sizeInfo['h'] = targetPixelSize;
    let newTargetPercentPosition = (originY + gapY) / (cH - targetPixelSize) * 100;
    positionInfo['y'] = Number.isNaN(newTargetPercentPosition) ? 0 : newTargetPercentPosition;
  } else {
    let targetPixelSize = tH - gapY;
    let targetPercentSize = targetPixelSize / cH * 100;
    if (sizeInfo['hUnit'] === '%') {
      sizeInfo['h'] = Math.max(targetPercentSize, 0.1);
      positionInfo['y'] = originY + gapY;
    } else {
      sizeInfo['h'] = targetPixelSize;
      positionInfo['y'] = originY + gapY;
    }
  }
};

function RedCanvas_checkResize(e) {
  const rootComponent = this.props.rootComponent;
  const rootComponentState = rootComponent.state;
  const canvasInfo = rootComponentState.canvasInfo;
  const activeSubLayerData = rootComponentState.activeSubLayerData;
  if (this.state.resizeMode) {
    e = e.nativeEvent;
    const mode = this.state.resizeMode['mode'];
    let gapX = (e.pageX - +this.state.resizeMode['startX']) / this.state.canvasViewScale;
    let gapY = (e.pageY - +this.state.resizeMode['startY']) / this.state.canvasViewScale;
    switch (mode) {
      case 'sw':
      case 'ne':
        gapY = (e.shiftKey || activeSubLayerData['fixRatioYn']) ? -gapX : gapY
        break
      case 'nw':
      case 'se':
        gapY = (e.shiftKey || activeSubLayerData['fixRatioYn']) ? gapX : gapY
        break
    }
    this.state.resizeMode['startX'] = e.pageX;
    this.state.resizeMode['startY'] = e.pageY;
    const sizeInfo = activeSubLayerData['size'];
    const positionInfo = activeSubLayerData['position'];
    const tW = sizeInfo['wUnit'] === '%' ? canvasInfo.width * sizeInfo['w'] / 100 : sizeInfo['w'];
    const tH = sizeInfo['hUnit'] === '%' ? canvasInfo.height * sizeInfo['h'] / 100 : sizeInfo['h'];
    //
    const cW = (canvasInfo.width);
    const cH = (canvasInfo.height);
    //
    // 오리지날 포지션 찾기
    const activeSubLayerDataSize = activeSubLayerData['size'];
    const activeSubLayerDataPosition = activeSubLayerData['position'];
    const layoutSize = {
      w: activeSubLayerDataSize['wUnit'] === '%' ? cW * activeSubLayerDataSize['w'] / 100 : +activeSubLayerDataSize['w'],
      h: activeSubLayerDataSize['hUnit'] === '%' ? cH * activeSubLayerDataSize['h'] / 100 : +activeSubLayerDataSize['h'],
    };
    const originX = activeSubLayerDataPosition['xUnit'] === '%' ? (cW - layoutSize.w) * (activeSubLayerDataPosition['x'] / 100) : +activeSubLayerDataPosition['x'];
    const originY = activeSubLayerDataPosition['yUnit'] === '%' ? (cH - layoutSize.h) * (activeSubLayerDataPosition['y'] / 100) : +activeSubLayerDataPosition['y'];
    const info = {
      positionInfo,
      sizeInfo,
      activeSubLayerDataSize,
      activeSubLayerDataPosition,
      originX,
      originY,
      tW,
      tH,
      cW,
      cH,
      gapX,
      gapY
    };
    switch (mode) {
      case "e" :
        calcE(info);
        break;
      case "w" :
        calcW(info);
        break;
      case "s" :
        calcS(info);
        break;
      case "n" :
        calcN(info);
        break;
      case "nw":
        calcN(info);
        calcW(info);
        break;
      case "ne":
        calcN(info);
        calcE(info);
        break;
      case "sw":
        calcS(info);
        calcW(info);
        break;
      case "se":
        calcS(info);
        calcE(info);
        break;
    }
    document.body.style.cursor = `${mode}-resize`;
    rootComponent.updateRootState({});
    // console.log(e);
  }
}

export default RedCanvas_checkResize;
