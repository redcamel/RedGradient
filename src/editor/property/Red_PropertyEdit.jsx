import React from "react";
import UI_Title from "../../core/UI_Title";
import UI_TextField from "../../core/UI_TextField";
import UI_Number from "../../core/UI_Number";
import UI_Select from "../../core/UI_Select";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import GRADIENT_TYPE from "../GRADIENT_TYPE";
import Red_GradientColorEdit from "./Red_GradientColorEdit";

class Red_PropertyEdit extends React.Component {


  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const data = rootComponentState.activeSubData;

    return <div style={style.container}>
      <UI_Title title={'Red_PropertyEdit'} />
      <div style={style.contentWrap}>
        <div>
          <div style={style.itemContainer}>
            타이틀
            <div>
              <UI_TextField
                width={'calc(100% - 4px)'}
                value={data['title']} HD_onInput={e => {
                data['title'] = e.target.value;
                rootComponent.setState({});
              }} />
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

        </div>
        <div style={style.itemContainer}>
          <div>Current Data</div>
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
