/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import '@easylogic/colorpicker/dist/colorpicker.css';
import React from "react";
import RedTitle from "../../core/RedTitle";

function drawCanvasUI() {
  const rootComponent = this.props.rootComponent;
  const rootComponentState = rootComponent.state;
  const canvasInfo = rootComponentState.canvasInfo;
  return <div style={style.container}>
    <RedTitle title={'Container Information'} />
    <div style={{padding: '8px 8px'}}>
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <div style={style.canvasResizer}>
          <div>
            <label style={{
              background: 'linear-gradient(rgb(94, 122, 222), rgb(58, 73, 125))',
              display: 'flex',
              borderRadius: '4px',
              padding: '3px 8px',
              whiteSpace: 'nowrap',
              cursor: 'pointer'
            }}>
              View Edit Area
              <input type={'checkbox'}
                     checked={this.state.layerSizeView}
                     style={{
                       display: 'inline-block',
                       width: '15px',
                       height: '15px',
                       background: rootComponentState.bgColor === 'transparent' ? '' : rootComponentState.bgColor,
                       borderRadius: '4px',
                       border: '1px solid #000',
                       cursor: 'pointer',
                       marginLeft: '5px'
                     }}
                     onClick={() => this.setState({layerSizeView: !this.state.layerSizeView})}
              />
            </label>
          </div>
          <div>
            <label style={{
              marginLeft: '5px',
              background: 'linear-gradient(rgb(94, 122, 222), rgb(58, 73, 125))',
              display: 'flex',
              borderRadius: '4px',
              padding: '3px 8px',
              whiteSpace: 'nowrap',
              cursor: 'pointer'
            }}>
              View Edit Canvas Only
              <input type={'checkbox'}
                     checked={this.state.editCanvasOnly}
                     style={{
                       display: 'inline-block',
                       width: '15px',
                       height: '15px',
                       background: rootComponentState.bgColor === 'transparent' ? '' : rootComponentState.bgColor,
                       borderRadius: '4px',
                       border: '1px solid #000',
                       cursor: 'pointer',
                       marginLeft: '5px'
                     }}
                     onClick={() => this.setState({editCanvasOnly: !this.state.editCanvasOnly})}
              />
            </label>
          </div>
        </div>

      </div>

    </div>


  </div>;
}

export default drawCanvasUI;
const style = {
  container: {
    position: 'sticky',
    top: 0,
    left: 0,
    zIndex: 1,
    background: '#2d2d2d',
    boxShadow: '0px 10px 10px rgba(0,0,0,0.16)',
    borderBottom: '1px solid #111'
  },
  canvasResizer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '5px',
    fontSize: '12px'
  },

};
