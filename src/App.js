/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */

import './App.css';
import React from 'react';
import RedCanvas from "./editor/canvas/RedCanvas.jsx";
import RedLayer from "./editor/layer/RedLayer.jsx";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import RedPropertyEdit from "./editor/property/RedPropertyEdit.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasInfo: {
        width: 300,
        height: 300
      },
      activeLayer: null,
      activeSubData: null,
      bgColor: '#fff',
      layers: [
        {
          title: 'testLayer sdfsdfsdfsdf',
          visible: true,
          openYn: true,
          items: [
            {
              title: 'test1',
              type: 'linear-gradient',
              typeRepeat: 'repeat',
              typeEndingShape: 'none',
              blendMode: 'normal',
              deg: 45,
              visible: true,
              position: {x: 0, xUnit: 'px', y: 0, yUnit: 'px'},
              at: {x: 0, xUnit: '%', y: 0, yUnit: '%'},
              size: {w: 30, wUnit: '%', h: 30, hUnit: '%'},
              colorList: [
                {color: 'transparent', rangeUnit: '%', range: 0},
                {color: 'transparent', rangeUnit: '%', range: 24.1867043847},
                {color: '#FFEA53', rangeUnit: '%', range: 25.6011315417},
                {color: '#FFEA53', rangeUnit: '%', range: 25.6011315417},
                {color: 'transparent', rangeUnit: '%', range: 25.6011315417},
                {color: 'transparent', rangeUnit: '%', range: 74.3988684583},
                {color: '#FFEA53', rangeUnit: '%', range: 74.3988684583},
                {color: '#FFEA53', rangeUnit: '%', range: 75.8132956153},
                {color: 'transparent', rangeUnit: '%', range: 75.8132956153},
                {color: 'transparent', rangeUnit: '%', range: 100}
              ]
            }
          ]
        },

        {
          title: 'conic ',
          visible: true,
          openYn: true,
          items: [
            {
              title: 'test',
              type: 'conic-gradient',
              typeRepeat: 'no-repeat',
              typeEndingShape: 'none',
              blendMode: 'normal',
              deg: 0,
              visible: true,
              position: {x: 150, xUnit: 'px', y: 150, yUnit: 'px'},
              at: {x: 50, xUnit: '%', y: 50, yUnit: '%'},
              size: {w: 50, wUnit: '%', h: 50, hUnit: '%'},
              colorList: [
                {color: 'rgba(255,255,0,0.9)', rangeUnit: '%', range: 25},
                {color: 'rgba(255,0,0,0.5)', rangeUnit: '%', range: 55},
                {color: 'transparent', rangeUnit: '%', range: 75},
                {color: 'transparent', rangeUnit: '%', range: 100}
              ]
            }
          ]
        },
        {
          title: 'radial ',
          visible: true,
          openYn: true,
          items: [
            {
              title: 'test',
              type: 'radial-gradient',
              typeRepeat: 'no-repeat',
              typeEndingShape: 'none',
              blendMode: 'normal',
              deg: 45,
              visible: true,
              position: {x: 0, xUnit: 'px', y: 0, yUnit: 'px'},
              at: {x: 0, xUnit: '%', y: 0, yUnit: '%'},
              size: {w: 30, wUnit: '%', h: 30, hUnit: '%'},
              colorList: [
                {color: 'rgba(255,255,0,0.9)', rangeUnit: '%', range: 25},
                {color: 'rgba(255,0,0,0.5)', rangeUnit: '%', range: 55},
                {color: 'transparent', rangeUnit: '%', range: 75},
                {color: 'transparent', rangeUnit: '%', range: 100}
              ]
            }
          ]
        }
      ]
    };
    this.state.activeLayer = this.state.layers[0];
    this.state.activeSubData = this.state.activeLayer['items'][0];
  }

  componentDidMount() {
    this.setState({});
  }

  render() {
    return <div className={'frame'}>
      <div className={'frame_main_menu'}>frame Main Menu
        <div style={style.test}>여기다가 메뉴를 만들어야겠넹</div>
        <div style={style.test}>단축키도 해야하나 -_-</div>
        <div style={style.test}>열기</div>
        <div style={style.test}>저장</div>
        <div style={style.test}>언두/리두</div>
      </div>
      <div className={'frame_toolbar'}>frame ToolBar
        <div style={style.test}>툴바 아이템</div>
        <div style={style.test}>툴바 아이템</div>
      </div>
      <div className={'frame_middle'}>
        <div className={'frame_middle_container'}>
          <div className={'frame_left'}>frame Left

          </div>
          <div className={'frame_center'}>
            {/*frame_center*/}
            <RedCanvas rootComponent={this} />
          </div>
          <div className={'frame_right'}>
            {/*frame_right Right*/}
            <div style={{display: "flex", height: '100%'}}>
              <RedLayer rootComponent={this} />
              {this.state.activeSubData ? <RedPropertyEdit rootComponent={this} /> : ''}
              <div style={{display: "flex", height: '100%', alignContent: 'space-between', flexDirection: 'column'}}>
                <div style={{width: '300px'}}>
                  <div style={style.test}>결과 테스트</div>
                  <SyntaxHighlighter language="css" wrapLongLines={'pre'}>
                    {JSON.stringify(RedLayer.calcGradients(this.state.layers), null, 2, this.state.bgColor).replace(/"/g, '')}
                  </SyntaxHighlighter>
                </div>
                <div>TODO - 애드센스자리</div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className={'frame_bottom'}>frame Bottom

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
