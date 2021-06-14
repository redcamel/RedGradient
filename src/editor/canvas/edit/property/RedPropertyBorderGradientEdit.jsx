/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedTextField from "../../../../core/RedTextField.jsx";
import RedGradientColorEdit from "../../../property/RedGradientColorEdit.jsx";
import RedPropertyPositionEditByMouse from "../../../property/RedPropertyPositionEditByMouse.jsx";
import RedPropertyTypeEdit from "../../../property/RedPropertyTypeEdit.jsx";
import RedPropertyDegreeEdit from "../../../property/RedPropertyDegreeEdit.jsx";
import RedPropertyAtEdit from "../../../property/RedPropertyAtEdit.jsx";
import GRADIENT_TYPE from "../../../GRADIENT_TYPE.js";
import RedPropertyTypeEndingShapeEdit from "../../../property/RedPropertyTypeEndingShapeEdit.jsx";
import RedPresetBorder from "../preset/RedPresetBorder.jsx";

class RedPropertyBorderGradientEdit extends React.Component {
  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubLayerData = rootComponentState.activeSubLayerData;
    return <div style={style.container}>

      <div style={style.divide}/>
      <RedPresetBorder rootComponent={rootComponent}/>
      <div style={style.divide}/>

      <div style={style.contentWrap}>
        <div>
          <div style={{...style.itemContainer}}>
            <div>
              <RedTextField
                title={'name'}
                width={'calc(100% - 4px)'}
                value={activeSubLayerData['title']} HD_onInput={e => {
                activeSubLayerData['title'] = e.target.value;
                rootComponent.updateRootState({});
              }}/>
              <div style={style.divide}/>
              <RedPropertyTypeEdit rootComponent={rootComponent}/>

              {activeSubLayerData.type === GRADIENT_TYPE.RADIAL || activeSubLayerData.type === GRADIENT_TYPE.REPEAT_RADIAL ? <>
                <RedPropertyTypeEndingShapeEdit rootComponent={rootComponent}/>
              </> : ''}
              {activeSubLayerData.type === GRADIENT_TYPE.LINEAR || activeSubLayerData.type === GRADIENT_TYPE.REPEAT_LINEAR || activeSubLayerData.type === GRADIENT_TYPE.CONIC || activeSubLayerData.type === GRADIENT_TYPE.REPEAT_CONIC ?
                <>
                  <div style={style.divide}/>
                  <RedPropertyDegreeEdit rootComponent={rootComponent}/>
                </> : ''}
              {activeSubLayerData.type === GRADIENT_TYPE.RADIAL || activeSubLayerData.type === GRADIENT_TYPE.REPEAT_RADIAL || activeSubLayerData.type === GRADIENT_TYPE.CONIC || activeSubLayerData.type === GRADIENT_TYPE.REPEAT_CONIC ? <>
                <div style={style.divide}/>
                <RedPropertyAtEdit rootComponent={rootComponent}/>
              </> : ''}

            </div>

            <div style={style.divide}/>


            <div style={{display: 'flex'}}>
              {activeSubLayerData.type === GRADIENT_TYPE.RADIAL || activeSubLayerData.type === GRADIENT_TYPE.REPEAT_RADIAL || activeSubLayerData.type === GRADIENT_TYPE.CONIC || activeSubLayerData.type === GRADIENT_TYPE.REPEAT_CONIC ?
                <div>
                  center
                  <RedPropertyPositionEditByMouse rootComponent={rootComponent} targetKey={'at'}/>
                </div> : ''
              }

            </div>
          </div>
        </div>

        <div style={style.itemContainer}>
          <RedGradientColorEdit rootComponent={rootComponent} borderMode={true}/>
        </div>
      </div>
    </div>;
  }
}

export default RedPropertyBorderGradientEdit;
const style = {
  container: {
    width: '340px',
    // borderRight: '1px solid #000',
    // borderLeft: '1px solid #000',
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  contentWrap: {
    marginTop: '5px',
    // padding: '10px 10px',
    // border: '1px solid #000',
    // borderRadius: '8px'
  },
  layer: {
    height: '30px'
  },
  itemContainer: {
    padding: '4px 0px',
    borderBottom: '1px solid rgba(0,0,0,0.5)'
  },
  divide: {
    margin: '5px 0px',
    height: '2px',
    background: '#4e4e4e',
    borderTop: '1px solid #000'
  }
};
