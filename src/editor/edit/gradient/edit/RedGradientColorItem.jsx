/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import DataColor from "../../../data/DataColor.js";
import {ColorPicker} from "@easylogic/colorpicker";
import RedNumber from "../../../../core/RedNumber";
import RedSelect from "../../../../core/RedSelect";
import {faPlus, faThumbtack} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import GRADIENT_TYPE from "../../../../js/const/GRADIENT_TYPE.js";

let targetContext;
let targetColorData;
let targetRefBar;
let targetRange;
const HD_move = e => {
  // console.log(targetRefBar);
  if (targetRefBar.current) {
    const tX = e.pageX - targetRefBar.current.getBoundingClientRect().x;
    //TODO - FIXME 사이즈 자동으로 결정되게 변경해야함
    let percentX = (tX / (targetRefBar.current.clientWidth + 16) * 100);
    percentX = Math.max(Math.min(100, percentX), 0);
    if (targetColorData.rangeUnit === '%') {
      targetColorData[targetRange] = percentX;
    } else if (targetColorData.rangeUnit === 'px') {
      targetColorData[targetRange] = percentX / 100 * targetContext.props.rootComponent.state.canvasInfo['width'];
    } else if (targetColorData.rangeUnit === 'deg') {
      targetColorData[targetRange] = percentX / 100 * 360;
    }
    if (targetColorData['useRange']) {
      if (targetColorData['range'] > targetColorData['rangeEnd']) {
        let t0 = targetColorData['rangeEnd'];
        targetColorData['rangeEnd'] = targetColorData['range'];
        targetColorData['range'] = t0;
        if (targetRange === 'range') targetRange = 'rangeEnd';
        else targetRange = 'range';
      }
    }
    targetContext.props.rootComponent.updateRootState({});
    // console.log(tX);
  }
};
const HD_up = () => {
  targetContext.props.HD_sort(targetColorData);
  window.removeEventListener('mousemove', HD_move);
  window.removeEventListener('mouseup', HD_up);
  requestAnimationFrame(() => {
    targetContext.props.rootComponent.updateRootState({});
    targetContext = null;
    targetColorData = null;
    targetRefBar = null;
    targetRange = null;
  });
};
let startDragColorItem;
let emptyImage;

class RedGradientColorItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openColorPicker: false,
      openColorEndPicker: false,
      colorEndPicker: null,
      colorPicker: null
    };
    this.refBar = React.createRef();
    this.refColorPickerContainer = React.createRef();
    this.refColorEndPickerContainer = React.createRef();
  }

  handleDragStart(e) {
    if (!RedGradientColorItem.getDragInfo()) {
      RedGradientColorItem.clearDragInfo();
      startDragColorItem = this.props.colorData;
    } else {
      RedGradientColorItem.clearDragInfo();
    }
    if (!emptyImage) emptyImage = new Image();
    e.nativeEvent.dataTransfer.setDragImage(emptyImage, 0, 0);
    console.log(e);
  }

  handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    if (startDragColorItem && e.target.className === 'drop_area_color_item') this.setState({dragOverYn: false});
  }

  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    if (startDragColorItem) this.setState({dragOverYn: true});
  }

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    let t0 = {};
    if (startDragColorItem) {
      this.setState({dragOverYn: false});
      const colorList = this.props.rootComponent.state.activeSubData.colorList;
      const colorData = this.props.colorData;
      const dstIDX = colorList.indexOf(colorData);
      const startIDX = colorList.indexOf(startDragColorItem);
      colorList.splice(startIDX, 1);
      colorList.splice(dstIDX, 0, startDragColorItem);
      this.props.HD_active(dstIDX);
    }
    RedGradientColorItem.clearDragInfo();
    this.props.rootComponent.updateRootState(t0);
  }

  getIndex() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    const colorData = this.props.colorData;
    return activeSubData.colorList.indexOf(colorData);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    const canvasInfo = rootComponentState.canvasInfo;
    const colorData = this.props.colorData;
    const activeYn = this.props.activeYn;
    const colorInfo = colorData['color'];
    if (!colorData['useRange']) colorData['rangeEnd'] = colorData['range'];
    const unitList = activeSubData.type === GRADIENT_TYPE.CONIC || activeSubData.type === GRADIENT_TYPE.REPEAT_CONIC ? ['%', 'deg'] : ['px', '%'];
    return <div
      draggable={targetRefBar || this.state.numberDrag || (this.state.openColorPicker || this.state.openColorEndPicker) ? false : true}
      onDragStart={e => this.handleDragStart(e)}
      onDrop={e => this.handleDrop(e)}
      onDragOver={e => this.handleDragOver(e)}
      onDragEnter={e => this.handleDragEnter(e)}
      onDragLeave={e => this.handleDragLeave(e)}
      onDragEnd={() => {
        RedGradientColorItem.clearDragInfo();
        this.setState({dragOverYn: false});
        this.props.rootComponent.updateRootState({});
      }}
    >
      <button
        style={style.add}
        onClick={() => {
          let prevColorData = activeSubData['colorList'][this.getIndex() - 1];
          let currentRange = colorData['range'];
          let newRange = currentRange;
          let newRangeEnd = currentRange;
          if (prevColorData && prevColorData['xUnit'] === colorData['xUnit']) newRange = currentRange - (currentRange - prevColorData['range']) * 0.5;
          const newColorData = new DataColor(
            colorData['color'],
            newRange,
            colorData['rangeUnit'],
            colorData['useDivide'],
            colorData['useDivideEnd'],
            colorData['useRange'],
            newRangeEnd
          );
          activeSubData['colorList'].splice(this.getIndex(), 0, newColorData);
          this.props.HD_active(this.getIndex());
        }}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
      <div
        style={{
          margin: '3px 0px',
          cursor: 'pointer',
          border: activeYn ? '1px solid #5e7ade' : '1px solid rgba(255,255,255,0.1)',
          background: activeYn ? 'linear-gradient(#5e7ade, #3a497d)' : 'rgba(255,255,255,0.1)',
          borderRadius: '4px'
        }}
        onClick={() => this.props.HD_active(this.getIndex())}
        onMouseDown={() => this.props.HD_active(this.getIndex())}
      >

        <div style={{display: 'flex', padding: '4px 4px 0px'}}>
          <div>
            <div style={{whiteSpace: 'nowrap', display: 'flex', flexDirection: 'row'}}>
              <div
                style={{
                  width: '24px', height: '24px', margin: '1px 3px 1px',
                  textAlign: 'center'
                }}
                className={'transparent_checker'}
              >
                <div style={{
                  background: colorInfo,
                  width: '24px', height: '24px',
                  borderRadius: '4px', border: '1px solid #000',
                  marginRight: '10px',
                  textAlign: 'center',
                }}
                     onClick={() => {
                       if (!this.state.colorPicker) {
                         this.state.colorPicker = new ColorPicker({
                           type: "sketch",
                           position: 'inline',
                           color: colorData['color'],
                           container: this.refColorPickerContainer.current,
                           onChange: color => {
                             targetColorData['color'] = color;
                             targetContext.props.rootComponent.updateRootState({
                               activeSubData: targetContext.props.rootComponent.state.activeSubData
                             });
                           }
                         });
                       }
                       targetContext = this;
                       targetColorData = colorData;
                       // this.state.colorPicker.setOption({color: colorData['color']});
                       this.setState({openColorPicker: true, openColorEndPicker: false});
                       requestAnimationFrame(() => {
                         this.state.colorPicker.initColorWithoutChangeEvent(colorData['color']);
                         const pickerContainerNode = this.refColorPickerContainer.current.parentNode;
                         const itemNode = pickerContainerNode.parentNode.parentNode;
                         const pickerContainerRect = pickerContainerNode.getBoundingClientRect();
                         const itemRect = itemNode.getBoundingClientRect();
                         const t0 = itemRect.bottom - pickerContainerRect.height - pickerContainerRect.top;
                         // console.log(t0)
                         pickerContainerNode.style.transform = (t0) > 0 ? `translate(-50% , ${t0}px)` : 'translate(-50% , 0%)';
                       });
                     }}
                />
                <FontAwesomeIcon
                  icon={faThumbtack} style={{
                  filter: colorData.useDivide ? '' : 'invert(1.0)'
                }}
                  onClick={() => {
                    colorData['useDivide'] = !colorData['useDivide'];
                    rootComponent.updateRootState({});
                  }}
                />
              </div>
              <div
                style={{
                  width: '24px', height: '24px', margin: '1px 3px 1px',
                  display: colorData.useRange ? 'block' : 'none',
                  textAlign: 'center'
                }}
                className={'transparent_checker'}
              >
                <div style={{
                  background: colorData['colorEnd'],
                  width: '24px', height: '24px',
                  borderRadius: '4px', border: '1px solid #000',
                  marginRight: '10px'
                }}
                     onClick={(e) => {
                       if (!this.state.colorEndPicker) {
                         this.state.colorEndPicker = new ColorPicker({
                           type: "sketch",
                           position: 'inline',
                           color: colorData['colorEnd'],
                           container: this.refColorEndPickerContainer.current,
                           onChange: color => {
                             targetColorData['colorEnd'] = color;
                             targetContext.props.rootComponent.updateRootState({
                               activeSubData: targetContext.props.rootComponent.state.activeSubData
                             });
                           }
                         });
                       }
                       targetContext = this;
                       targetColorData = colorData;
                       // this.state.colorEndPicker.setOption({color: colorData['colorEnd']});
                       this.setState({openColorEndPicker: true, openColorPicker: false});
                       requestAnimationFrame(() => {
                         this.state.colorEndPicker.initColorWithoutChangeEvent(colorData['colorEnd']);
                         const pickerContainerNode = this.refColorEndPickerContainer.current.parentNode;
                         const itemNode = pickerContainerNode.parentNode.parentNode;
                         const pickerContainerRect = pickerContainerNode.getBoundingClientRect();
                         const itemRect = itemNode.getBoundingClientRect();
                         const t0 = itemRect.bottom - pickerContainerRect.height - pickerContainerRect.top;
                         // console.log(t0)
                         pickerContainerNode.style.transform = (t0) > 0 ? `translate(-50% , ${t0}px)` : 'translate(-50% , 0%)';
                       });
                     }}
                />
                <FontAwesomeIcon
                  icon={faThumbtack} style={{
                  filter: colorData.useDivideEnd ? '' : 'invert(1.0)'
                }}
                  onClick={() => {
                    colorData['useDivideEnd'] = !colorData['useDivideEnd'];
                    rootComponent.updateRootState({});
                  }}
                />
              </div>
            </div>
          </div>
          <div>
            {/* TODO - 단위모델 변경 처리*/}
            <div style={{whiteSpace: 'nowrap'}}>

              <RedNumber
                width={colorData['useRange'] ? '90px' : '210px'}
                value={colorData['range'] || 0}
                HD_onInput={e => {
                  this.state.numberDrag = true;
                  colorData['range'] = +e.target.value;
                  let i = activeSubData.colorList.length;
                  while (i--) {
                    if (activeSubData.colorList[i] === colorData) this.props.HD_active(this.getIndex());
                  }
                  rootComponent.updateRootState({});
                }}
                HD_blur={e => {
                  this.state.numberDrag = false;
                  // this.props.HD_sort(e);
                  this.props.HD_active(this.getIndex());
                }}
              />
              {
                colorData['useRange'] ? <RedNumber
                  width={'90px'}
                  value={colorData['rangeEnd'] || 0}
                  HD_onInput={e => {
                    this.state.numberDrag = true;
                    colorData['rangeEnd'] = +e.target.value;
                    let i = activeSubData.colorList.length;
                    while (i--) {
                      if (activeSubData.colorList[i] === colorData) this.props.HD_active(this.getIndex());
                    }
                    rootComponent.updateRootState({});
                  }}
                  HD_blur={e => {
                    // this.props.HD_sort(e);
                    this.state.numberDrag = false;
                    this.props.HD_active(this.getIndex());
                  }}
                /> : ''
              }

              <RedSelect value={colorData['rangeUnit']} options={unitList} HD_change={e => {
                let tUnit = e.target.value;
                if (colorData['rangeUnit'] !== tUnit) {
                  if (colorData['rangeUnit'] === 'px') {
                    if (tUnit === '%') {
                      colorData['range'] = colorData['range'] / canvasInfo['width'] * 100;
                      colorData['rangeEnd'] = colorData['rangeEnd'] / canvasInfo['width'] * 100;
                    } else if (tUnit === 'deg') {
                      colorData['range'] = 360 * colorData['range'] / canvasInfo['width'];
                      colorData['rangeEnd'] = 360 * colorData['rangeEnd'] / canvasInfo['width'];
                    }
                  } else if (colorData['rangeUnit'] === '%') {
                    if (tUnit === 'px') {
                      colorData['range'] = canvasInfo['width'] * colorData['range'] / 100;
                      colorData['rangeEnd'] = canvasInfo['width'] * colorData['rangeEnd'] / 100;
                    } else if (tUnit === 'deg') {
                      colorData['range'] = 360 * colorData['range'] / 100;
                      colorData['rangeEnd'] = 360 * colorData['rangeEnd'] / 100;
                    }
                  } else if (colorData['rangeUnit'] === 'deg') {
                    if (tUnit === 'px') {
                      colorData['range'] = canvasInfo['width'] * colorData['range'] / 360;
                      colorData['rangeEnd'] = canvasInfo['width'] * colorData['rangeEnd'] / 360;
                    } else if (tUnit === '%') {
                      colorData['range'] = colorData['range'] / 360 * 100;
                      colorData['rangeEnd'] = colorData['rangeEnd'] / 360 * 100;
                    }
                  }
                }
                colorData['rangeUnit'] = tUnit;
                rootComponent.updateRootState({});
              }} />
              <button
                style={{...style.del, display: activeSubData.colorList.length < 2 ? 'none' : 'inline-block'}}
                onClick={() => {
                  activeSubData.colorList.splice(this.getIndex(), 1);
                  rootComponent.updateRootState({});
                }}
              >Del
              </button>
            </div>
            <div style={{display: 'flex', alignItems: 'center', margin: '5px 0px'}}>
              {colorData['useRange'] ? <div style={{...style.lock, marginLeft: '5px'}}
                                            onClick={() => {
                                              colorData['colorEnd'] = colorData['color'];
                                              rootComponent.updateRootState({});
                                            }}
              >Copy L to R</div> : ''}
              {colorData['useRange'] ? <div style={{...style.lock, marginLeft: '5px'}}
                                            onClick={() => {
                                              colorData['color'] = colorData['colorEnd'];
                                              rootComponent.updateRootState({});
                                            }}
              >Copy R to L</div> : ''}
              <label
                style={style.lock}
                onClick={(e) => {
                  if (e.target.type === 'checkbox') {
                    colorData['useRange'] = !colorData['useRange'];
                    if (colorData['colorEnd'] === undefined) colorData['colorEnd'] = colorData['color'];
                    rootComponent.updateRootState({});
                  }
                }}
              >useRange <input type={'checkbox'} checked={colorData['useRange']}
                               style={{border: '1px solid #fff', marginLeft: '5px'}} />
              </label>


              {/*<div style={{display: 'inline-block', marginLeft: '5px'}}>{colorData['color']}</div>*/}
            </div>

          </div>
        </div>
        <div style={{margin: '8px 8px', alignItems: 'center'}}>
          <div style={style.line} ref={this.refBar} />
          <div style={{
            ...style.ball,
            left: `${colorData['rangeUnit'] === 'deg' ? colorData['range'] / 360 * 100 : colorData['rangeUnit'] === 'px' ? colorData['range'] / canvasInfo['width'] * 100 : colorData['range']}%`,
            background: activeYn ? '#5e7ade' : '#fff'
          }}
               onMouseDown={(e) => {
                 targetContext = this;
                 targetColorData = colorData;
                 targetRefBar = this.refBar;
                 targetRange = 'range';
                 window.addEventListener('mousemove', HD_move);
                 window.addEventListener('mouseup', HD_up);
               }}
          >s
          </div>
          {
            colorData.useRange ? <div style={{
              ...style.ball,
              left: `${colorData['rangeUnit'] === 'deg' ? colorData['rangeEnd'] / 360 * 100 : colorData['rangeUnit'] === 'px' ? colorData['rangeEnd'] / canvasInfo['width'] * 100 : colorData['rangeEnd']}%`,
              background: activeYn ? '#5e7ade' : '#fff'
            }}
                                      onMouseDown={() => {
                                        targetContext = this;
                                        targetColorData = colorData;
                                        targetRefBar = this.refBar;
                                        targetRange = 'rangeEnd';
                                        window.addEventListener('mousemove', HD_move);
                                        window.addEventListener('mouseup', HD_up);
                                      }}
            >e</div> : ''
          }
        </div>

        <div style={{...style.colorPicker, display: this.state.openColorPicker ? 'block' : 'none'}}>
          <div ref={this.refColorPickerContainer} />
          <div style={style.complete} onClick={() => this.setState({openColorPicker: null})}>완료</div>
        </div>
        <div style={{...style.colorPicker, display: this.state.openColorEndPicker ? 'block' : 'none'}}>
          <div ref={this.refColorEndPickerContainer} />
          <div style={style.complete} onClick={() => this.setState({openColorEndPicker: null})}>완료</div>
        </div>

      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          zIndex: 1,
          top: 0, left: 0, right: 0, overflow: 'hidden',
          bottom: this.state.dragOverYn ? 0 : '100%',
          opacity: this.state.dragOverYn ? 1 : 0,
          transition: 'opacity 0.2s',
          background: 'rgb(39,133,196,0.75)',
          borderRadius: '4px'
        }}>
        <div style={{background: '#fff', color: '#000', fontSize: '12px', borderRadius: '5px', padding: '3px 12px',}}>
          drop here
        </div>
        <div
          className={'drop_area_color_item'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '100%',
          }} />
      </div>
    </div>;
  }
}

