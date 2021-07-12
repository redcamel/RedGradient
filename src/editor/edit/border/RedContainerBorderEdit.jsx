/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedTitle from "../../../core/RedTitle";
import RedBorderModeEdit from "./RedBorderModeEdit.jsx";
import RedOutlineEdit from "./RedOutlineEdit";
import RedBorderGradientFrame from "./RedBorderGradientFrame.jsx";


class RedContainerBorderEdit extends React.Component {
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
    const canvasInfo = rootComponentState.canvasInfo;
    return <div>
      <RedTitle title={'Container Border Property'} />
      <div style={style.container}>
        <RedOutlineEdit rootComponent={rootComponent} />
        <div style={style.divide} />
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div className={'ui_subTitle'}>border</div>
          <div style={{
            display: 'flex',
            borderRadius: '4px',
            border: '1px solid #000',
            fontSize: '11px',
            marginRight: '4px',
            overflow: 'hidden'
          }}>

            <div
              onClick={() => {
                canvasInfo.borderIsGradientMode = false;
                rootComponent.updateRootState();
              }}
              style={{...style.mode, background: canvasInfo.borderIsGradientMode ? '#2f2f2f' : '#5e7ade'}}>basic
            </div>
            <div
              onClick={() => {
                canvasInfo.borderIsGradientMode = true;
                rootComponent.updateRootState();
              }}
              style={{
                ...style.mode,
                borderLeft: '1px solid #000',
                background: canvasInfo.borderIsGradientMode ? '#5e7ade' : '#2f2f2f'
              }}>gradient
            </div>
          </div>
        </div>
        <div style={{
          marginTop: '5px',
          borderRadius: '4px',
          border: '1px solid #000',
          padding: '10px 6px',
        }}>
          <div style={{display: canvasInfo.borderIsGradientMode ? 'none' : 'block'}}><RedBorderModeEdit
            rootComponent={rootComponent} /></div>

          {canvasInfo.borderIsGradientMode ? <RedBorderGradientFrame rootComponent={rootComponent} /> : ''}

        </div>
      </div>
    </div>;
  }
}

export default RedContainerBorderEdit;
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
