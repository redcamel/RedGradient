/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedTitle from "../../core/RedTitle.jsx";
import RedTextField from "../../core/RedTextField.jsx";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import RedGradientColorEdit from "./RedGradientColorEdit.jsx";
import RedPropertyPositionEditByMouse from "./RedPropertyPositionEditByMouse.jsx";
import RedPropertyTypeEdit from "./RedPropertyTypeEdit.jsx";
import RedPropertyPositionEdit from "./RedPropertyPositionEdit.jsx";
import RedPropertyDegreeEdit from "./RedPropertyDegreeEdit.jsx";
import RedPropertyRepeatEdit from "./RedPropertyRepeatEdit.jsx";
import RedPropertyTypeEndingShapeEdit from "./RedPropertyTypeEndingShapeEdit";
import RedPropertyAtEdit from "./RedPropertyAtEdit";
import GRADIENT_TYPE from "../GRADIENT_TYPE";
import RedPropertySizeEdit from "./RedPropertySizeEdit";
import RedPropertyBlendEdit from "./RedPropertyBlendEdit";
import CALC_GRADIENT from "../CALC_GRADIENT";

class RedPropertyEdit extends React.Component {
  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeLayer = rootComponentState.activeLayer;
    const data = rootComponentState.activeSubData;
    return <div style={style.container}>
      <RedTitle title={'Gradient Edit'}/>
      <div style={style.contentWrap}>
        <div>
          <div style={{...style.itemContainer}}>
            <div>
              <RedTextField
                width={'calc(100% - 4px)'}
                value={data['title']} HD_onInput={e => {
                data['title'] = e.target.value;
                rootComponent.updateRootState({});
              }}/>
              <div style={style.divide}/>
              <RedPropertyTypeEdit rootComponent={rootComponent}/>
              <div style={style.divide}/>
              <RedPropertyRepeatEdit rootComponent={rootComponent}/>
              <div style={style.divide}/>
              <RedPropertyBlendEdit rootComponent={rootComponent}/>
              {data.type === GRADIENT_TYPE.RADIAL || data.type === GRADIENT_TYPE.REPEAT_RADIAL ? <>
                <div style={style.divide}/>
                <RedPropertyTypeEndingShapeEdit rootComponent={rootComponent}/>
              </> : ''}
              {data.type === GRADIENT_TYPE.LINEAR || data.type === GRADIENT_TYPE.REPEAT_LINEAR || data.type === GRADIENT_TYPE.CONIC || data.type === GRADIENT_TYPE.REPEAT_CONIC ?
                <>
                  <div style={style.divide}/>
                  <RedPropertyDegreeEdit rootComponent={rootComponent}/>
                </> : ''}
              <div style={style.divide}/>
              <RedPropertySizeEdit rootComponent={rootComponent}/>
              {data.type === GRADIENT_TYPE.RADIAL || data.type === GRADIENT_TYPE.REPEAT_RADIAL || data.type === GRADIENT_TYPE.CONIC || data.type === GRADIENT_TYPE.REPEAT_CONIC? <>
                <div style={style.divide}/>
                <RedPropertyAtEdit rootComponent={rootComponent}/>
              </> : ''}

            </div>

            <div style={style.divide}/>
            <RedPropertyPositionEdit rootComponent={rootComponent}/>

            <div style={style.divide}/>
            <div style={{display: 'flex'}}>
              <div>
                position
                <RedPropertyPositionEditByMouse rootComponent={rootComponent} targetKey={'position'}/>
              </div>
              {data.type === GRADIENT_TYPE.RADIAL || data.type === GRADIENT_TYPE.REPEAT_RADIAL || data.type === GRADIENT_TYPE.CONIC || data.type === GRADIENT_TYPE.REPEAT_CONIC ?
                <div>
                  center
                  <RedPropertyPositionEditByMouse rootComponent={rootComponent} targetKey={'at'}/>
                </div> : ''
              }

            </div>
          </div>
        </div>

        <div style={style.itemContainer}>
          <RedGradientColorEdit rootComponent={rootComponent}/>
        </div>
        <div style={style.itemContainer}>
          <div>Current Gradient Css</div>
          <SyntaxHighlighter language="css" wrapLongLines={'pre'}>
            {
              JSON.stringify(CALC_GRADIENT.calcGradientItem(data, false, activeLayer))
                // .replace(/\s+/g, ' ')
                // .replace(/, /g, '')
                .replace(/"/g, '')
              // .replace(/\(/g, '\(\n')
              // .replace(/\)/g, '\n\)\n')
              // .replace(/,/g, ',\n')
            }

          </SyntaxHighlighter>
          <div>Current Gradient Data</div>
          <div
            style={{cursor: 'pointer'}}
            onClick={e => {
              var tempElem = document.createElement('textarea');
              tempElem.value = JSON.stringify(data, null, 2);
              document.body.appendChild(tempElem);
              tempElem.select();
              document.execCommand("copy");
              document.body.removeChild(tempElem);
            }}
          >copy
          </div>
          <SyntaxHighlighter language="javascript" wrapLongLines={'pre'}>
            {JSON.stringify(data, null, 2)}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>;
  }
}

export default RedPropertyEdit;
const style = {
  container: {
    width: '360px',
    borderRight: '1px solid #000',
    borderLeft: '1px solid #000',
    overflowX: 'hidden',
    overflowY: 'auto'
  },
  contentWrap: {
    padding: '10px 10px'
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