RedGradientColorItem.getDragInfo = () => startDragColorItem;
RedGradientColorItem.clearDragInfo = () => {
  startDragColorItem = null;
};
export default RedGradientColorItem;
const style = {
  container: {
    paddingTop: '10px',
  },
  colorPicker: {
    zIndex: 1, position: 'fixed', top: 0, left: '50%', transform: 'translate(-50% , 0%)',
    boxShadow: '0px 0px 16px rgba(0,0,0,0.5)',
    background: '#fff',
    borderRadius: '8px',
    overflow: 'hidden'
  },
  complete: {padding: '4px', background: '#5e7ade', cursor: 'pointer', textAlign: 'center'},
  line: {
    height: '5px',
    background: 'rgba(255,255,255,0.5)',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 0px 5px inset',
    border: '1px solid rgb(31, 31, 31)'
  },
  add: {
    position: 'absolute',
    width: '20px',
    height: '20px',
    lineHeight: 1,
    top: 0,
    right: 0,
    background: '#5e7ade',
    borderRadius: '50%',
    color: '#fff',
    fontSize: '8px',
    border: '1px solid #000',
    transform: `translate(-3px,-9px)`,
    cursor: 'pointer',
    zIndex: 1,
    boxShadow: '0px 0px 10px rgba(0,0,0,0.46)'
  },
  ball: {
    position: 'absolute',
    height: '20px',
    top: '50%',
    borderRadius: '50%',
    width: '20px',
    border: '1px solid #000',
    transform: `translate(-50%,-50%)`,
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'background 0.2s, top 0.2s, bottom 0.2s',
    boxShadow: '0px 0px 10px rgba(0,0,0,0.46)'
  },
  del: {
    fontSize: '11px',
    color: '#fff',
    background: '#5e7ade',
    outline: 'none',
    border: '1px solid #000',
    borderRadius: '6px',
    height: '25px',
    marginLeft: '5px',
    cursor: 'pointer'
  },
  lock: {
    marginLeft: '5px',
    display: 'flex',
    padding: '0px 8px',
    alignItems: 'center',
    fontSize: '11px',
    color: '#fff',
    background: 'linear-gradient(rgb(94, 122, 222), rgb(58, 73, 125))',
    outline: 'none',
    border: '1px solid #000',
    borderRadius: '4px',
    height: '23px',
    cursor: 'pointer'
  }
};