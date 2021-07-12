import ACTIVE_FRAME_KEY from "../../../js/const/ACTIVE_FRAME_KEY";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowsAlt, faArrowsAltH, faArrowsAltV, faExpandAlt} from "@fortawesome/free-solid-svg-icons";
import RedCanvas from "../RedCanvas";


const renderContainerEdit = function (rootComponentState, activeSubData, canvasInfo, appState) {
  let cX = this.state.editCanvasOnly ? -canvasInfo['left'] : 0;
  let cY = this.state.editCanvasOnly ? -canvasInfo['top'] : 0;

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
  const iconScale = Math.min(1, 1 / this.state.canvasViewScale);
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
      background: RedCanvas.ghostMode ? 'rgba(255,255,255,0.2)' : '',
      color: '#000'
    }}
  >

    <div style={{
      top: 0,
      left: '50%',
      transform: `translate(-50%, -${20 + 36 * iconScale}px) scale(${iconScale})`,
      transition: 'transform 0.2s',
      position: 'absolute', width: `30px`, height: '30px',
      display: rootComponentState['key'] === ACTIVE_FRAME_KEY.MAIN ? 'none' : 'flex',
      alignItems: 'center', justifyContent: 'center',
      cursor: 'move',
      border: '1px solid #5e7ade', borderRadius: '50%',
      boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
      background: '#fff'
    }} onMouseDown={e => {
      e.stopPropagation();
      RedCanvas.ghostMode = true;
      this.setModes({
        positionMode: {
          mode: 'n',
          startValueX: canvasInfo['left'],
          startValueY: canvasInfo['top'],
          startX: e.nativeEvent.pageX,
          startY: e.nativeEvent.pageY
        }
      });
    }}>
      <FontAwesomeIcon icon={faArrowLeft} style={{fontSize: '17px', transform: `rotate(90deg)`}} />
    </div>
    <div style={{
      bottom: 0,
      left: '50%',
      transform: `translate(-50%, ${20 + 36 * iconScale}px) scale(${iconScale})`,
      transition: 'transform 0.2s',
      position: 'absolute', width: '30px', height: '30px',
      display: rootComponentState['key'] === ACTIVE_FRAME_KEY.MAIN ? 'none' : 'flex',
      alignItems: 'center', justifyContent: 'center',
      cursor: 'move',
      border: '1px solid #5e7ade', borderRadius: '50%',
      boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
      background: '#fff'
    }} onMouseDown={e => {
      e.stopPropagation();
      RedCanvas.ghostMode = true;
      this.setModes({
        positionMode: {
          mode: 's',
          startValueX: canvasInfo['left'],
          startValueY: canvasInfo['top'],
          startX: e.nativeEvent.pageX,
          startY: e.nativeEvent.pageY
        }
      });
    }}>
      <FontAwesomeIcon icon={faArrowLeft} style={{fontSize: '17px', transform: 'rotate(-90deg)'}} />
    </div>
    <div style={{
      bottom: '50%',
      left: 0,
      transform: `translate(-${20 + 36 * iconScale}px, 50%) scale(${iconScale})`,
      transition: 'transform 0.2s',
      position: 'absolute', width: '30px', height: '30px',
      display: rootComponentState['key'] === ACTIVE_FRAME_KEY.MAIN ? 'none' : 'flex',
      alignItems: 'center', justifyContent: 'center',
      cursor: 'move',
      border: '1px solid #5e7ade', borderRadius: '50%',
      boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
      background: '#fff'
    }} onMouseDown={e => {
      e.stopPropagation();
      RedCanvas.ghostMode = true;
      this.setModes({
        positionMode: {
          mode: 'w',
          startValueX: canvasInfo['left'],
          startValueY: canvasInfo['top'],
          startX: e.nativeEvent.pageX,
          startY: e.nativeEvent.pageY
        }
      });
    }}>
      <FontAwesomeIcon icon={faArrowLeft} style={{fontSize: '17px'}} />
    </div>
    <div style={{
      bottom: '50%',
      right: 0,
      transform: `translate(${20 + 36 * iconScale}px, 50%) scale(${iconScale})`,
      transition: 'transform 0.2s',
      position: 'absolute', width: '30px', height: '30px',
      display: rootComponentState['key'] === ACTIVE_FRAME_KEY.MAIN ? 'none' : 'flex',
      alignItems: 'center', justifyContent: 'center',
      cursor: 'move',
      border: '1px solid #5e7ade', borderRadius: '50%',
      boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
      background: '#fff'
    }} onMouseDown={e => {
      e.stopPropagation();
      RedCanvas.ghostMode = true;
      this.setModes({
        positionMode: {
          mode: 'e',
          startValueX: canvasInfo['left'],
          startValueY: canvasInfo['top'],
          startX: e.nativeEvent.pageX,
          startY: e.nativeEvent.pageY
        }
      });
    }}>
      <FontAwesomeIcon icon={faArrowLeft} style={{fontSize: '17px', transform: 'rotate(180deg)'}} />
    </div>
    <div style={{
      bottom: 0,
      left: '50%',
      transform: `translate(-50%, ${20 + 76 * iconScale}px) scale(${iconScale})`,
      transition: 'transform 0.2s',
      position: 'absolute',
      width: '30px',
      height: '30px',
      display: rootComponentState['key'] === ACTIVE_FRAME_KEY.MAIN ? 'none' : 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'move',
      border: '1px solid #5e7ade',
      borderRadius: '50%',
      boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
      background: '#5e7ade',

    }} onMouseDown={e => {
      e.stopPropagation();
      RedCanvas.ghostMode = true;
      this.setModes({
        positionMode: {
          mode: 'all',
          startValueX: canvasInfo['left'],
          startValueY: canvasInfo['top'],
          startX: e.nativeEvent.pageX,
          startY: e.nativeEvent.pageY
        }
      });
    }}>
      <FontAwesomeIcon icon={faArrowsAlt} style={{color: '#fff', fontSize: '17px', transform: 'rotate(-90deg)'}} />
    </div>
    <>
      <div
        style={{
          top: 0,
          left: 0,
          transform: `translate(-${16 + 7 * iconScale}px, -${16 + 7 * iconScale}px) scale(${iconScale})`,
          transition: 'transform 0.2s',
          position: 'absolute',
          width: '23px',
          height: '23px',
          cursor: 'nw-resize',
          background: 'rgba(84,114,208,1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(0,0,0,0.8)',
          filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
        }}
        onMouseDown={e => {
          e.stopPropagation();
          RedCanvas.ghostMode = true;
          this.setModes({
            resizeMode: {
              mode: 'nw',
              startX: e.nativeEvent.pageX,
              startY: e.nativeEvent.pageY
            }
          });
        }}
      >
        <FontAwesomeIcon icon={faExpandAlt} style={{color: '#fff', fontSize: '17px', transform: 'scale(-1,1)'}} />
      </div>
      <div
        style={{
          top: 0,
          right: 0,
          transform: `translate(${16 + 7 * iconScale}px, -${16 + 7 * iconScale}px) scale(${iconScale})`,
          transition: 'transform 0.2s',
          position: 'absolute',
          width: '23px',
          height: '23px',
          cursor: 'ne-resize',
          background: 'rgba(84,114,208,1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(0,0,0,0.8)',
          filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
        }}
        onMouseDown={e => {
          e.stopPropagation();
          RedCanvas.ghostMode = true;
          this.setModes({
            resizeMode: {
              mode: 'ne',
              startX: e.nativeEvent.pageX,
              startY: e.nativeEvent.pageY
            }
          });
        }}
      >
        <FontAwesomeIcon icon={faExpandAlt} style={{color: '#fff', fontSize: '17px', transform: 'scale(1,1)'}} />
      </div>
      <div
        style={{
          bottom: 0,
          left: 0,
          transform: `translate(-${16 + 7 * iconScale}px, ${16 + 7 * iconScale}px) scale(${iconScale})`,
          transition: 'transform 0.2s',
          position: 'absolute',
          width: '23px',
          height: '23px',
          cursor: 'sw-resize',
          background: 'rgba(84,114,208,1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(0,0,0,0.8)',
          filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
        }}
        onMouseDown={e => {
          e.stopPropagation();
          RedCanvas.ghostMode = true;
          this.setModes({
            resizeMode: {
              mode: 'sw',
              startX: e.nativeEvent.pageX,
              startY: e.nativeEvent.pageY
            }
          });
        }}
      >
        <FontAwesomeIcon icon={faExpandAlt} style={{color: '#fff', fontSize: '17px', transform: 'scale(1,1)'}} />
      </div>
      <div
        style={{
          bottom: 0,
          right: 0,
          transform: `translate(${16 + 7 * iconScale}px, ${16 + 7 * iconScale}px) scale(${iconScale})`,
          transition: 'transform 0.2s',
          position: 'absolute',
          width: '23px',
          height: '23px',
          cursor: 'se-resize',
          background: 'rgba(84,114,208,1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(0,0,0,0.8)',
          filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
        }}
        onMouseDown={e => {
          e.stopPropagation();
          RedCanvas.ghostMode = true;
          this.setModes({
            resizeMode: {
              mode: 'se',
              startX: e.nativeEvent.pageX,
              startY: e.nativeEvent.pageY
            }
          });
        }}
      >
        <FontAwesomeIcon icon={faExpandAlt} style={{color: '#fff', fontSize: '17px', transform: 'scale(-1,1)'}} />
      </div>
      {/*  */}
      <div
        style={{
          top: '50%', left: 0, transform: `translate(-${16 + 7 * iconScale}px, -50%) scale(${iconScale})`,
          transition: 'transform 0.2s',
          position: 'absolute', width: '23px', height: '23px',
          cursor: 'w-resize',
          background: 'rgba(84,114,208,1)',
          display: activeSubData['fixRatioYn'] ? 'none' : 'flex',
          alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(0,0,0,0.8)',
          filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
        }}
        onMouseDown={e => {
          e.stopPropagation();
          RedCanvas.ghostMode = true;
          this.setModes({
            resizeMode: {
              mode: 'w',
              startX: e.nativeEvent.pageX,
              startY: e.nativeEvent.pageY
            }
          });
        }}
      >
        <FontAwesomeIcon icon={faArrowsAltH} style={{color: '#fff', fontSize: '17px', transform: 'scale(1,1)'}} />
      </div>
      <div
        style={{
          top: '50%', right: 0, transform: `translate(${16 + 7 * iconScale}px, -50%) scale(${iconScale})`,
          transition: 'transform 0.2s',
          position: 'absolute', width: '23px', height: '23px',
          cursor: 'e-resize',
          background: 'rgba(84,114,208,1)',
          display: activeSubData['fixRatioYn'] ? 'none' : 'flex',
          alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(0,0,0,0.8)',
          filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
        }}
        onMouseDown={e => {
          e.stopPropagation();
          RedCanvas.ghostMode = true;
          this.setModes({
            resizeMode: {
              mode: 'e',
              startX: e.nativeEvent.pageX,
              startY: e.nativeEvent.pageY
            }
          });
        }}
      >
        <FontAwesomeIcon icon={faArrowsAltH} style={{color: '#fff', fontSize: '17px', transform: 'scale(1,1)'}} />
      </div>
      <div
        style={{
          top: 0, left: '50%', transform: `translate(-50%, -${16 + 7 * iconScale}px) scale(${iconScale})`,
          transition: 'transform 0.2s',
          position: 'absolute', width: '23px', height: '23px',
          cursor: 'n-resize',
          background: 'rgba(84,114,208,1)',
          display: activeSubData['fixRatioYn'] ? 'none' : 'flex',
          alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(0,0,0,0.8)',
          filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
        }}
        onMouseDown={e => {
          e.stopPropagation();
          RedCanvas.ghostMode = true;
          this.setModes({
            resizeMode: {
              mode: 'n',
              startX: e.nativeEvent.pageX,
              startY: e.nativeEvent.pageY
            }
          });
        }}
      >
        <FontAwesomeIcon icon={faArrowsAltV} style={{color: '#fff', fontSize: '17px', transform: 'scale(1,1)'}} />
      </div>
      <div
        style={{
          bottom: 0, left: '50%', transform: `translate(-50%, ${16 + 7 * iconScale}px) scale(${iconScale})`,
          transition: 'transform 0.2s',
          position: 'absolute', width: '23px', height: '23px',
          cursor: 's-resize',
          background: 'rgba(84,114,208,1)',
          display: activeSubData['fixRatioYn'] ? 'none' : 'flex',
          alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(0,0,0,0.8)',
          filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
        }}
        onMouseDown={e => {
          e.stopPropagation();
          RedCanvas.ghostMode = true;
          this.setModes({
            resizeMode: {
              mode: 's',
              startX: e.nativeEvent.pageX,
              startY: e.nativeEvent.pageY
            }
          });
        }}
      >
        <FontAwesomeIcon icon={faArrowsAltV} style={{color: '#fff', fontSize: '17px', transform: 'scale(1,1)'}} />
      </div>
    </>
  </div> : '';

};
export default renderContainerEdit;
