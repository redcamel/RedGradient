/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
const calcWE = (info) => {
  const {
    positionInfo,
    sizeInfo,
    originX,
    tW,
    cW,
    gapX
  } = info;
  if (tW === cW) positionInfo['xUnit'] = 'px'
  if (positionInfo['xUnit'] === '%') {
    let size = (cW - tW) || cW
    let newTargetPercentPosition = (originX + gapX) / size * 100;
    positionInfo['x'] = Number.isNaN(newTargetPercentPosition) ? 0 : newTargetPercentPosition;
  } else {
    if (sizeInfo['wUnit'] === '%') {
      positionInfo['x'] = originX + gapX;
    } else {
      positionInfo['x'] = originX + gapX;
    }
  }
};
const calcSN = (info) => {
  const {
    positionInfo,
    sizeInfo,
    originY,
    tH,
    cH,
    gapY
  } = info;
  if (tH === cH) positionInfo['yUnit'] = 'px'
  if (positionInfo['yUnit'] === '%') {
    let size = (cH - tH) || cH
    let newTargetPercentPosition = (originY + gapY) / size * 100;
    // console.log('newTargetPercentPosition', newTargetPercentPosition)
    positionInfo['y'] = Number.isNaN(newTargetPercentPosition) ? 0 : newTargetPercentPosition;
  } else {
    if (sizeInfo['hUnit'] === '%') {
      positionInfo['y'] = originY + gapY;
    } else {
      positionInfo['y'] = originY + gapY;
    }
  }
};

function RedCanvas_checkPosition(e) {
  if (this.state.positionMode) {
    e = e.nativeEvent;
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    const activeSubLayerData = rootComponentState.activeSubLayerData;
    // const tX = e.pageX - this.state.positionMode.startX;
    // const tY = e.pageY - this.state.positionMode.startY;
    // const positionInfo = activeSubLayerData['position'];
    // const sizeInfo = activeSubLayerData['size'];
    // const tW = sizeInfo['wUnit'] === '%' ? canvasInfo.width * sizeInfo['w'] / 100 : sizeInfo['w'];
    // const tH = sizeInfo['hUnit'] === '%' ? canvasInfo.height * sizeInfo['h'] / 100 : sizeInfo['h'];
    // positionInfo['x'] = +this.state.positionMode.startValueX + (positionInfo['xUnit'] === '%' ? tX / tW * 100 : tX) * 1 / this.state.canvasViewScale;
    // positionInfo['y'] = +this.state.positionMode.startValueY + (positionInfo['yUnit'] === '%' ? tY / tH * 100 : tY) * 1 / this.state.canvasViewScale;
    // console.log(tX, tY);
    const gapX = (e.pageX - +this.state.positionMode['startX']) / this.state.canvasViewScale;
    const gapY = (e.pageY - +this.state.positionMode['startY']) / this.state.canvasViewScale;
    this.state.positionMode['startX'] = e.pageX;
    this.state.positionMode['startY'] = e.pageY;
    const sizeInfo = activeSubLayerData['size'];
    const positionInfo = activeSubLayerData['position'];
    const tW = sizeInfo['wUnit'] === '%' ? canvasInfo.width * sizeInfo['w'] / 100 : sizeInfo['w'];
    const tH = sizeInfo['hUnit'] === '%' ? canvasInfo.height * sizeInfo['h'] / 100 : sizeInfo['h'];
    const mode = this.state.positionMode['mode'];
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
        calcWE(info);
        break;
      case "w" :
        calcWE(info);
        break;
      case "s" :
        calcSN(info);
        break;
      case "n" :
        calcSN(info);
        break;
      case "all" :
        calcWE(info);
        calcSN(info);
        break;
    }
    rootComponent.updateRootState({});
    document.body.style.cursor = 'move';
    // console.log(e);
  }
}

export default RedCanvas_checkPosition
