import './App.css';
import React from 'react';
import Red_Canvas from "./editor/Red_Canvas";
import Red_Layer from "./editor/Red_Layer";
import Red_Property from "./editor/Red_Property";


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
          items: [
            {
              title: 'leftBottom',
              type: 'linear-gradient',
              deg: 45,
              colors: [
                {color: 'rgba(255,0,0,0.2)', range: 25, rangeUnit: '%'},
                {color: 'transparent', range: 25, rangeUnit: '%'},
                {color: 'transparent', range: undefined, rangeUnit: '%'}
              ]
            },
            {
              title: 'leftTop sdfsdfsdf',
              type: 'linear-gradient',
              deg: -45,
              colors: [
                {color: 'rgba(0,255,0,0.2)', range: 25, rangeUnit: '%'},
                {color: 'transparent', range: 25, rangeUnit: '%'},
                {color: 'transparent', range: undefined, rangeUnit: '%'}
              ]
            },
            {
              title: 'rightBottom',
              type: 'linear-gradient',
              deg: -45,
              colors: [
                {color: 'transparent', range: 75, rangeUnit: '%'},
                {color: 'rgba(0,0,255,0.2)', range: 75, rangeUnit: '%'}
              ]
            },
            {
              title: 'rightTop',
              type: 'linear-gradient',
              deg: 45,
              colors: [
                {color: 'transparent', range: 75, rangeUnit: '%'},
                {color: 'rgba(255,0,255,0.2)', range: 75, rangeUnit: '%'}
              ]
            }
          ]
        }
      ]
    };
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
            <div style={style.test}>test</div>
          </div>
          <div className={'frame_center'}>
            {/*frame_center*/}
            <Red_Canvas rootComponent={this} />
          </div>
          <div className={'frame_right'}>
            {/*frame_right Right*/}
            <div style={{display: "flex", height: '100%'}}>
              <Red_Layer rootComponent={this} />
              {this.state.activeSubData ? <Red_Property rootComponent={this} /> : ''}
            </div>

          </div>
        </div>
      </div>
      <div className={'frame_bottom'}>frame Bottom
        <div style={style.test}>결과 테스트</div>
        <div>{JSON.stringify(Red_Layer.calcGradients(this.state.layers))}</div>
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
    background: 'red',
    margin: '1px'
  }
};
