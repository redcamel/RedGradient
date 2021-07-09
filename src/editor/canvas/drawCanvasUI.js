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
};
