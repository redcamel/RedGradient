import React from "react";
import UI_Title from "../../core/UI_Title";
import UI_TextField from "../../core/UI_TextField";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import Red_GradientColorEdit from "./Red_GradientColorEdit";
import Red_Layer from "../layer/Red_Layer";
import Red_PropertyPositionEditByMouse from "./Red_PropertyPositionEditByMouse";
import Red_PropertyTypeEdit from "./Red_PropertyTypeEdit";
import Red_PropertyPositionEdit from "./Red_PropertyPositionEdit";
import Red_PropertyDegreeEdit from "./Red_PropertyDegreeEdit";

class Red_PropertyEdit extends React.Component {


  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeLayer = rootComponentState.activeLayer;
    const data = rootComponentState.activeSubData;

    return <div style={style.container}>
      <UI_Title title={'Red_PropertyEdit'} />
      <div style={style.contentWrap}>
        <div>
          <div style={{...style.itemContainer, display: 'flex'}}>
            <div style={{flexGrow: 100, marginRight: '5px'}}>
              <div>Title</div>
              <UI_TextField
                width={'calc(100% - 4px)'}
                value={data['title']} HD_onInput={e => {
                data['title'] = e.target.value;
                rootComponent.setState({});
              }} />
              <Red_PropertyTypeEdit rootComponent={rootComponent} />
              <Red_PropertyPositionEdit rootComponent={rootComponent} />
            </div>
            <div>
              <div>Start Position</div>
              <div className={'todo'}>개념정리필요</div>
              <Red_PropertyPositionEditByMouse rootComponent={rootComponent} />
              <div style={{height :'5px'}}/>
              <Red_PropertyDegreeEdit rootComponent={rootComponent} />
            </div>
          </div>
        </div>
        <div style={style.itemContainer}>
          Gradient ColorRange
          <Red_GradientColorEdit rootComponent={rootComponent} />
          <div className={'todo'}>Todo - 스텝추가/삭제, 이동</div>
          <div className={'todo'}>Todo - 컬러분해신공도 필요함</div>
          <div className={'todo'}>TODO - 그라디언트 컬러셀렉터</div>
          <div className={'todo'}>TODO - 이동에따른 스텝정렬</div>
          <div className={'todo'}>TODO - 일단 이게 오른쪽에 위치하는게 올바른것인가....</div>
        </div>
        <div style={style.itemContainer}>
          <div>Current Data</div>
          <SyntaxHighlighter language="javascript" wrapLongLines={'pre'}>
            {JSON.stringify(Red_Layer.calcGradientItem(data, false, activeLayer), null, 2)}
          </SyntaxHighlighter>
          <SyntaxHighlighter language="javascript" wrapLongLines={'pre'}>
            {JSON.stringify(data, null, 2)}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>;
  }

}

export default Red_PropertyEdit;
const style = {
  container: {
    width: '450px',
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
