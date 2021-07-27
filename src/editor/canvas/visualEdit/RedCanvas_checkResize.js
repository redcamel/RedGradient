/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import ACTIVE_FRAME_KEY from "../../../js/const/ACTIVE_FRAME_KEY";

const calcE = (info, containerMode) => {
  const {

    canvasInfo,
    positionInfo,
    sizeInfo,
    originX,
    tW,
    cW,
    gapX,
    altKey,
    key
  } = info;
  if (containerMode) {
    canvasInfo['width'] = originX + gapX
    if(altKey && key !== ACTIVE_FRAME_KEY.MAIN) canvasInfo['left'] -= gapX/2
  } else {
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
  }
};
const calcW = (info, containerMode) => {
  const {
    key,
    canvasInfo,
    positionInfo,
    sizeInfo,
    originX,
    tW,
    cW,
    gapX,
    altKey
  } = info;
  if (containerMode) {
    canvasInfo['width'] = originX - gapX;
    if (key !== ACTIVE_FRAME_KEY.MAIN) {
      if(altKey) canvasInfo['left'] += gapX/2;
      else canvasInfo['left'] += gapX;
    }

  } else {
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
  }

};
const calcS = (info, containerMode) => {
  const {
    canvasInfo,
    positionInfo,
    sizeInfo,
    originY,
    tH,
    cH,
    gapY,
    key,
    altKey
  } = info;
  if (containerMode) {
    canvasInfo['height'] = originY + gapY;
    if(altKey && key !== ACTIVE_FRAME_KEY.MAIN) canvasInfo['top'] -= gapY/2
  } else {
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
  }

};
const calcN = (info, containerMode) => {
  const {
    key,
    canvasInfo,
    positionInfo,
    sizeInfo,
    originY,
    tH,
    cH,
    gapY,
    altKey
  } = info;
  if (containerMode) {
    canvasInfo['height'] = originY - gapY;
    if (key !== ACTIVE_FRAME_KEY.MAIN) {
      if(altKey) canvasInfo['top'] += gapY/2;
      else canvasInfo['top'] += gapY;
    }
  } else {
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
  }

};

function RedCanvas_checkResize(e, containerMode) {
  const rootComponent = this.props.rootComponent;
  const rootComponentState = rootComponent.state;
  const canvasInfo = rootComponentState.canvasInfo;
  const activeSubData = rootComponentState.activeSubData;
  if (this.state.resizeMode) {
    e = e.nativeEvent;
    const mode = this.state.resizeMode['mode'];
    let gapX = (e.pageX - +this.state.resizeMode['startX']) / this.state.canvasViewScale;
    let gapY = (e.pageY - +this.state.resizeMode['startY']) / this.state.canvasViewScale;
    switch (mode) {
      case 'sw':
      case 'ne':
        gapY = (e.shiftKey || activeSubData['fixRatioYn']) ? -gapX : gapY;
        break;
      case 'nw':
      case 'se':
        gapY = (e.shiftKey || activeSubData['fixRatioYn']) ? gapX : gapY;
        break;
      default :
        break;
    }
    this.state.resizeMode['startX'] = e.pageX;
    this.state.resizeMode['startY'] = e.pageY;
    const sizeInfo = activeSubData['size'];
    const positionInfo = activeSubData['position'];
    const tW = sizeInfo['wUnit'] === '%' ? canvasInfo.width * sizeInfo['w'] / 100 : sizeInfo['w'];
    const tH = sizeInfo['hUnit'] === '%' ? canvasInfo.height * sizeInfo['h'] / 100 : sizeInfo['h'];
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
    const originX = containerMode ? canvasInfo['width'] : (activeSubDataPosition['xUnit'] === '%' ? (cW - layoutSize.w) * (activeSubDataPosition['x'] / 100) : +activeSubDataPosition['x']);
    const originY = containerMode ? canvasInfo['height'] : (activeSubDataPosition['yUnit'] === '%' ? (cH - layoutSize.h) * (activeSubDataPosition['y'] / 100) : +activeSubDataPosition['y']);
    const altKey = e.altKey
    const info = {
      key: rootComponentState['key'],
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
      gapY,
      altKey
    };
    switch (mode) {
      case "e" :
        calcE(info, containerMode);
        break;
      case "w" :
        calcW(info, containerMode);
        break;
      case "s" :
        calcS(info, containerMode);
        break;
      case "n" :
        calcN(info, containerMode);
        break;
      case "nw":
        calcN(info, containerMode);
        calcW(info, containerMode);
        break;
      case "ne":
        calcN(info, containerMode);
        calcE(info, containerMode);
        break;
      case "sw":
        calcS(info, containerMode);
        calcW(info, containerMode);
        break;
      case "se":
        calcS(info, containerMode);
        calcE(info, containerMode);
        break;
      default :
        break;
    }
    document.body.style.cursor = `${mode}-resize`;
    rootComponent.updateRootState({});
    // console.log(e);
  }
}

export default RedCanvas_checkResize;
