/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */

const calcWE = (info) => {
  const {positionInfo, sizeInfo, activeSubDataSize, activeSubDataPosition, originX, originY, tW, tH, cW, cH,gapX,gapY} = info;
  if (positionInfo['xUnit'] === '%') {
    let targetPixelSize = tW;
    let size = (cW - targetPixelSize) || cW
    let newTargetPercentPosition = (originX + gapX) / size * 100;
    positionInfo['x'] = Number.isNaN(newTargetPercentPosition) ? 0 : newTargetPercentPosition;;
  } else {
    if (sizeInfo['wUnit'] === '%') {
      positionInfo['x'] = originX + gapX;
    } else {
      positionInfo['x'] = originX + gapX;
    }
  }
};
const calcSN = (info) => {
  const {positionInfo, sizeInfo, activeSubDataSize, activeSubDataPosition, originX, originY, tW, tH, cW, cH,gapX,gapY} = info;
  if (positionInfo['yUnit'] === '%') {
    let targetPixelSize = tH;
    let size = (cH - targetPixelSize) || cH
    let newTargetPercentPosition = (originY+ gapY) / size * 100;
    console.log('newTargetPercentPosition',newTargetPercentPosition)
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
    const activeSubData = rootComponentState.activeSubData;
    // const tX = e.pageX - this.state.positionMode.startX;
    // const tY = e.pageY - this.state.positionMode.startY;
    // const positionInfo = activeSubData['position'];
    // const sizeInfo = activeSubData['size'];
    // const tW = sizeInfo['wUnit'] === '%' ? canvasInfo.width * sizeInfo['w'] / 100 : sizeInfo['w'];
    // const tH = sizeInfo['hUnit'] === '%' ? canvasInfo.height * sizeInfo['h'] / 100 : sizeInfo['h'];
    // positionInfo['x'] = +this.state.positionMode.startValueX + (positionInfo['xUnit'] === '%' ? tX / tW * 100 : tX) * 1 / this.state.canvasViewScale;
    // positionInfo['y'] = +this.state.positionMode.startValueY + (positionInfo['yUnit'] === '%' ? tY / tH * 100 : tY) * 1 / this.state.canvasViewScale;
    // console.log(tX, tY);

    const gapX = e.pageX - +this.state.positionMode['startX'];
    const gapY = e.pageY - +this.state.positionMode['startY'];
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
    const originX = activeSubDataPosition['xUnit'] === '%' ? (cW - layoutSize.w) * (activeSubDataPosition['x'] / 100) : +activeSubDataPosition['x'];
    const originY = activeSubDataPosition['yUnit'] === '%' ? (cH - layoutSize.h) * (activeSubDataPosition['y'] / 100) : +activeSubDataPosition['y'];
    const info = {positionInfo, sizeInfo, activeSubDataSize, activeSubDataPosition, originX, originY, tW, tH, cW, cH,gapX,gapY};
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
    console.log(e);
  }
}

export default RedCanvas_checkPosition
