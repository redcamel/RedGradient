/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedTitle from "../../../core/RedTitle";
import RedCanvasFilterList from "./filter/RedCanvasFilterList.jsx";
import RedCanvasBoxSizingEdit from "./property/RedCanvasBoxSizingEdit.jsx";
import RedCanvasSizeEdit from "./property/RedCanvasSizeEdit.jsx";
import RED_CANVAS_PRESET from "../../../RED_CANVAS_PRESET.js";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDesktop, faMobileAlt} from "@fortawesome/free-solid-svg-icons";
import {ColorPicker} from "@easylogic/colorpicker";
import RedCanvasBoxPositionEdit from "./property/RedCanvasBoxPositionEdit";
import ACTIVE_FRAME_KEY from "../../ACTIVE_FRAME_KEY";

let colorPicker

class RedContainerEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      layerSizeView: true,
      canvasBgColorPickerOpenYn: false
    };
    this.refColorPickerContainer = React.createRef();
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo
    return <div>
      <RedTitle title={'Container Property'}/>
      <div style={style.container}>
        <RedCanvasSizeEdit rootComponent={rootComponent} canvasComponent={this}/>
        {rootComponentState.key === ACTIVE_FRAME_KEY.MAIN ? '' :
          <RedCanvasBoxPositionEdit rootComponent={rootComponent} canvasComponent={this}/>}
        <div style={style.divide}/>
        <div style={{display: 'inline-block', margin: '8px 10px 8px 10px'}}>
          {
            RED_CANVAS_PRESET.map(v => {
              return <button
                style={style.presetButton}
                onClick={() => {
                  canvasInfo.width = v.width;
                  canvasInfo.height = v.height;
                  rootComponent.updateRootState({});
                }}
              >
                <div><FontAwesomeIcon
                  icon={v['type'] === 'mobile' ? faMobileAlt : faDesktop}/> {v['title']}({v['width']}x{v['height']})
                </div>
              </button>;
            })
          }
        </div>
        <div style={style.divide}/>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div className={'ui_subTitle'}>background</div>
          <div
            className={rootComponentState.bgColor === 'transparent' ? 'transparent_checker' : ''}
            style={{
              display: 'inline-block',
              width: '25px',
              height: '25px',
              background: rootComponentState.bgColor === 'transparent' ? '' : rootComponentState.bgColor,
              borderRadius: '4px',
              border: '1px solid #000',
              cursor: 'pointer'
            }}
            onClick={() => {
              this.setState({canvasBgColorPickerOpenYn: true});
              if (!colorPicker) {
                colorPicker = new ColorPicker({
                  type: "sketch",
                  position: 'inline',
                  color: rootComponentState.bgColor,
                  container: this.refColorPickerContainer.current,
                  onChange: color => rootComponent.updateRootState({bgColor: color})
                });
              }
              requestAnimationFrame(() => {
                colorPicker.initColorWithoutChangeEvent(rootComponentState.bgColor);
              })
            }}
          />

          <div style={{
            zIndex: 2, position: 'absolute', top: 0, right: 0, transform: 'translate(-32px , 0px)',
            boxShadow: '0px 0px 16px rgba(0,0,0,0.16)',
            background: '#fff',
            borderRadius: '8px',
            overflow: 'hidden',
            display: this.state.canvasBgColorPickerOpenYn ? 'block' : 'none'
          }}>
            <div ref={this.refColorPickerContainer}/>
            <div
              style={{padding: '4px', background: '#5e7ade', cursor: 'pointer', textAlign: 'center'}}
              onClick={() => {
                this.setState({canvasBgColorPickerOpenYn: null});
              }}
            >완료
            </div>
          </div>

        </div>
        <div style={style.divide}/>
        <RedCanvasBoxSizingEdit rootComponent={rootComponent}/>
        <div style={style.divide}/>
        <RedCanvasFilterList rootComponent={rootComponent}/>
        <div style={style.divide}/>
      </div>
    </div>;
  }
}

export default RedContainerEdit;
const style = {
  container: {
    width: '360px',
    padding: '4px'
  },
  divide: {
    margin: '5px 0px',
    height: '2px',
    background: '#4e4e4e',
    borderTop: '1px solid #000'
  },
  mode: {
    padding: '2px 5px',
    cursor: 'pointer',
  },
  canvasResizer: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 2,
    display: 'flex',
  },
  presetButton: {
    background: 'linear-gradient(rgb(84, 84, 84), rgb(64, 63, 63))',
    border: '1px solid rgb(31, 31, 31)',
    outline: 'none',
    color: '#fff',
    fontSize: '11px',
    padding: '4px 8px',
    borderRadius: '4px',
    margin: '1px',
    cursor: 'pointer',
    boxShadow: `rgba(0, 0, 0, 0.25) 1px 1px 1px`
  }
};
