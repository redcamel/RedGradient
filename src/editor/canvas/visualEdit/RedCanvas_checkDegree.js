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
    const activeSubLayerData = rootComponentState.activeSubLayerData;
    const tX = degreeInfo.startX - degreeInfo.startDegX;
    const tY = degreeInfo.startY - degreeInfo.startDegY;
    const tX2 = e.pageX - degreeInfo.startDegX;
    const tY2 = e.pageY - degreeInfo.startDegY;
    let deg
    switch (degreeInfo.mode) {
      case "nw":
        deg = Math.atan2(tY, tX) - Math.atan2(tY2, tX2);
        activeSubLayerData['deg'] = +degreeInfo.startDeg + (deg * 180 / Math.PI) * 3;
        break
      case "ne":
        deg = Math.atan2(tY2, tX) - Math.atan2(tY, tX2);
        activeSubLayerData['deg'] = +degreeInfo.startDeg + (deg * 180 / Math.PI) * 3;
        break
      case "sw":
        deg = Math.atan2(tY2, tX) - Math.atan2(tY, tX2);
        activeSubLayerData['deg'] = +degreeInfo.startDeg - (deg * 180 / Math.PI) * 3;
        break
      case "se":
        deg = Math.atan2(tY, tX) - Math.atan2(tY2, tX2);
        activeSubLayerData['deg'] = +degreeInfo.startDeg - (deg * 180 / Math.PI) * 3;
        break
    }
    {
      const ctx = degreeInfo.ref.getContext('2d')
      const rect = degreeInfo.ref.getBoundingClientRect()
      const w = rect.width / this.state.canvasViewScale
      const h = rect.height / this.state.canvasViewScale
      const direction = degreeInfo.startDeg < activeSubLayerData['deg']
      ctx.resetTransform()
      ctx.clearRect(0, 0, 500 * this.state.canvasViewScale, 500 * this.state.canvasViewScale)
      ctx.beginPath();
      ctx.moveTo(w / 2, h / 2)
      if (direction) ctx.arc(w / 2, h / 2, w / 2, degreeInfo.startDeg * Math.PI / 180 - Math.PI / 2, activeSubLayerData['deg'] * Math.PI / 180 - Math.PI / 2);
      else ctx.arc(w / 2, h / 2, w / 2, activeSubLayerData['deg'] * Math.PI / 180 - Math.PI / 2, degreeInfo.startDeg * Math.PI / 180 - Math.PI / 2);
      ctx.strokeStyle = 'rgba(0, 0, 0,1)'
      ctx.fillStyle = direction ? 'rgba(94, 122, 222,0.85)' : 'rgb(222,94,113)'
      ctx.lineTo(w / 2, h / 2)
      ctx.fill();
      ctx.stroke();
      //
      ctx.beginPath();
      ctx.moveTo(w / 2, h / 2)
      ctx.strokeStyle = 'rgba(0, 0, 0,1)'
      ctx.fillStyle = 'rgba(255, 255, 255,1)'
      if (direction) ctx.arc(w / 2, h / 2, w / 5, degreeInfo.startDeg * Math.PI / 180 - Math.PI / 2, activeSubLayerData['deg'] * Math.PI / 180 - Math.PI / 2);
      else ctx.arc(w / 2, h / 2, w / 5, activeSubLayerData['deg'] * Math.PI / 180 - Math.PI / 2, degreeInfo.startDeg * Math.PI / 180 - Math.PI / 2);
      ctx.lineTo(w / 2, h / 2)
      ctx.fill();
      ctx.stroke();
      // ctx.closePath()
    }
    // activeSubLayerData['deg'] += 90;
    // if (activeSubLayerData['deg'] < 0) activeSubLayerData['deg'] += 360;
    // activeSubLayerData['deg'] = activeSubLayerData['deg'] % 360;
    rootComponent.updateRootState({});
    document.body.style.cursor = 'move';
    // console.log(e);
  }
}

export default RedCanvas_checkDegree