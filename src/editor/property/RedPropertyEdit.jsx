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
import RedLayer from "../layer/RedLayer.jsx";
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

class RedPropertyEdit extends React.Component {
  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeLayer = rootComponentState.activeLayer;
    const data = rootComponentState.activeSubData;
    return <div style={style.container}>
      <RedTitle title={'RedPropertyEdit'} />
      <div style={style.contentWrap}>
        <div>
          <div style={{...style.itemContainer}}>
            <div>
              <div>Title</div>
              <RedTextField
                width={'calc(100% - 4px)'}
                value={data['title']} HD_onInput={e => {
                data['title'] = e.target.value;
                rootComponent.setState({});
              }} />
              <div style={style.divide} />
              <RedPropertyTypeEdit rootComponent={rootComponent} />
              <div style={style.divide} />
              <RedPropertyRepeatEdit rootComponent={rootComponent} />
              {/*<RedPropertyBlendEdit rootComponent={rootComponent} />*/}
              {data.type === GRADIENT_TYPE.RADIAL? <>
                <div style={style.divide} />
                <RedPropertyTypeEndingShapeEdit rootComponent={rootComponent} />
              </> : ''}
              {data.type === GRADIENT_TYPE.RADIAL || data.type === GRADIENT_TYPE.CONIC ? <>
                <div style={style.divide} />
                <RedPropertyAtEdit rootComponent={rootComponent} />
              </> : ''}
              <div style={style.divide} />
              <RedPropertyPositionEdit rootComponent={rootComponent} />
              <div style={style.divide} />
              <RedPropertySizeEdit rootComponent={rootComponent} />
              <div className={'todo'}>TODO - conic 타입추가</div>

            </div>
            <div>Start Position</div>
            <div style={{display: 'flex'}}>
              <RedPropertyPositionEditByMouse rootComponent={rootComponent} />
              <div style={{height: '5px'}} />
              {data.type === GRADIENT_TYPE.LINEAR || data.type === GRADIENT_TYPE.CONIC ? <RedPropertyDegreeEdit rootComponent={rootComponent} />  :''}
            </div>
          </div>
        </div>
        <div style={style.itemContainer}>
          <RedGradientColorEdit rootComponent={rootComponent} />
        </div>
        <div style={style.itemContainer}>
          <div>Current Data</div>
          <SyntaxHighlighter language="css" wrapLongLines={'pre'}>
            {
              JSON.stringify(RedLayer.calcGradientItem(data, false, activeLayer))
                // .replace(/\s+/g, ' ')
                // .replace(/, /g, '')
                .replace(/"/g, '')
              // .replace(/\(/g, '\(\n')
              // .replace(/\)/g, '\n\)\n')
              // .replace(/,/g, ',\n')
            }

          </SyntaxHighlighter>
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
    width: '350px',
    borderRight: '1px solid #000',
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
