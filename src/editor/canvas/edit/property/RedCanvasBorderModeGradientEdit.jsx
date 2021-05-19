/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *  
 */
import React from "react";
import RedNumber from "../../../../core/RedNumber.jsx";
import RedCanvasBorderGradientRepeatEdit from "./RedCanvasBorderGradientRepeatEdit.jsx";
import RedCanvasBorderRadiusEdit from "./RedCanvasBorderRadiusEdit.jsx";

class RedCanvasBorderModeGradientEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {canvasBgColorPickerOpenYn: false}
    this.refColorPickerContainer = React.createRef()
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    const borderGradientInfo = rootComponentState;
    return <div>
      <RedCanvasBorderRadiusEdit rootComponent={rootComponent}/>
      <div style={style.divide}/>
      <div style={style.container}>
        width <RedNumber
        width={'51px'}
        value={canvasInfo['border_width'] || 0}
        HD_onInput={e => {
          canvasInfo['border_width'] = e.target.value;
          rootComponent.updateRootState({});
        }}/>
        outset <RedNumber
        width={'61px'}
        value={borderGradientInfo['border_image_outset'] || 0}
        HD_onInput={e => {
          console.log(borderGradientInfo)
          borderGradientInfo['border_image_outset'] = +e.target.value;
          rootComponent.updateRootState(borderGradientInfo);
        }}/>
      </div>
      <div style={style.container}>
        sliceT <RedNumber
        width={'51px'}
        value={borderGradientInfo['border_image_sliceT'] || 0}
        HD_onInput={e => {
          borderGradientInfo['border_image_sliceT'] = +e.target.value;
          rootComponent.updateRootState({});
        }}/>

        sliceR <RedNumber
        width={'51px'}
        value={borderGradientInfo['border_image_sliceR'] || 0}
        HD_onInput={e => {
          borderGradientInfo['border_image_sliceR'] = +e.target.value;
          rootComponent.updateRootState({});
        }}/>

        sliceB <RedNumber
        width={'51px'}
        value={borderGradientInfo['border_image_sliceB'] || 0}
        HD_onInput={e => {
          borderGradientInfo['border_image_sliceB'] = +e.target.value;
          rootComponent.updateRootState({});
        }}/>

        sliceL <RedNumber
        width={'51px'}
        value={borderGradientInfo['border_image_sliceL'] || 0}
        HD_onInput={e => {
          borderGradientInfo['border_image_sliceL'] = +e.target.value;
          rootComponent.updateRootState({});
        }}/>
      </div>


      <RedCanvasBorderGradientRepeatEdit rootComponent={rootComponent}/>
    </div>
      ;
  }
}

export default RedCanvasBorderModeGradientEdit;
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
