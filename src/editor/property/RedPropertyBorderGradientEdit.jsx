/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedTextField from "../../core/RedTextField.jsx";
import RedGradientColorEdit from "./RedGradientColorEdit.jsx";
import RedPropertyPositionEditByMouse from "./RedPropertyPositionEditByMouse.jsx";
import RedPropertyTypeEdit from "./RedPropertyTypeEdit.jsx";
import RedPropertyDegreeEdit from "./RedPropertyDegreeEdit.jsx";
import RedPropertyAtEdit from "./RedPropertyAtEdit";
import GRADIENT_TYPE from "../GRADIENT_TYPE";
import RedPropertyTypeEndingShapeEdit from "./RedPropertyTypeEndingShapeEdit.jsx";
import RedPresetBorder from "../canvas/edit/preset/RedPresetBorder.jsx";

class RedPropertyBorderGradientEdit extends React.Component {
  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    return <div style={style.container}>
      <div style={style.divide}/>
      <RedPresetBorder rootComponent={rootComponent}/>
      <div style={style.divide}/>

      <div style={style.contentWrap}>
        <div>
          <div style={{...style.itemContainer}}>
            <div>
              <RedTextField
                width={'calc(100% - 4px)'}
                value={activeSubData['title']} HD_onInput={e => {
                activeSubData['title'] = e.target.value;
                rootComponent.updateRootState({});
              }}/>
              <div style={style.divide}/>
              <RedPropertyTypeEdit rootComponent={rootComponent}/>

              {activeSubData.type === GRADIENT_TYPE.RADIAL || activeSubData.type === GRADIENT_TYPE.REPEAT_RADIAL ? <>
                <RedPropertyTypeEndingShapeEdit rootComponent={rootComponent} />
              </> : ''}
              {activeSubData.type === GRADIENT_TYPE.LINEAR || activeSubData.type === GRADIENT_TYPE.REPEAT_LINEAR || activeSubData.type === GRADIENT_TYPE.CONIC ?
                <>
                  <div style={style.divide}/>
                  <RedPropertyDegreeEdit rootComponent={rootComponent}/>
                </> : ''}
              {/*<div style={style.divide} />*/}
              {/*<RedPropertySizeEdit rootComponent={rootComponent} />*/}
              {activeSubData.type === GRADIENT_TYPE.RADIAL || activeSubData.type === GRADIENT_TYPE.REPEAT_RADIAL || activeSubData.type === GRADIENT_TYPE.CONIC ? <>
                <div style={style.divide}/>
                <RedPropertyAtEdit rootComponent={rootComponent}/>
              </> : ''}

            </div>

            <div style={style.divide}/>
            {/*<RedPropertyPositionEdit rootComponent={rootComponent} />*/}


            <div style={{display: 'flex'}}>
              {activeSubData.type === GRADIENT_TYPE.RADIAL || activeSubData.type === GRADIENT_TYPE.REPEAT_RADIAL || activeSubData.type === GRADIENT_TYPE.CONIC ?
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
