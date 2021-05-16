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
    const activeSubData = rootComponentState.activeSubData;
    if(!canvasInfo.hasOwnProperty('border_image_sliceT')){
      canvasInfo['border_image_sliceT'] =
        canvasInfo['border_image_sliceR'] =
          canvasInfo['border_image_sliceL'] =
            canvasInfo['border_image_sliceB'] = 1
    }
    return <div>
      <div style={style.container}>
        <RedCanvasBorderRadiusEdit rootComponent={this.props.rootComponent}/>
        width <RedNumber
        width={'51px'}
        value={canvasInfo['border_width'] || 0}
        HD_onInput={e => {
          canvasInfo['border_width'] = e.target.value;
          rootComponent.updateRootState({});
        }}/>
        <RedCanvasBorderGradientRepeatEdit rootComponent={rootComponent}/>
      </div>
      <div style={style.container}>
        sliceT <RedNumber
        width={'51px'}
        value={canvasInfo['border_image_sliceT'] || 0}
        HD_onInput={e => {
          canvasInfo['border_image_sliceT'] = e.target.value;
          rootComponent.updateRootState({});
        }}/>

        sliceR <RedNumber
        width={'51px'}
        value={canvasInfo['border_image_sliceR'] || 0}
        HD_onInput={e => {
          canvasInfo['border_image_sliceR'] = e.target.value;
          rootComponent.updateRootState({});
        }}/>

        sliceB <RedNumber
        width={'51px'}
        value={canvasInfo['border_image_sliceB'] || 0}
        HD_onInput={e => {
          canvasInfo['border_image_sliceB'] = e.target.value;
          rootComponent.updateRootState({});
        }}/>

        sliceL <RedNumber
        width={'51px'}
        value={canvasInfo['border_image_sliceL'] || 0}
        HD_onInput={e => {
          canvasInfo['border_image_sliceL'] = e.target.value;
          rootComponent.updateRootState({});
        }}/>
      </div>
      outset <RedNumber
      width={'61px'}
      value={canvasInfo['border_image_outset'] || 0}
      HD_onInput={e => {
        canvasInfo['border_image_outset'] = e.target.value;
        rootComponent.updateRootState({});
      }}/>

    </div>
      ;
  }
}

export default RedCanvasBorderModeGradientEdit;
const style = {
  container: {
    display: 'flex',
    alignItems: 'center'
  }
}
