/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedSelect from "../../../../core/RedSelect.jsx";
import RedNumber from "../../../../core/RedNumber.jsx";
import {ColorPicker} from "@easylogic/colorpicker";

let colorPicker;

class RedCanvasOutlineEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {canvasBgColorPickerOpenYn: false};
    this.refColorPickerContainer = React.createRef();
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    return <div style={style.container}>
      outline
      <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        width <RedNumber
          width={'71px'}
          value={canvasInfo['outline_width'] || 0}
          HD_onInput={e => {
            canvasInfo['outline_width'] = e.target.value;
            rootComponent.setState({});
          }} />
        offset <RedNumber
          width={'71px'}
          value={canvasInfo['outline_offset'] || 0}
          HD_onInput={e => {
            canvasInfo['outline_offset'] = e.target.value;
            rootComponent.setState({});
          }} />

      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        style <RedSelect
          width={'150'}
          value={canvasInfo['outline_type']}
                   options={['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'none', 'hidden']}
                   HD_change={e => {
                     canvasInfo['outline_type'] = e.target.value;
                     rootComponent.setState({});
                   }} />

        <div
          className={rootComponentState.outline_color === 'transparent' ? 'transparent_checker' : ''}
          style={{
            display: 'inline-block',
            width: '28px',
            height: '28px',
            background: canvasInfo.outline_color === 'transparent' ? '' : canvasInfo.outline_color,
            borderRadius: '6px',
            order: '1px solid #000',
            cursor: 'pointer'
          }}
          onClick={() => {
            this.setState({canvasBgColorPickerOpenYn: true});
            if (!colorPicker) {
              colorPicker = new ColorPicker({
                type: "sketch",
                position: 'inline',
                color: canvasInfo.outline_color,
                container: this.refColorPickerContainer.current,
                onChange: color => {
                  canvasInfo['outline_color'] = color;
                  rootComponent.setState({canvasInfo});
                }
              });
            }
            colorPicker.setOption({color: canvasInfo.outline_color});
          }}
        />

        <div style={{
          zIndex: 2, position: 'absolute', top: 0, left: '0%', transform: 'translate(16px , 0px)',
          boxShadow: '0px 0px 16px rgba(0,0,0,0.16)',
          background: '#fff',
          borderRadius: '8px',
          overflow: 'hidden',
          display: this.state.canvasBgColorPickerOpenYn ? 'block' : 'none'
        }}>
          <div ref={this.refColorPickerContainer} />
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

export default RedCanvasOutlineEdit;
const style = {
  container: {}
};
