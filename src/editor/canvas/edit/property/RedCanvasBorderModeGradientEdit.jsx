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
import RedCanvasBorderWidthEdit from "./RedCanvasBorderWidthEdit.jsx";

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
      <RedCanvasBorderWidthEdit rootComponent={rootComponent}/>
      <div style={style.divide}/>
      <div style={{...style.container, alignItems: 'center', marginRight: '5px'}}>
        <RedNumber
          title={'outset'}
          width={'61px'}
          value={borderGradientInfo['border_image_outset'] || 0}
          HD_onInput={e => {
            console.log(borderGradientInfo)
            borderGradientInfo['border_image_outset'] = +e.target.value;
            rootComponent.updateRootState(borderGradientInfo);
          }}/>
        <div style={{marginLeft: '5px'}}> px</div>
      </div>
      <div style={{height: '5px'}}/>
      <div style={style.container}>
        <RedNumber
          title={'sliceT'}
          width={'41px'}
          value={borderGradientInfo['border_image_sliceT'] || 0}
          HD_onInput={e => {
            borderGradientInfo['border_image_sliceT'] = +e.target.value;
            rootComponent.updateRootState({});
          }}/>

        <RedNumber
          title={'sliceR'}
          width={'41px'}
          value={borderGradientInfo['border_image_sliceR'] || 0}
          HD_onInput={e => {
            borderGradientInfo['border_image_sliceR'] = +e.target.value;
            rootComponent.updateRootState({});
          }}/>

        <RedNumber
          title={'sliceB'}
          width={'41px'}
          value={borderGradientInfo['border_image_sliceB'] || 0}
          HD_onInput={e => {
            borderGradientInfo['border_image_sliceB'] = +e.target.value;
            rootComponent.updateRootState({});
          }}/>

        <RedNumber
          title={'sliceL'}
          width={'41px'}
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
