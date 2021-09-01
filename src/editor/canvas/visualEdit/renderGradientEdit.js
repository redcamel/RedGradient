import ACTIVE_FRAME_KEY from "../../../js/const/ACTIVE_FRAME_KEY";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowsAlt, faArrowsAltH, faArrowsAltV, faExpandAlt} from "@fortawesome/free-solid-svg-icons";
import GRADIENT_TYPE from "../../../js/const/GRADIENT_TYPE";
import ENDING_SHAPE_TYPE from "../../../js/const/ENDING_SHAPE_TYPE";
import RedCanvas from "../RedCanvas";
import RedGradientDegreeEdit2 from "../../edit/gradient/edit/RedGradientDegreeEdit2";


const renderGradientEdit = function (rootComponentState, activeSubData, canvasInfo, appState) {
  const activeSubDataPosition = activeSubData['position'];
  const activeSubDataAt = activeSubData['at'];
  const activeSubDataSize = activeSubData['size'];
  console.log('~~~', appState);

  let cX = this.state.editCanvasOnly ? 0 : canvasInfo['left'];
  let cY = this.state.editCanvasOnly ? 0 : canvasInfo['top'];
  if(appState.activeFrameKey!=='main' && !this.state.editCanvasOnly){
    cX+= appState['main']['canvasInfo']['left']
    cY+= appState['main']['canvasInfo']['top']
  }
  const borderW = canvasInfo['border_width_mergeMode'] ? canvasInfo['border_width'] * 2 : (canvasInfo['border_width_split'][1] + canvasInfo['border_width_split'][3]);
  const borderH = canvasInfo['border_width_mergeMode'] ? canvasInfo['border_width'] * 2 : (canvasInfo['border_width_split'][0] + canvasInfo['border_width_split'][2]);
  const borderX = canvasInfo['border_width_mergeMode'] ? canvasInfo['border_width'] : canvasInfo['border_width_split'][3];
  const borderY = canvasInfo['border_width_mergeMode'] ? canvasInfo['border_width'] : canvasInfo['border_width_split'][0];
  if (rootComponentState['key'] !== ACTIVE_FRAME_KEY.MAIN && !this.state.editCanvasOnly) {

    const mainCanvasInfo = appState[ACTIVE_FRAME_KEY.MAIN]['canvasInfo'];
    const borderW = mainCanvasInfo['border_width_mergeMode'] ? mainCanvasInfo['border_width'] : (mainCanvasInfo['border_width_split'][1] + mainCanvasInfo['border_width_split'][3]);
    const borderH = mainCanvasInfo['border_width_mergeMode'] ? mainCanvasInfo['border_width'] : (mainCanvasInfo['border_width_split'][0] + mainCanvasInfo['border_width_split'][2]);
    cX += borderW;
    cY += borderH;

  }
  const layoutSize = {
    w: activeSubDataSize['wUnit'] === '%' ? (canvasInfo['width'] - borderW) * activeSubDataSize['w'] / 100 : activeSubDataSize['w'] - borderW,
    h: activeSubDataSize['hUnit'] === '%' ? (canvasInfo['height'] - borderH) * activeSubDataSize['h'] / 100 : activeSubDataSize['h'] - borderH,
  };
  layoutSize['x'] = (activeSubDataPosition['xUnit'] === '%' ? (canvasInfo.width - layoutSize.w - borderW) * (activeSubDataPosition['x'] / 100) : activeSubDataPosition['x']) + borderX;
  layoutSize['y'] = (activeSubDataPosition['yUnit'] === '%' ? (canvasInfo.height - layoutSize.h - borderH) * (activeSubDataPosition['y'] / 100) : activeSubDataPosition['y']) + borderY;

  const lX = activeSubDataAt['xUnit'] === 'px' ? `${activeSubDataAt['x'] - borderX}${activeSubDataAt['xUnit']}` : `${layoutSize['w'] * activeSubDataAt['x'] / 100}px`;
  const lY = activeSubDataAt['yUnit'] === 'px' ? `${activeSubDataAt['y'] - borderY}${activeSubDataAt['yUnit']}` : `${layoutSize['h'] * activeSubDataAt['y'] / 100}px`;
  if (RedCanvas.ghostMode && !RedCanvas.ghostSize) RedCanvas.ghostSize = {...layoutSize};
  const iconScale = Math.min(1, 1 / this.state.canvasViewScale);
  return <>
    {
      <div
        style={{
          position: 'absolute',
          left: `${RedCanvas.ghostSize ? RedCanvas.ghostSize['x'] + cX : 0}px`,
          top: `${RedCanvas.ghostSize ? RedCanvas.ghostSize['y'] + cY : 0}px`,
          width: `${RedCanvas.ghostSize ? RedCanvas.ghostSize['w'] : 0}px`,
          height: `${RedCanvas.ghostSize ? RedCanvas.ghostSize['h'] : 0}px`,
          border: '1px dashed #ff0000',
          outline: '1px dashed rgba(255,255,255,0.75)',
          background: 'linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(0,0,0,0.1) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(0,0,0,0.1) 75%), linear-gradient(-45deg, transparent 75%, rgba(0,0,0,0.1) 75%),rgba(255,0,0,0.2)',
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 z0px, 10px -10px, -10px 0',
          opacity: RedCanvas.ghostMode ? 1 : 0,
          transition: 'opacity 0.2s',
          color: '#000'
        }}
      />
    }
    {
      this.state.layerSizeView ? <div
        style={{
          zIndex: 1,
          position: 'absolute',
          left: `${layoutSize['x'] + cX}px`,
          top: `${layoutSize['y'] + cY}px`,
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
          display: 'flex', alignItems: 'center', justifyContent: 'center',
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
              startValueX: activeSubData['position']['x'],
              startValueY: activeSubData['position']['y'],
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
          display: 'flex', alignItems: 'center', justifyContent: 'center',
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
              startValueX: activeSubData['position']['x'],
              startValueY: activeSubData['position']['y'],
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
          display: 'flex', alignItems: 'center', justifyContent: 'center',
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
              startValueX: activeSubData['position']['x'],
              startValueY: activeSubData['position']['y'],
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
          display: 'flex', alignItems: 'center', justifyContent: 'center',
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
              startValueX: activeSubData['position']['x'],
              startValueY: activeSubData['position']['y'],
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
          position: 'absolute', width: '30px', height: '30px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'move',
          border: '1px solid #5e7ade', borderRadius: '50%',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.3)',
          background: '#fff'
        }} onMouseDown={e => {
          e.stopPropagation();
          RedCanvas.ghostMode = true;
          this.setModes({
            positionMode: {
              mode: 'all',
              startValueX: activeSubData['position']['x'],
              startValueY: activeSubData['position']['y'],
              startX: e.nativeEvent.pageX,
              startY: e.nativeEvent.pageY
            }
          });
        }}>
          <FontAwesomeIcon icon={faArrowsAlt} style={{fontSize: '17px', transform: 'rotate(-90deg)'}} />
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
              background: 'rgba(255,255,255,0.75)',
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
            <FontAwesomeIcon icon={faExpandAlt} style={{fontSize: '17px', transform: 'scale(-1,1)'}} />
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
              background: 'rgba(255,255,255,0.75)',
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
            <FontAwesomeIcon icon={faExpandAlt} style={{fontSize: '17px', transform: 'scale(1,1)'}} />
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
              background: 'rgba(255,255,255,0.75)',
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
            <FontAwesomeIcon icon={faExpandAlt} style={{fontSize: '17px', transform: 'scale(1,1)'}} />
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
              background: 'rgba(255,255,255,0.75)',
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
            <FontAwesomeIcon icon={faExpandAlt} style={{fontSize: '17px', transform: 'scale(-1,1)'}} />
          </div>
          {/*  */}
          <div
            style={{
              top: '50%', left: 0, transform: `translate(-${16 + 7 * iconScale}px, -50%) scale(${iconScale})`,
              transition: 'transform 0.2s',
              position: 'absolute', width: '23px', height: '23px',
              cursor: 'w-resize',
              background: 'rgba(255,255,255,0.75)',
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
            <FontAwesomeIcon icon={faArrowsAltH} style={{fontSize: '17px', transform: 'scale(1,1)'}} />
          </div>
          <div
            style={{
              top: '50%', right: 0, transform: `translate(${16 + 7 * iconScale}px, -50%) scale(${iconScale})`,
              transition: 'transform 0.2s',
              position: 'absolute', width: '23px', height: '23px',
              cursor: 'e-resize',
              background: 'rgba(255,255,255,0.75)',
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
            <FontAwesomeIcon icon={faArrowsAltH} style={{fontSize: '17px', transform: 'scale(1,1)'}} />
          </div>
          <div
            style={{
              top: 0, left: '50%', transform: `translate(-50%, -${16 + 7 * iconScale}px) scale(${iconScale})`,
              transition: 'transform 0.2s',
              position: 'absolute', width: '23px', height: '23px',
              cursor: 'n-resize',
              background: 'rgba(255,255,255,0.75)',
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
            <FontAwesomeIcon icon={faArrowsAltV} style={{fontSize: '17px', transform: 'scale(1,1)'}} />
          </div>
          <div
            style={{
              bottom: 0, left: '50%', transform: `translate(-50%, ${16 + 7 * iconScale}px) scale(${iconScale})`,
              transition: 'transform 0.2s',
              position: 'absolute', width: '23px', height: '23px',
              cursor: 's-resize',
              background: 'rgba(255,255,255,0.75)',
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
            <FontAwesomeIcon icon={faArrowsAltV} style={{fontSize: '17px', transform: 'scale(1,1)'}} />
          </div>
        </>


        {activeSubData['title']}
        {
          activeSubData['type'] === GRADIENT_TYPE.RADIAL ||
          activeSubData['type'] === GRADIENT_TYPE.REPEAT_RADIAL ||
          activeSubData['type'] === GRADIENT_TYPE.CONIC ||
          activeSubData['type'] === GRADIENT_TYPE.REPEAT_CONIC
            ? <>
              <div
                style={{
                  position: 'absolute',
                  left: lX,
                  top: lY,
                  width: `50px`,
                  height: activeSubData['typeEndingShape'] === ENDING_SHAPE_TYPE.CIRCLE ? '50px' : `${50 * layoutSize['h'] / layoutSize['w']}px`,
                  border: '2px dashed rgba(0,0,0,0.5)',
                  borderRadius: '50%',
                  transform: 'translate(-50%,-50%)',
                  color: '#000',
                  cursor: 'move'
                }}
                onMouseDown={e => {
                  e.stopPropagation();
                  this.setModes({
                    atMode: {
                      startValueX: activeSubData['at']['x'],
                      startValueY: activeSubData['at']['y'],
                      startX: e.nativeEvent.pageX, startY: e.nativeEvent.pageY
                    }
                  });
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: `10px`,
                    height: `10px`,
                    borderRadius: '50%',
                    background: '#fff',
                    border: '2px solid red',
                    filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,5)',
                    transform: 'translate(-50%,-50%)',
                    color: '#000'
                  }}
                />
              </div>
            </> : ''
        }
        {
          activeSubData['type'] === GRADIENT_TYPE.RADIAL ||
          activeSubData['type'] === GRADIENT_TYPE.REPEAT_RADIAL
            ? '' : <>
              <canvas
                ref={this.refDegreeCanvas}
                width={250 * this.state.canvasViewScale}
                height={250 * this.state.canvasViewScale}
                style={{
                  top: '50%', left: '50%', transform: `translate(-50%, -50%)  rotate(0deg) `,
                  width: `${250 * this.state.canvasViewScale}px`, height: `${250 * this.state.canvasViewScale}px`,
                  position: 'absolute', borderRadius: '50%', lineHeight: 1,
                  background: 'rgba(255,255,255,0.25)',
                  display: this.state.degreeMode ? 'block' : 'none',
                }}
              />
              <div
                ref={this.refDegree}
                style={{
                  top: '50%', left: '50%', transform: `translate(-50%, -50%) rotate(0deg) `,
                  width: `${50}px`, height: `${50}px`,
                  position: 'absolute', borderRadius: '50%', lineHeight: 1,
                  display: this.state.degreeMode ? 'block' : 'none',
                  background: 'rgba(255,255,255,0.4)'
                }}
              >

                <button
                  style={{
                    display: 'inline-block',
                    lineHeight: 1,
                    width: `${50}px`, height: `${50}px`,
                    border: '1px solid #5e7ade',
                    borderRadius: '50%',
                    outline: 'none',
                    cursor: 'pointer',
                    fontSize: '11px'
                  }}
                >
                  <div>{(+activeSubData['deg']).toFixed(1)}<br /><span style={{fontSize: '10px'}}>deg</span></div>
                  <div style={{
                    lineHeight: 1,
                    width: '10px', height: '10px',
                    border: '1px solid #5e7ade',
                    borderRadius: '50%',
                    position: 'absolute',
                    transform: 'translate(-50%,-50%)',
                    top: `calc(50% + ${Math.sin(Math.PI / 180 * (activeSubData['deg'] - 90)) * 20}px)`,
                    left: `calc(50% + ${Math.cos(Math.PI / 180 * (activeSubData['deg'] - 90)) * 20}px)`
                  }} />
                </button>
              </div>
              <div
                style={{
                  top: 0,
                  left: 0,
                  transform: `scale(${iconScale})`,
                  transition: 'transform 0.2s',
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // border: '1px solid rgba(0,0,0,0.8)',
                  filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
                  cursor: 'pointer',
                }}
                onMouseDown={e => {
                  e.stopPropagation();
                }}
              >
                <div style={{
                  position: 'absolute',
                  transform: 'translate(calc(-50% - 12px),calc(-100% - 5px))'
                }}>
                  <RedGradientDegreeEdit2 rootComponent={this.props.rootComponent} />
                </div>

              </div>
              <div
                style={{
                  top: 0,
                  right: 0,
                  transform: `scale(${iconScale})`,
                  transition: 'transform 0.2s',
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
                  cursor: 'pointer',
                }}
                onMouseDown={e => {
                  e.stopPropagation();
                }}
              >
                <div style={{
                  position: 'absolute',
                  transform: 'translate(calc(50% + 12px),calc(-100% - 5px))'
                }}>
                  <RedGradientDegreeEdit2 rootComponent={this.props.rootComponent} invert={true} />
                </div>
              </div>
              <div
                style={{
                  bottom: 0,
                  right: 0,
                  transform: `scale(${iconScale})`,
                  transition: 'transform 0.2s',
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
                  cursor: 'pointer',
                }}
                onMouseDown={e => {
                  e.stopPropagation();
                }}
              >
                <div style={{
                  position: 'absolute',
                  transform: 'translate(calc(50% + 12px),calc(100% + 5px))'
                }}>
                  <RedGradientDegreeEdit2 rootComponent={this.props.rootComponent} invert={true} />
                </div>
              </div>
              <div
                style={{
                  bottom: 0,
                  left: 0,
                  transform: `scale(${iconScale})`,
                  transition: 'transform 0.2s',
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  filter: 'drop-shadow(0px 0px 5px rgba(0,0,0,0.3)',
                  cursor: 'pointer',
                }}
                onMouseDown={e => {
                  e.stopPropagation();

                }}
              >
                <div style={{
                  position: 'absolute',
                  transform: 'translate(calc(-50% - 12px),calc(100% + 5px))'
                }}>
                  <RedGradientDegreeEdit2 rootComponent={this.props.rootComponent} />
                </div>
              </div>
            </>
        }
        <div style={{
          position: 'absolute',
          top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          display: this.state.positionMode || this.state.resizeMode ? 'block' : 'none',
          background: 'rgba(255,255,255,0.8)',
          padding: '10px',
          borderRadius: '8px',
          whiteSpace: 'nowrap',
          border: '1px solid rgba(0,0,0,0.5)'
        }}>
          <div>w : {(+activeSubData['size']['w']).toFixed(1)}{activeSubData['size']['wUnit']} / h
            : {(+activeSubData['size']['h']).toFixed(1)}{activeSubData['size']['hUnit']}</div>
          <div>x : {(+activeSubData['position']['x']).toFixed(1)}{activeSubData['position']['xUnit']} / y
            : {(+activeSubData['position']['y']).toFixed(1)}{activeSubData['position']['yUnit']}</div>
        </div>
      </div> : ''
    }
  </>;
};
export default renderGradientEdit;
