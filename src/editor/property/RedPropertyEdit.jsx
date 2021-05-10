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

class RedPropertyEdit extends React.Component {
  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeLayer = rootComponentState.activeLayer;
    const data = rootComponentState.activeSubData;
    return <div style={style.container}>
      <RedTitle title={'RedPropertyEdit'}/>
      <div style={style.contentWrap}>
        <div>
          <div style={{...style.itemContainer, display: 'flex'}}>
            <div style={{flexGrow: 100, marginRight: '5px'}}>
              <div>Title</div>
              <RedTextField
                width={'calc(100% - 4px)'}
                value={data['title']} HD_onInput={e => {
                data['title'] = e.target.value;
                rootComponent.setState({});
              }}/>
              <RedPropertyTypeEdit rootComponent={rootComponent}/>
              <RedPropertyPositionEdit rootComponent={rootComponent}/>
              <RedPropertyRepeatEdit rootComponent={rootComponent}/>
              <div className={'todo'}>TODO - Radial일때 센터 포지션? 설정분리해야함</div>
              <div className={'todo'}>TODO - conic 타입추가</div>
            </div>
            <div>
              <div>Start Position</div>
              <RedPropertyPositionEditByMouse rootComponent={rootComponent}/>
              <div style={{height: '5px'}}/>
              <RedPropertyDegreeEdit rootComponent={rootComponent}/>
            </div>
          </div>
        </div>
        <div style={style.itemContainer}>
          <div className={'todo'}>Todo - 단위 변경시 소팅및 픽셀 계산처리</div>
          <RedGradientColorEdit rootComponent={rootComponent}/>
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
  }
};
