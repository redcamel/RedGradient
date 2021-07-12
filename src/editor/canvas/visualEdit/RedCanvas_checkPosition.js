/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
const calcWE = (info, containerMode) => {
  const {
    canvasInfo,
    positionInfo,
    sizeInfo,
    originX,
    tW,
    cW,
    gapX
  } = info;
  if (containerMode) {
    canvasInfo['left'] = originX + gapX;
  } else {
    if (tW === cW) positionInfo['xUnit'] = 'px';
    if (positionInfo['xUnit'] === '%') {
      let size = (cW - tW) || cW;
      let newTargetPercentPosition = (originX + gapX) / size * 100;
      positionInfo['x'] = Number.isNaN(newTargetPercentPosition) ? 0 : newTargetPercentPosition;
    } else {
      if (sizeInfo['wUnit'] === '%') {
        positionInfo['x'] = originX + gapX;
      } else {
        positionInfo['x'] = originX + gapX;
      }
    }
  }

};
const calcSN = (info, containerMode) => {
  const {
    canvasInfo,
    positionInfo,
    sizeInfo,
    originY,
    tH,
    cH,
    gapY
  } = info;
  if (containerMode) {
    canvasInfo['top'] = originY + gapY;
  } else {
    if (tH === cH) positionInfo['yUnit'] = 'px';
    if (positionInfo['yUnit'] === '%') {
      let size = (cH - tH) || cH;
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
  }

};

function RedCanvas_checkPosition(e, containerMode) {
  if (this.state.positionMode) {
    e = e.nativeEvent;
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    const activeSubData = rootComponentState.activeSubData;
// js tX = e.pageX - this.state.positionMode.startX;
    // js tY = e.pageY - this.state.positionMode.startY;
    // js positionInfo = activeSubData['position'];
    // js sizeInfo = activeSubData['size'];
    // js tW = sizeInfo['wUnit'] === '%' ? canvasInfo.width * sizeInfo['w'] / 100 : sizeInfo['w'];
    // js tH = sizeInfo['hUnit'] === '%' ? canvasInfo.height * sizeInfo['h'] / 100 : sizeInfo['h'];
    // positionInfo['x'] = +this.state.positionMode.startValueX + (positionInfo['xUnit'] === '%' ? tX / tW * 100 : tX) * 1 / this.state.canvasViewScale;
    // positionInfo['y'] = +this.state.positionMode.startValueY + (positionInfo['yUnit'] === '%' ? tY / tH * 100 : tY) * 1 / this.state.canvasViewScale;
    // console.log(tX, tY);
    const gapX = (e.pageX - +this.state.positionMode['startX']) / this.state.canvasViewScale;
    const gapY = (e.pageY - +this.state.positionMode['startY']) / this.state.canvasViewScale;
    this.state.positionMode['startX'] = e.pageX;
    this.state.positionMode['startY'] = e.pageY;


    const sizeInfo = activeSubData['size'];
    const positionInfo = activeSubData['position'];
    const tW = sizeInfo['wUnit'] === '%' ? canvasInfo.width * sizeInfo['w'] / 100 : sizeInfo['w'];
    const tH = sizeInfo['hUnit'] === '%' ? canvasInfo.height * sizeInfo['h'] / 100 : sizeInfo['h'];
    const mode = this.state.positionMode['mode'];
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
    const originX = containerMode ? canvasInfo['left'] : (activeSubDataPosition['xUnit'] === '%' ? (cW - layoutSize.w) * (activeSubDataPosition['x'] / 100) : +activeSubDataPosition['x']);
    const originY = containerMode ? canvasInfo['top'] : (activeSubDataPosition['yUnit'] === '%' ? (cH - layoutSize.h) * (activeSubDataPosition['y'] / 100) : +activeSubDataPosition['y']);
    const info = {
      canvasInfo,
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

    // console.log(e);
    switch (mode) {
      case "e" :
        calcWE(info, containerMode);
        break;
      case "w" :
        calcWE(info, containerMode);
        break;
      case "s" :
        calcSN(info, containerMode);
        break;
      case "n" :
        calcSN(info, containerMode);
        break;
      case "all" :
        calcWE(info, containerMode);
        calcSN(info, containerMode);
        break;
      default :
        break;
    }

    rootComponent.updateRootState({});
    document.body.style.cursor = 'move';

  }
}

export default RedCanvas_checkPosition;
