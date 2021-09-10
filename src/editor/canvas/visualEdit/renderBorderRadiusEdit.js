import ACTIVE_FRAME_KEY from "../../../js/const/ACTIVE_FRAME_KEY";
import RedCanvas from "../RedCanvas";

const renderBorderRadiusEdit = function (rootComponentState, activeSubData, canvasInfo, appState) {
  let cX = this.state.editCanvasOnly ? -canvasInfo['left'] || 0 : 0;
  let cY = this.state.editCanvasOnly ? -canvasInfo['top'] || 0 : 0;
  if (rootComponentState['key'] !== ACTIVE_FRAME_KEY.MAIN && !this.state.editCanvasOnly) {
    const mainCanvasInfo = appState[ACTIVE_FRAME_KEY.MAIN]['canvasInfo'];
    const borderW = mainCanvasInfo['border_width_mergeMode'] ? mainCanvasInfo['border_width'] : (mainCanvasInfo['border_width_split'][1] + mainCanvasInfo['border_width_split'][3]);
    const borderH = mainCanvasInfo['border_width_mergeMode'] ? mainCanvasInfo['border_width'] : (mainCanvasInfo['border_width_split'][0] + mainCanvasInfo['border_width_split'][2]);
    cX += borderW;
    cY += borderH;
  }
  const layoutSize = {
    w: canvasInfo['width'],
    h: canvasInfo['height'],
    x: canvasInfo['left'] + cX,
    y: canvasInfo['top'] + cY
  };
  // console.log('layoutSize', layoutSize);
  const borderRadius = canvasInfo['border_radius_mergeMode'] ? [canvasInfo.border_radius, canvasInfo.border_radius, canvasInfo.border_radius, canvasInfo.border_radius] : canvasInfo['border_radius_split'];
  return this.state.layerSizeView ? <div
    style={{
      zIndex: 1,
      position: 'absolute',
      left: `${layoutSize['x']}px`,
      top: `${layoutSize['y']}px`,
      width: `${layoutSize['w']}px`,
      height: `${layoutSize['h']}px`,
      border: '1px dashed #000',
      outline: '1px dashed rgba(255,255,255,0.75)',
      color: '#000'
    }}
  >

    {
      <>
        <div style={{
          position: 'absolute',
          top: Math.max(0, Math.min(borderRadius[0], canvasInfo['height'] / 2)),
          left: Math.max(0, Math.max(Math.min(borderRadius[0], canvasInfo['width'] / 2))),
          transform: 'translate(-50%,-50%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: '#fff',
          border: '1px solid #000',
          cursor: 'pointer'
        }}
             onMouseDown={e => {
               e.stopPropagation();
               RedCanvas.ghostMode = true;
               this.setModes({
                 radiusMode: {
                   mode: 'nw',
                   startRadius: borderRadius,
                   startX: e.nativeEvent.pageX,
                   startY: e.nativeEvent.pageY
                 }
               });
             }}
        />
        <div style={{
          position: 'absolute',
          bottom: Math.max(0, Math.min(borderRadius[1], canvasInfo['height'] / 2)),
          left: Math.max(0, Math.max(Math.min(borderRadius[1], canvasInfo['width'] / 2))),
          transform: 'translate(-50%,50%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: '#fff',
          border: '1px solid #000',
          cursor: 'pointer'
        }}
             onMouseDown={e => {
               e.stopPropagation();
               RedCanvas.ghostMode = true;
               this.setModes({
                 radiusMode: {
                   mode: 'sw',
                   startRadius: borderRadius,
                   startX: e.nativeEvent.pageX,
                   startY: e.nativeEvent.pageY
                 }
               });
             }}
        />
        <div style={{
          position: 'absolute',
          top: Math.max(0, Math.min(borderRadius[2], canvasInfo['height'] / 2)),
          left: Math.min(Math.max(canvasInfo['width'] / 2, canvasInfo['width'] - borderRadius[2]), canvasInfo['width']),
          transform: 'translate(-50%,-50%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: '#fff',
          border: '1px solid #000',
          cursor: 'pointer'
        }}
             onMouseDown={e => {
               e.stopPropagation();
               RedCanvas.ghostMode = true;
               this.setModes({
                 radiusMode: {
                   mode: 'ne',
                   startRadius: borderRadius,
                   startX: e.nativeEvent.pageX,
                   startY: e.nativeEvent.pageY
                 }
               });
             }}
        />
        <div style={{
          position: 'absolute',
          bottom: Math.max(0, Math.min(borderRadius[3], canvasInfo['height'] / 2)),
          left: Math.min(Math.max(canvasInfo['width'] / 2, canvasInfo['width'] - borderRadius[3]), canvasInfo['width']),
          transform: 'translate(-50%,50%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: '#fff',
          border: '1px solid #000',
          cursor: 'pointer'
        }}
             onMouseDown={e => {
               e.stopPropagation();
               RedCanvas.ghostMode = true;
               this.setModes({
                 radiusMode: {
                   mode: 'se',
                   startRadius: borderRadius,
                   startX: e.nativeEvent.pageX,
                   startY: e.nativeEvent.pageY
                 }
               });
             }}
        />
        {/*<div style={{*/}
        {/*  position : 'absolute',top:0,right:0,*/}
        {/*  transform : 'translate(50%,-50%)',*/}
        {/*  display : 'flex', justifyContent : 'center', alignItems : 'center', width : '20px', height : '20px', borderRadius : '50%', background : 'red'*/}
        {/*}}>o</div>*/}
        {/*<div style={{*/}
        {/*  position : 'absolute',bottom:0,right:0,*/}
        {/*  transform : 'translate(50%,50%)',*/}
        {/*  display : 'flex', justifyContent : 'center', alignItems : 'center', width : '20px', height : '20px', borderRadius : '50%', background : 'red'*/}
        {/*}}>o</div>*/}
        {/*<div style={{*/}
        {/*  position : 'absolute',bottom:0,left:0,*/}
        {/*  transform : 'translate(-50%,50%)',*/}
        {/*  display : 'flex', justifyContent : 'center', alignItems : 'center', width : '20px', height : '20px', borderRadius : '50%', background : 'red'*/}
        {/*}}>o</div>*/}

      </>
    }
    {/*<div style={{background: 'rgba(255,255,255,0.8)'}}>보더에디터 - 작업중</div>*/}
  </div> : '';
};
export default renderBorderRadiusEdit;
