import './App.css';
import React from 'react';
import Red_Canvas from "./editor/canvas/Red_Canvas";
import Red_Layer from "./editor/Red_Layer";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import Red_PropertyEdit from "./editor/property/Red_PropertyEdit";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasInfo: {
        width: 300,
        height: 300
      },
      activeData: null,
      activeSubData: null,
      layers: [
        {
          title: 'testLayer sdfsdfsdfsdf',
          visible: true,
          size: {w: 100, wUnit: 'px', h: 100, hUnit: 'px'},
          items: [
            {
              title: 'test1',
              type: 'linear-gradient',
              deg: 45,
              visible: true,
              position: {x: 0, xUnit: 'px', y: 0, yUnit: 'px'},
              colorList: [
                {color: 'transparent', range: 0},
                {color: 'transparent', range: 24.1867043847},
                {color: '#FFEA53', range: 25.6011315417},
                {color: '#FFEA53', range: 25.6011315417},
                {color: 'transparent', range: 25.6011315417},
                {color: 'transparent', range: 74.3988684583},
                {color: '#FFEA53', range: 74.3988684583},
                {color: '#FFEA53', range: 75.8132956153},
                {color: 'transparent', range: 75.8132956153},
                {color: 'transparent', range: 100}
              ]
            },
            {
              title: 'test2',
              type: 'linear-gradient',
              deg: -45,
              visible: true,
              position: {x: 0, xUnit: 'px', y: 0, yUnit: 'px'},
              colorList: [
                {color: 'transparent', range: 0},
                {color: 'transparent', range: 24.1867043847},
                {color: '#FFEA53', range: 25.6011315417},
                {color: '#FFEA53', range: 25.6011315417},
                {color: 'transparent', range: 25.6011315417},
                {color: 'transparent', range: 74.3988684583},
                {color: '#FFEA53', range: 74.3988684583},
                {color: '#FFEA53', range: 75.8132956153},
                {color: 'transparent', range: 75.8132956153},
                {color: 'transparent', range: 100}
              ]
            },
            {
              title: 'test3',
              type: 'linear-gradient',
              deg: 45,
              visible: true,
              position: {x: 0, xUnit: 'px', y: 0, yUnit: 'px'},
              colorList: [
                {color: '#8F225C', range: 0},
                {color: '#8F225C', range: 12.4469589816},
                {color: '#FFEA53', range: 12.4469589816},
                {color: '#FFEA53', range: 13.8613861386},
                {color: 'transparent', range: 13.8613861386},
                {color: 'transparent', range: 86.1386138614},
                {color: '#FFEA53', range: 86.1386138614},
                {color: '#FFEA53', range: 87.5530410184},
                {color: '#8F225C', range: 87.5530410184},
                {color: '#8F225C', range: 100}
              ]
            }
          ]
        }
      ]
    };
    this.state.activeData = this.state.layers[0];
    this.state.activeSubData = this.state.activeData['items'][0];
  }

  componentDidMount() {
    this.setState({});
  }


  render() {
    return <div className={'frame'}>
      <div className={'frame_main_menu'}>frame Main Menu
        <div style={style.test}>최상위 메뉴가 들어감</div>
        <div style={style.test}>테스트 아이템</div>
      </div>
      <div className={'frame_toolbar'}>frame ToolBar
        <div style={style.test}>툴바 아이템</div>
        <div style={style.test}>툴바 아이템</div>
      </div>
      <div className={'frame_middle'}>
        <div className={'frame_middle_container'}>
          <div className={'frame_left'}>frame Left
            <div style={style.test}>이공간이<br />현재는<br />쓸모없으나...<br />예비로...구성함</div>
          </div>
          <div className={'frame_center'}>
            {/*frame_center*/}
            <Red_Canvas rootComponent={this} />
          </div>
          <div className={'frame_right'}>
            {/*frame_right Right*/}
            <div style={{display: "flex", height: '100%'}}>
              <Red_Layer rootComponent={this} />
              {this.state.activeSubData ? <Red_PropertyEdit rootComponent={this} /> : ''}
            </div>

          </div>
        </div>
      </div>
      <div className={'frame_bottom'} style={{height: '300px', maxHeight: '300px', overflow: 'auto'}}>frame Bottom
        <div className={'todo'}>Todo - Animation Timeline</div>
        <div style={style.test}>결과 테스트</div>
        <SyntaxHighlighter language="javascript" wrapLongLines={'pre'}>
          {JSON.stringify(Red_Layer.calcGradients(this.state.layers), null, 2)}
        </SyntaxHighlighter>
      </div>
      <div className={'frame_status'}>frame Status
        <div style={style.test}>상태 아이템</div>
        <div style={style.test}>상태 아이템</div>
      </div>
    </div>;
  }
}

export default App;
const style = {
  test: {
    background: '#5e7ade',
    margin: '1px'
  }
};
