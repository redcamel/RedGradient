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
    const degreeInfo = this.state.degreeMode
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    const activeSubData = rootComponentState.activeSubData;
    const tX = e.pageX - degreeInfo.startX;
    const tY = e.pageY - degreeInfo.startY;
    let deg
    deg =  Math.atan2(tY, tX)
    if(!degreeInfo['calcTargetDeg']) degreeInfo['calcTargetDeg'] = deg
    switch (degreeInfo.mode) {
      case "nw":
      case "ne":
      case "sw":
      case "se":
        activeSubData['deg'] = (+degreeInfo.startDeg +  (deg-degreeInfo['calcTargetDeg'])* 180 / Math.PI)%360
        break
    }
    {
      const ctx = degreeInfo.ref.getContext('2d')
      const rect = degreeInfo.ref.getBoundingClientRect()
      const w = rect.width / this.state.canvasViewScale
      const h = rect.height / this.state.canvasViewScale
      const direction = degreeInfo.startDeg < activeSubData['deg']
      ctx.resetTransform()
      ctx.clearRect(0, 0, 500 * this.state.canvasViewScale, 500 * this.state.canvasViewScale)
      ctx.beginPath();
      ctx.moveTo(w / 2, h / 2)
      if (direction) ctx.arc(w / 2, h / 2, w / 2, degreeInfo.startDeg * Math.PI / 180 - Math.PI / 2, activeSubData['deg'] * Math.PI / 180 - Math.PI / 2);
      else ctx.arc(w / 2, h / 2, w / 2, activeSubData['deg'] * Math.PI / 180 - Math.PI / 2, degreeInfo.startDeg * Math.PI / 180 - Math.PI / 2);
      ctx.strokeStyle = 'rgba(0, 0, 0,1)'
      ctx.fillStyle = direction ? 'rgba(94, 122, 222,0.85)' : 'rgba(222,94,113,0.5)'
      ctx.lineTo(w / 2, h / 2)
      ctx.fill();
      ctx.stroke();
      //
      ctx.beginPath();
      ctx.moveTo(w / 2, h / 2)
      ctx.strokeStyle = 'rgba(0, 0, 0,1)'
      ctx.fillStyle = 'rgba(255, 255, 255,0.5)'
      if (direction) ctx.arc(w / 2, h / 2, w / 5, degreeInfo.startDeg * Math.PI / 180 - Math.PI / 2, activeSubData['deg'] * Math.PI / 180 - Math.PI / 2);
      else ctx.arc(w / 2, h / 2, w / 5, activeSubData['deg'] * Math.PI / 180 - Math.PI / 2, degreeInfo.startDeg * Math.PI / 180 - Math.PI / 2);
      ctx.lineTo(w / 2, h / 2)
      ctx.fill();
      ctx.stroke();
      // ctx.closePath()
    }
    // activeSubData['deg'] += 90;
    // if (activeSubData['deg'] < 0) activeSubData['deg'] += 360;
    // activeSubData['deg'] = activeSubData['deg'] % 360;
    rootComponent.updateRootState({});
    document.body.style.cursor = 'move';
    // console.log(e);
  }
}

export default RedCanvas_checkDegree
