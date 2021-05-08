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
          Gradient ColorRange
          <RedGradientColorEdit rootComponent={rootComponent}/>
          <div className={'todo'}>Todo - 스텝추가/삭제, 이동</div>
          <div className={'todo'}>Todo - 컬러분해신공도 필요함</div>
          <div className={'todo'}>TODO - 그라디언트 컬러셀렉터</div>
          <div className={'todo'}>TODO - 이동에따른 스텝정렬</div>
          <div className={'todo'}>TODO - 일단 이게 오른쪽에 위치하는게 올바른것인가....</div>
        </div>
        <div style={style.itemContainer}>
          <div>Current Data</div>
          <SyntaxHighlighter language="javascript" wrapLongLines={'pre'}>
            {JSON.stringify(RedLayer.calcGradientItem(data, false, activeLayer), null, 2)}
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
