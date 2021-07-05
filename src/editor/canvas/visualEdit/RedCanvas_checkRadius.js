/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */

const calcNW = (info, containerMode) => {
  const {
    canvasInfo,
    originX,
    gapX
  } = info;
  canvasInfo['border_radius'] = originX + gapX;
};
const calcNE = (info, containerMode) => {
  const {
    canvasInfo,
    originX,
    gapX
  } = info;
  canvasInfo['border_radius'] = originX + gapX;

};
const calcSW = (info, containerMode) => {
  const {
    canvasInfo,
    originY,
    gapY
  } = info;
  canvasInfo['border_radius'] = originY + gapY;
};
const calcSE = (info, containerMode) => {
  const {
    canvasInfo,
    originY,
    gapY
  } = info;
  canvasInfo['border_radius'] = originY - gapY;

};

function RedCanvas_checkResize(e, containerMode) {
  const rootComponent = this.props.rootComponent;
  const rootComponentState = rootComponent.state;
  const canvasInfo = rootComponentState.canvasInfo;
  const activeSubData = rootComponentState.activeSubData;
  if (this.state.radiusMode) {
    e = e.nativeEvent;
    const mode = this.state.radiusMode['mode'];
    let gapX = (e.pageX - +this.state.radiusMode['startX']) / this.state.canvasViewScale;
    let gapY = (e.pageY - +this.state.radiusMode['startY']) / this.state.canvasViewScale;
    switch (mode) {
      case 'sw':
      case 'ne':
        gapY = (e.shiftKey || activeSubData['fixRatioYn']) ? -gapX : gapY;
        break;
      case 'nw':
      case 'se':
        gapY = (e.shiftKey || activeSubData['fixRatioYn']) ? gapX : gapY;
        break;
    }
    this.state.radiusMode['startX'] = e.pageX;
    this.state.radiusMode['startY'] = e.pageY;

    const originX = canvasInfo['border_radius']
    const originY = canvasInfo['border_radius']
    const info = {
      key: rootComponentState['key'],
      canvasInfo,
      originX,
      originY,
      gapX,
      gapY
    };
    switch (mode) {
      case "nw":
        calcNW(info, containerMode);
        break;
      case "ne":
        calcNE(info, containerMode);
        break;
      case "sw":
        calcSW(info, containerMode);
        break;
      case "se":
        calcSE(info, containerMode);
        break;
    }
    document.body.style.cursor = `${mode}-resize`;
    rootComponent.updateRootState({});
    // console.log(e);
  }
}

export default RedCanvas_checkResize;
