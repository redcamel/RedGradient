/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import {ColorPicker} from '@easylogic/colorpicker';
import '@easylogic/colorpicker/dist/colorpicker.css';
import React from "react";

let colorPicker;

function drawCanvasEditUI() {
  const rootComponent = this.props.rootComponent;
  const appComponent = this.props.appComponent;
  const rootComponentState2 = appComponent.state;
  return <div>
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <div className={'ui_subTitle'}>background</div>
      <div
        className={rootComponentState2.bgColor === 'transparent' ? 'transparent_checker' : ''}
        style={{
          display: 'inline-block',
          width: '25px',
          height: '25px',
          background: rootComponentState2.bgColor === 'transparent' ? '' : rootComponentState2.bgColor,
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
              color: rootComponentState2.bgColor,
              container: this.refColorPickerContainer.current,
              onChange: color => {
                this.state.useMove = false
                this.props.appComponent.updateRootState({bgColor: color})
              }
            });
          }
          requestAnimationFrame(e => {
            colorPicker.initColorWithoutChangeEvent(rootComponentState2.bgColor);
          })
        }}
      />

      <div style={{
        zIndex: 2, position: 'absolute', top: 0, left: 0, transform: 'translate(0px , 0px)',
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
  </div>;
}

export default drawCanvasEditUI;
const style = {
  canvasResizer: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 2,
    display: 'flex',
  }
};
