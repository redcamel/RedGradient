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
import CALC_GRADIENT from "./editor/CALC_GRADIENT";
import RedCanvasEdit from "./editor/canvas/edit/RedCanvasEdit";
import RedTitle from "./core/RedTitle";
import RedStart from "./start/RedStart.jsx";
import RedFrameMenuOpen from "./editor/frameMainMenu/RedFrameMenuOpen.jsx";
import RedFrameMenuSave from "./editor/frameMainMenu/RedFrameMenuSave.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  setNewCanvas(newState) {
    this.state = newState
    this.state.activeLayer = this.state.layers[0];
    this.state.activeSubData = this.state.activeLayer['items'][0];
    this.setState(this.state);
  }

  render() {
    // console.log(this.state);
    if (!this.state) return <RedStart rootComponent={this}/>
    return <div className={'frame'}>
      <div className={'frame_main_menu'}>
        <div style={{fontSize: '20px', fontWeight: 'bold',margin:'0px 8px'}}>RedGradient</div>
        <RedFrameMenuOpen rootComponent={this}/>
        <RedFrameMenuSave rootComponent={this}/>

        {/*<div style={style.test}>언두/리두</div>*/}
      </div>
      <div className={'frame_toolbar'}>frame ToolBar
        <div style={style.test}>툴바 아이템</div>
        <div style={style.test}>툴바 아이템</div>
      </div>
      <div className={'frame_middle'}>
        <div className={'frame_middle_container'}>
          <div className={'frame_left'}>
            {/*frame Left*/}
            <RedCanvasEdit rootComponent={this}/>
          </div>
          <div className={'frame_center'}>
            {/*frame_center*/}
            <RedCanvas rootComponent={this}/>
          </div>
          <div className={'frame_right'}>
            {/*frame_right Right*/}
            <div style={{display: "flex", height: '100%'}}>
              <RedLayer rootComponent={this}/>
              {this.state.activeSubData ? <RedPropertyEdit rootComponent={this}/> : ''}
              <div style={{display: "flex", height: '100%', alignContent: 'space-between', flexDirection: 'column'}}>
                <div style={{width: '200px'}}>
                  <RedTitle title={'Result'}/>
                  <SyntaxHighlighter language="css" wrapLongLines={'pre'}>
                    {
                      `.result {
background : ${JSON.stringify(CALC_GRADIENT.calcGradients(this.state.layers), null, 2, this.state.bgColor).replace(/"/g, '')};
background-blend-mode : ${CALC_GRADIENT.calcBlendMode(this.state.layers)}
}`.replace(/\s\s+/g, ' ')
                    }
                  </SyntaxHighlighter>
                </div>
                <div>TODO - 애드센스자리</div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div className={'frame_bottom'}>
        {/*frame Bottom*/}
      </div>
      <div className={'frame_status'}>
        <a href={'https://github.com/redcamel/RedGradient'} target={'_blank'}>GitHub :
          https://github.com/redcamel/RedGradient</a>
        <div>This project is maintained by <a href={'mailto:webseon@gmail.com'}>RedCamel</a></div>
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
