/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
function RedCanvas_checkDegree(e) {
  if (this.state.degreeMode) {
    e = e.nativeEvent;
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    const activeSubData = rootComponentState.activeSubData;
    const tX = e.pageX - this.state.degreeMode.startX;
    const tY = e.pageY - this.state.degreeMode.startY;
    const deg = Math.atan2(tY, tX);
    activeSubData['deg'] = deg * 180 / Math.PI;
    activeSubData['deg'] += 90;
    if (activeSubData['deg'] < 0) activeSubData['deg'] += 360;
    activeSubData['deg'] = activeSubData['deg'] % 360;
    rootComponent.updateRootState({activeSubData});
    document.body.style.cursor = 'move';
    console.log(e);
  }
}

export default RedCanvas_checkDegree