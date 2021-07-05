/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */

const calcNW = (info) => {
  const {
    canvasInfo,
    startRadius,
    gapX
  } = info;
  if (canvasInfo['border_radius_mergeMode']) canvasInfo['border_radius'] = startRadius[0] + gapX;
  else {
    canvasInfo['border_radius_split'][0] = startRadius[0] + gapX;
  }
};
const calcNE = (info) => {
  const {
    canvasInfo,
    startRadius,
    gapX
  } = info;
  if (canvasInfo['border_radius_mergeMode']) canvasInfo['border_radius'] = startRadius[0] - gapX;
  else {
    canvasInfo['border_radius_split'][2] = startRadius[2] - gapX;
  }

};
const calcSW = (info) => {
  const {
    canvasInfo,
    startRadius,
    gapX
  } = info;
  if (canvasInfo['border_radius_mergeMode']) canvasInfo['border_radius'] = startRadius[0] + gapX;
  else {
    canvasInfo['border_radius_split'][1] = startRadius[1] + gapX;
  }
};
const calcSE = (info) => {
  const {
    canvasInfo,
    startRadius,
    gapX
  } = info;
  if (canvasInfo['border_radius_mergeMode']) canvasInfo['border_radius'] = startRadius[0] - gapX;
  else {
    canvasInfo['border_radius_split'][3] = startRadius[3] - gapX;
  }
};

function RedCanvas_checkResize(e) {
  const rootComponent = this.props.rootComponent;
  const rootComponentState = rootComponent.state;
  const canvasInfo = rootComponentState.canvasInfo;
  const activeSubData = rootComponentState.activeSubData;
  if (this.state.radiusMode) {
    e = e.nativeEvent;
    const mode = this.state.radiusMode['mode'];
    let gapX = (e.pageX - +this.state.radiusMode['startX']) / this.state.canvasViewScale ;

    if (canvasInfo['border_radius_mergeMode']) {

    } else {
      this.state.radiusMode['startX'] = e.pageX;
      this.state.radiusMode['startY'] = e.pageY;

    }

    const startRadius = this.state.radiusMode.startRadius;
    const info = {
      key: rootComponentState['key'],
      canvasInfo,
      startRadius,
      gapX
    };
    switch (mode) {
      case "nw":
        calcNW(info);
        break;
      case "ne":
        calcNE(info);
        break;
      case "sw":
        calcSW(info);
        break;
      case "se":
        calcSE(info);
        break;
    }

    document.body.style.cursor = `${mode}-resize`;
    rootComponent.updateRootState({});
    // console.log(e);
  }
}

export default RedCanvas_checkResize;
