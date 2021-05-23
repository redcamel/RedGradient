/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedSelect from "../../../../core/RedSelect.jsx";
import {ColorPicker} from "@easylogic/colorpicker";
import RedCanvasBorderRadiusEdit from "./RedCanvasBorderRadiusEdit.jsx";
import RedCanvasBorderWidthEdit from "./RedCanvasBorderWidthEdit.jsx";

let colorPicker

class RedCanvasBorderModeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {canvasBgColorPickerOpenYn: false}
    this.refColorPickerContainer = React.createRef()
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    return <div>
      <RedCanvasBorderRadiusEdit rootComponent={rootComponent}/>
      <div style={style.divide}/>
      <RedCanvasBorderWidthEdit rootComponent={rootComponent}/>
      <div style={style.container}>
        <RedSelect value={canvasInfo['border_type']}
                   options={['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset']}
                   HD_change={e => {
                     canvasInfo['border_type'] = e.target.value;
                     rootComponent.updateRootState({});
                   }}/>
        <div
          className={rootComponentState.border_color === 'transparent' ? 'transparent_checker' : ''}
          style={{
            display: 'inline-block',
            width: '28px',
            height: '28px',
            background: canvasInfo.border_color === 'transparent' ? '' : canvasInfo.border_color,
            borderRadius: '6px',
            border: '1px solid #000',
            cursor: 'pointer'
          }}
          onClick={() => {
            this.setState({canvasBgColorPickerOpenYn: true});
            if (!colorPicker) {
              colorPicker = new ColorPicker({
                type: "sketch",
                position: 'inline',
                color: canvasInfo.border_color,
                container: this.refColorPickerContainer.current,
                onChange: color => {
                  canvasInfo['border_color'] = color
                  rootComponent.updateRootState({canvasInfo})
                }
              });
            }
            colorPicker.setOption({color: canvasInfo.border_color});
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
    </div>;
  }
}

export default RedCanvasBorderModeEdit;
const style = {
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  divide: {
    margin: '5px 0px',
    height: '2px',
    background: '#4e4e4e',
    borderTop: '1px solid #000'
  }
}
