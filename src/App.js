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
import DataLayer from "./editor/DataLayer";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFolderOpen, faSave} from '@fortawesome/free-solid-svg-icons';
import CALC_GRADIENT from "./editor/CALC_GRADIENT";
import RedCanvasEdit from "./editor/canvas/RedCanvasEdit";
import RedTitle from "./core/RedTitle";

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {

  }

  renderProjectSelect() {
    return <div>
      <div style={{
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'space-around',
        alignItems: 'center',
        justifyContent: 'center',
        top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: '800px', padding: '100px 0px',
        background: '#1d1d1d',
        borderRadius: '10px',
        border: '1px solid rgba(0,0,0,0.5)',
        boxShadow: '0px 0px 36px rgba(0,0,0,0.36)',
        color: '#fff'
      }}>
        <div>Todo - Logo</div>
        <div style={{fontSize: '30px', fontWeight: 'bold', marginBottom: '30px'}}>RedGradient</div>
        <button
          style={{
            padding: '8px 16px',
            cursor: 'pointer',
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(0,0,0,0.5)',
            color: '#fff',
            fontSize: '11px',
            borderRadius: '6px',
            boxShadow: '0px 0px 6px rgba(0,0,0,0.16)',
            marginBottom: '5px',
          }}
          onClick={e => {
            this.state = {
              "canvasInfo": {
                "width": 300,
                "height": 300
              },
              "activeLayer": null,
              "activeSubData": null,
              "bgColor": "#fff",
              "layers": [
                new DataLayer()
              ]
            };
            this.state.activeLayer = this.state.layers[0];
            this.state.activeSubData = this.state.activeLayer['items'][0];
            this.setState(this.state);
          }}
        >새 프로젝트
        </button>
        <input
          type={'file'}
          accept=".json"
          style={{
            padding: '8px 16px',
            cursor: 'pointer',
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(0,0,0,0.5)',
            color: '#fff',
            fontSize: '11px',
            borderRadius: '6px',
            boxShadow: '0px 0px 6px rgba(0,0,0,0.16)'
          }}
          onChange={e => {
            console.log(e);
            console.log(e.target.files);
            var fileReader = new FileReader();
            fileReader.onload = evt => {
              this.state = JSON.parse(evt.target.result);
              this.state.activeLayer = this.state.layers[0];
              this.state.activeSubData = this.state.activeLayer['items'][0];
              this.setState(this.state);
            };
            fileReader.readAsText(e.target.files[0]);
          }}
        />
        <div style={{padding: '10px'}}>
          <div style={{fontSize: '11px', textAlign: "center"}}>
            <a href={'https://github.com/redcamel/RedGradient'} target={'_blank'}>GitHub :
              https://github.com/redcamel/RedGradient</a>
            <div>This project is maintained by <a href={'mailto:webseon@gmail.com'}>RedCamel</a></div>
          </div>
        </div>
      </div>
    </div>;
  }

  render() {
    // console.log(this.state);
    if (!this.state) return this.renderProjectSelect();
    return <div className={'frame'}>
      <div className={'frame_main_menu'}>
        {/*frame Main Menu*/}
        {/*<div style={style.test}>여기다가 메뉴를 만들어야겠넹</div>*/}
        {/*<div style={style.test}>단축키도 해야하나 -_-</div>*/}
        <div style={{
          fontSize: '16px',
          margin: '5px',
          cursor: 'pointer'
        }}
             onClick={e => {
               const a = document.createElement('input');
               a.setAttribute('accept', '.json');
               a.setAttribute('type', 'file');
               a.click();
               a.onchange = e => {
                 console.log(e);
                 console.log(e.target.files);
                 var fileReader = new FileReader();
                 fileReader.onload = evt => {
                   this.state = JSON.parse(evt.target.result);
                   this.state.activeLayer = this.state.layers[0];
                   this.state.activeSubData = this.state.activeLayer['items'][0];
                   this.setState(this.state);
                 };
                 fileReader.readAsText(e.target.files[0]);
               };
             }}
        ><FontAwesomeIcon icon={faFolderOpen} />
        </div>
        <div
          style={{
            fontSize: '16px',
            margin: '5px',
            cursor: 'pointer'
          }}
          onClick={e => {
            const a = document.createElement('a');
            const file = new Blob([JSON.stringify(this.state)], {type: 'application/json'});

            a.href = URL.createObjectURL(file);
            a.download = `RedGradient.json`;
            a.click();

            URL.revokeObjectURL(a.href);
          }}

        ><FontAwesomeIcon icon={faSave} />
        </div>
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
            <RedCanvasEdit rootComponent={this} />
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
                <div style={{width: '200px'}}>
                  <RedTitle title={'Result'} />
                  <SyntaxHighlighter language="css" wrapLongLines={'pre'}>
                    {
`.result {
background : ${JSON.stringify(CALC_GRADIENT.calcGradients(this.state.layers), null, 2, this.state.bgColor).replace(/"/g, '')};
background-blend-mode : ${CALC_GRADIENT.calcBlendMode(this.state.layers)}
}`.replace(/\s\s+/g,' ')
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
