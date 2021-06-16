/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import DataGradient from "../editor/data/DataGradient";
import RedFrameMenuOpen from "../editor/frameMainMenu/RedFrameMenuOpen";

class RedStart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logoLoaded: false
    };
  }

  componentDidMount() {
    let t0 = new Image();
    t0.src = './tempLogo.svg';
    t0.onload = () => {
      this.setState({logoLoaded: true});
    };
  }

  render() {
    const rootComponent = this.props.rootComponent;
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
        color: '#fff',
        opacity: this.state.logoLoaded ? 1 : 0,
        transition: 'opacity 0.5s'
      }}>

        <div style={{textAlign: 'center'}}>
          <img alt={'logo'} src={'./tempLogo.svg'} style={{height: '512px'}} />
          <div style={{fontSize: '30px', fontWeight: 'bold', marginBottom: '30px'}}>RedGradient</div>
        </div>

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
          onClick={() => rootComponent.setNewCanvas(new DataGradient())}
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
            // console.log(e);
            // console.log(e.target.files);
            let fileReader = new FileReader();
            fileReader.onload = evt => {
              let t0  = RedFrameMenuOpen.prototype.checkValidate(evt.target.result)
              if (t0) rootComponent.setNewCanvas(t0);
              else alert('RedGradient 형식의 파일이 아닙니다.');
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
}

export default RedStart;
