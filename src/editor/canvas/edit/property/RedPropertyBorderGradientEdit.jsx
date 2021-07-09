/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedTextField from "../../../../core/RedTextField.jsx";
import RedGradientColorEdit from "../../../gradient/sub/RedGradientColorEdit.jsx";
import RedGradientPositionEditByMouse from "../../../gradient/sub/RedGradientPositionEditByMouse.jsx";
import RedGradientTypeEdit from "../../../gradient/sub/RedGradientTypeEdit.jsx";
import RedGradientDegreeEdit from "../../../gradient/sub/RedGradientDegreeEdit.jsx";
import RedGradientAtEdit from "../../../gradient/sub/RedGradientAtEdit.jsx";
import GRADIENT_TYPE from "../../../../const/GRADIENT_TYPE.js";
import RedGradientEndingShapeEdit from "../../../gradient/sub/RedGradientEndingShapeEdit.jsx";
import RedPresetBorder from "../preset/RedPresetBorder.jsx";

class RedPropertyBorderGradientEdit extends React.Component {
  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    return <div style={style.container}>

      <div style={style.divide} />
      <RedPresetBorder rootComponent={rootComponent} />
      <div style={style.divide} />

      <div style={style.contentWrap}>
        <div>
          <div style={{...style.itemContainer}}>
            <div>
              <RedTextField
                title={'name'}
                width={'calc(100% - 4px)'}
                value={activeSubData['title']} HD_onInput={e => {
                activeSubData['title'] = e.target.value;
                rootComponent.updateRootState({});
              }} />
              <div style={style.divide} />
              <RedGradientTypeEdit rootComponent={rootComponent} />

              {activeSubData.type === GRADIENT_TYPE.RADIAL || activeSubData.type === GRADIENT_TYPE.REPEAT_RADIAL ? <>
                <RedGradientEndingShapeEdit rootComponent={rootComponent} />
              </> : ''}
              {activeSubData.type === GRADIENT_TYPE.LINEAR || activeSubData.type === GRADIENT_TYPE.REPEAT_LINEAR || activeSubData.type === GRADIENT_TYPE.CONIC || activeSubData.type === GRADIENT_TYPE.REPEAT_CONIC ?
                <>
                  <div style={style.divide} />
                  <RedGradientDegreeEdit rootComponent={rootComponent} />
                </> : ''}
              {activeSubData.type === GRADIENT_TYPE.RADIAL || activeSubData.type === GRADIENT_TYPE.REPEAT_RADIAL || activeSubData.type === GRADIENT_TYPE.CONIC || activeSubData.type === GRADIENT_TYPE.REPEAT_CONIC ? <>
                <div style={style.divide} />
                <RedGradientAtEdit rootComponent={rootComponent} />
              </> : ''}

            </div>

            <div style={style.divide} />


            <div style={{display: 'flex'}}>
              {activeSubData.type === GRADIENT_TYPE.RADIAL || activeSubData.type === GRADIENT_TYPE.REPEAT_RADIAL || activeSubData.type === GRADIENT_TYPE.CONIC || activeSubData.type === GRADIENT_TYPE.REPEAT_CONIC ?
                <div>
                  center
                  <RedGradientPositionEditByMouse rootComponent={rootComponent} targetKey={'at'} />
                </div> : ''
              }

            </div>
          </div>
        </div>

        <div style={style.itemContainer}>
          <RedGradientColorEdit rootComponent={rootComponent} borderMode={true} />
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
