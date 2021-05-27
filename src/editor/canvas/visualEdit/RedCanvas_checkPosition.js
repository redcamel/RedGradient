/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
function RedCanvas_checkPosition(e) {
  if (this.state.positionMode) {
    e = e.nativeEvent;
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    const activeSubData = rootComponentState.activeSubData;
    const tX = e.pageX - this.state.positionMode.startX;
    const tY = e.pageY - this.state.positionMode.startY;
    const positionInfo = activeSubData['position'];
    const sizeInfo = activeSubData['size'];
    const tW = sizeInfo['wUnit'] === '%' ? canvasInfo.width * sizeInfo['w'] / 100 : sizeInfo['w'];
    const tH = sizeInfo['hUnit'] === '%' ? canvasInfo.height * sizeInfo['h'] / 100 : sizeInfo['h'];
    positionInfo['x'] = +this.state.positionMode.startValueX + (positionInfo['xUnit'] === '%' ? tX / tW * 100 : tX) * 1 / this.state.canvasViewScale;
    positionInfo['y'] = +this.state.positionMode.startValueY + (positionInfo['yUnit'] === '%' ? tY / tH * 100 : tY) * 1 / this.state.canvasViewScale;
    console.log(tX, tY);
    rootComponent.updateRootState({activeSubData});
    document.body.style.cursor = 'move';
    console.log(e);
  }
}

export default RedCanvas_checkPosition