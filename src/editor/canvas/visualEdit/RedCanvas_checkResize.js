/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
const calcE = (info) => {
  const {positionInfo, sizeInfo, activeSubDataSize, activeSubDataPosition, originX, originY, tW, tH, cW, cH, gapX, gapY} = info;
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
  const {positionInfo, sizeInfo, activeSubDataSize, activeSubDataPosition, originX, originY, tW, tH, cW, cH, gapX, gapY} = info;
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
  const {positionInfo, sizeInfo, activeSubDataSize, activeSubDataPosition, originX, originY, tW, tH, cW, cH, gapX, gapY} = info;
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
  const {positionInfo, sizeInfo, activeSubDataSize, activeSubDataPosition, originX, originY, tW, tH, cW, cH, gapX, gapY} = info;
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
  const activeSubData = rootComponentState.activeSubData;
  if (this.state.resizeMode) {
    e = e.nativeEvent;
    const gapX = e.pageX - +this.state.resizeMode['startX'];
    const gapY = e.pageY - +this.state.resizeMode['startY'];
    this.state.resizeMode['startX'] = e.pageX;
    this.state.resizeMode['startY'] = e.pageY;
    const sizeInfo = activeSubData['size'];
    const positionInfo = activeSubData['position'];
    const tW = sizeInfo['wUnit'] === '%' ? canvasInfo.width * sizeInfo['w'] / 100 : sizeInfo['w'];
    const tH = sizeInfo['hUnit'] === '%' ? canvasInfo.height * sizeInfo['h'] / 100 : sizeInfo['h'];
    const mode = this.state.resizeMode['mode'];
    //
    const cW = (canvasInfo.width);
    const cH = (canvasInfo.height);
    //
    // 오리지날 포지션 찾기
    const activeSubDataSize = activeSubData['size'];
    const activeSubDataPosition = activeSubData['position'];
    const layoutSize = {
      w: activeSubDataSize['wUnit'] === '%' ? cW * activeSubDataSize['w'] / 100 : +activeSubDataSize['w'],
      h: activeSubDataSize['hUnit'] === '%' ? cH * activeSubDataSize['h'] / 100 : +activeSubDataSize['h'],
    };
    const originX = activeSubDataPosition['xUnit'] === '%' ? (cW - layoutSize.w) * (activeSubDataPosition['x'] / 100) : +activeSubDataPosition['x'];
    const originY = activeSubDataPosition['yUnit'] === '%' ? (cH - layoutSize.h) * (activeSubDataPosition['y'] / 100) : +activeSubDataPosition['y'];
    const info = {
      positionInfo,
      sizeInfo,
      activeSubDataSize,
      activeSubDataPosition,
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
    console.log(e);
  }
}

export default RedCanvas_checkResize;
