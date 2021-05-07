import './App.css';
import React from 'react';
import Red_Canvas from "./editor/canvas/Red_Canvas";
import Red_Layer from "./editor/Red_Layer";
import Red_PropertyEdit from "./editor/property/Red_PropertyEdit";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';

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
          items: [
            {
              title: 'leftBottom',
              type: 'linear-gradient',
              deg: 45,
              visible: true,
              position: {x: 30, xUnit: 'px', y: 30, yUnit: 'px'},
              size: {w: 30, wUnit: '%', h: 30, hUnit: '%'},
              colorList: [
                {color: '#ff0000', range: 25, rangeUnit: 'px'},
                {color: 'transparent', range: 25, rangeUnit: '%'},
                {color: 'transparent', range: 100, rangeUnit: '%'}
              ]
            },
            {
              title: 'leftTop sdfsdfsdf',
              type: 'linear-gradient',
              deg: -45,
              visible: true,
              position: {x: 0, xUnit: 'px', y: 0, yUnit: 'px'},
              size: {w: 100, wUnit: '%', h: 100, hUnit: '%'},
              colorList: [
                {color: 'rgba(0,255,0,0.9)', range: 24, rangeUnit: '%'},
                {color: '#00ff00', range: 25, rangeUnit: '%'},
                {color: 'transparent', range: 25, rangeUnit: '%'},
                {color: 'transparent', range: 100, rangeUnit: '%'}
              ]
            },
            {
              title: 'test',
              type: 'linear-gradient',
              deg: 90,
              visible: true,
              position: {x: 30, xUnit: 'px', y: 30, yUnit: 'px'},
              size: {w: 30, wUnit: '%', h: 30, hUnit: '%'},
              colorList: [
                {color: 'rgba(255,0,0,1)', range: 0, rangeUnit: '%'},
                {color: 'rgba(0,255,255,0.1)', range: 35, rangeUnit: '%'},
                {color: 'rgba(0,255,0,1)', range: 100, rangeUnit: '%'},
              ]
            },
            {
              title: 'rightBottom',
              type: 'linear-gradient',
              deg: -45,
              visible: true,
              position: {x: 0, xUnit: 'px', y: 0, yUnit: 'px'},
              size: {w: 100, wUnit: '%', h: 100, hUnit: '%'},
              colorList: [
                {color: 'transparent', range: 75, rangeUnit: '%'},
                {color: 'rgba(0,0,255,0.9)', range: 75, rangeUnit: '%'}
              ]
            },
            {
              title: 'rightTop',
              type: 'linear-gradient',
              deg: 45,
              visible: true,
              position: {x: 0, xUnit: 'px', y: 0, yUnit: 'px'},
              size: {w: 100, wUnit: '%', h: 100, hUnit: '%'},
              colorList: [
                {color: 'transparent', range: 75, rangeUnit: '%'},
                {color: 'rgba(255,0,255,0.9)', range: 75, rangeUnit: '%'}
              ]
            }
          ]
        },
        {
          title: 'testLayer ',
          visible: true,
          items: [
            {
              title: 'test',
              type: 'radial-gradient',
              deg: 45,
              visible: true,
              position: {x: 0, xUnit: 'px', y: 0, yUnit: 'px'},
              size: {w: 100, wUnit: '%', h: 100, hUnit: '%'},
              colorList: [
                {color: 'rgba(255,255,0,0.9)', range: 25, rangeUnit: '%'},
                {color: 'transparent', range: 50, rangeUnit: '%'},
                {color: 'transparent', range: 100, rangeUnit: '%'}
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
      <div className={'frame_bottom'} style={{height:'300px',maxHeight:'300px',overflow:'auto'}}>frame Bottom
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
