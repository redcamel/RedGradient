/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
function RedCanvas_checkResize(e) {
  const rootComponent = this.props.rootComponent;
  const rootComponentState = rootComponent.state;
  const canvasInfo = rootComponentState.canvasInfo;
  const activeSubData = rootComponentState.activeSubData;
  if (this.state.resizeMode) {
    e = e.nativeEvent;
    const gapX = e.pageX - this.state.resizeMode['startX'];
    const gapY = e.pageY - this.state.resizeMode['startY'];
    this.state.resizeMode['startX'] = e.pageX;
    this.state.resizeMode['startY'] = e.pageY;
    const sizeInfo = activeSubData['size'];
    const positionInfo = activeSubData['position'];
    const tW = sizeInfo['wUnit'] === '%' ? canvasInfo.width * sizeInfo['w'] / 100 : sizeInfo['w'];
    const tH = sizeInfo['hUnit'] === '%' ? canvasInfo.height * sizeInfo['h'] / 100 : sizeInfo['h'];
    const tPx = positionInfo['xUnit'] === '%' ? canvasInfo.width * positionInfo['x'] / 100 : positionInfo['x'];
    const tPy = positionInfo['yUnit'] === '%' ? canvasInfo.height * positionInfo['y'] / 100 : positionInfo['y'];
    const mode = this.state.resizeMode['mode'];
    //
    const cW = (canvasInfo.width);
    const cH = (canvasInfo.height);
    switch (mode) {
      case "nw":
        if (sizeInfo['wUnit'] === '%') {
          sizeInfo['w'] = (tW - gapX) / cW * 100;
          if (positionInfo['xUnit'] === '%') {
            positionInfo['x'] = (tPx + gapX) / cW * 100;
          } else positionInfo['x'] = tPx + gapX;
        } else {
          sizeInfo['w'] = tW - gapX;
          if (positionInfo['xUnit'] === '%') positionInfo['x'] = (tPx + gapX) / cW * 100;
          else positionInfo['x'] = tPx + gapX;
        }
        if (sizeInfo['hUnit'] === '%') {
          sizeInfo['h'] = (tH - gapY) / cH * 100;
          if (positionInfo['yUnit'] === '%') positionInfo['y'] = (tPy + gapY) / cH * 100;
          else positionInfo['y'] = tPy + gapY;
        } else {
          sizeInfo['h'] = tH - gapY;
          if (positionInfo['yUnit'] === '%') positionInfo['y'] = (tPy + gapY) / cH * 100;
          else positionInfo['y'] = tPy + gapY;
        }
        break;
      case "ne":
        if (sizeInfo['wUnit'] === '%') sizeInfo['w'] = (tW + gapX) / cW * 100;
        else sizeInfo['w'] = tW + gapX;
        if (sizeInfo['hUnit'] === '%') {
          sizeInfo['h'] = (tH - gapY) / cH * 100;
          if (positionInfo['yUnit'] === '%') positionInfo['y'] = (tPy + gapY) / cH * 100;
          else positionInfo['y'] = tPy + gapY;
        } else {
          sizeInfo['h'] = tH - gapY;
          if (positionInfo['yUnit'] === '%') positionInfo['y'] = (tPy + gapY) / cH * 100;
          else positionInfo['y'] = tPy + gapY;
        }
        break;
      case "sw":
        if (sizeInfo['wUnit'] === '%') {
          sizeInfo['w'] = (tW - gapX) / cW * 100;
          if (positionInfo['xUnit'] === '%') positionInfo['x'] = (tPx + gapX) / cW * 100;
          else positionInfo['x'] = tPx + gapX;
        } else {
          sizeInfo['w'] = tW - gapX;
          if (positionInfo['xUnit'] === '%') positionInfo['x'] = (tPx + gapX) / cW * 100;
          else positionInfo['x'] = tPx + gapX;
        }
        if (sizeInfo['hUnit'] === '%') sizeInfo['h'] = (tH + gapY) / cH * 100;
        else sizeInfo['h'] = tH + gapY;
        break;
      case "se":
        if (sizeInfo['wUnit'] === '%') sizeInfo['w'] = (tW + gapX) / cW * 100;
        else sizeInfo['w'] = tW + gapX;
        if (sizeInfo['hUnit'] === '%') sizeInfo['h'] = (tH + gapY) / cH * 100;
        else sizeInfo['h'] = tH + gapY;
        break;
    }
    document.body.style.cursor = `${mode}-resize`;
    rootComponent.updateRootState({});
    console.log(e);
  }
}

export default RedCanvas_checkResize