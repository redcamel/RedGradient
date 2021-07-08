/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
function RedCanvas_checkAt(e) {
  if (this.state.atMode) {
    e = e.nativeEvent;
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    const activeSubData = rootComponentState.activeSubData;
    const tX = (e.pageX - this.state.atMode.startX) / this.state.canvasViewScale;
    const tY = (e.pageY - this.state.atMode.startY) / this.state.canvasViewScale;
    const atInfo = activeSubData['at'];
    const sizeInfo = activeSubData['size'];
    const tW = sizeInfo['wUnit'] === '%' ? canvasInfo.width * sizeInfo['w'] / 100 : sizeInfo['w'];
    const tH = sizeInfo['hUnit'] === '%' ? canvasInfo.height * sizeInfo['h'] / 100 : sizeInfo['h'];
    atInfo['x'] = +this.state.atMode.startValueX + (atInfo['xUnit'] === '%' ? tX / tW * 100 : +tX);
    atInfo['y'] = +this.state.atMode.startValueY + (atInfo['yUnit'] === '%' ? tY / tH * 100 : +tY);
    // console.log(tX, tY);
    rootComponent.updateRootState({});
    document.body.style.cursor = 'move';
    // console.log(e);
  }
}

export default RedCanvas_checkAt;
