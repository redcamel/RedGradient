import './App.css';
import React from 'react';
import Canvas from "./canvas/Canvas";
import Layer from "./canvas/Layer";
import UI_Property from "./canvas/UI_Property";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canvasInfo: {
        width: 300,
        height: 300
      },
      activeData : null,
      layers: [
        {
          items: [
            `linear-gradient(45deg, rgba(0,0,255,0.2) 25%, transparent 25%, transparent)`,
            `linear-gradient(-45deg, rgba(0,0,255,0.2) 25%, transparent 25%, transparent)`,
          ]
        },
        {
          items: [
            'linear-gradient(45deg, transparent 75%, rgba(0,0,255,0.2) 75%)',
            'linear-gradient(-45deg, transparent 75%, rgba(0,0,255,0.2) 75%)'
          ]
        },
        {items: ['linear-gradient(45deg, transparent 75%, rgba(0,0,255,0.2) 75%)', 'linear-gradient(-15deg, transparent 75%, rgba(0,0,255,0.2) 15%)']},
        {items: ['linear-gradient(45deg, transparent 75%, rgba(0,0,255,0.2) 75%)', 'linear-gradient(-25deg, transparent 75%, rgba(0,0,255,0.2) 25%)']},
        {items: ['linear-gradient(45deg, transparent 75%, rgba(0,0,255,0.2) 75%)', 'linear-gradient(-35deg, transparent 75%, rgba(0,0,255,0.2) 35%)']},
        {items: ['linear-gradient(45deg, transparent 75%, rgba(0,0,255,0.2) 75%)', 'linear-gradient(-45deg, transparent 75%, rgba(0,0,255,0.2) 45%)']},
        {items: ['linear-gradient(45deg, transparent 75%, rgba(0,0,255,0.2) 75%)', 'linear-gradient(-55deg, transparent 75%, rgba(0,0,255,0.2) 55%)']},
        {items: ['linear-gradient(45deg, transparent 75%, rgba(0,0,255,0.2) 75%)', 'linear-gradient(-65deg, transparent 75%, rgba(0,0,255,0.2) 65%)']},
        {items: ['linear-gradient(45deg, transparent 75%, rgba(0,0,255,0.2) 75%)', 'linear-gradient(-75deg, transparent 75%, rgba(0,0,255,0.2) 75%)']},

      ]
    };
  }

  componentDidMount() {
    this.setState({});
  }


  render() {
    return <div className={'frame'}>
      <div className={'frame_main_menu'}>frame Main Menu
        <div style={style.test}>test</div>
        <div style={style.test}>test</div>
      </div>
      <div className={'frame_toolbar'}>frame ToolBar
        <div style={style.test}>test</div>
        <div style={style.test}>test</div>
      </div>
      <div className={'frame_middle'}>
        <div className={'frame_middle_container'}>
          <div className={'frame_left'}>frame Left
            <div style={style.test}>test</div>
          </div>
          <div className={'frame_center'}>
            {/*frame_centert*/}
            <Canvas rootComponent={this} />
          </div>
          <div className={'frame_right'}>
            {/*frame_right Right*/}
            <div style={{display : "flex",height : '100%'}}>
              <Layer rootComponent={this} />
              <UI_Property rootComponent={this} />
            </div>

          </div>
        </div>
      </div>
      <div className={'frame_bottom'}>frame Bottom
        <div style={style.test}>결과 테스트</div>
        <div>
          {JSON.stringify(Layer.calcGradients(this.state.layers))}
        </div>
      </div>
      <div className={'frame_status'}>frame Status
        <div style={style.test}>test</div>
        <div style={style.test}>test</div>
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
