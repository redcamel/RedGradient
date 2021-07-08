/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import DataRedGradient from "../editor/data/DataRedGradient";
import RedFrameMenuOpen from "../editor/frameMainMenu/RedFrameMenuOpen";

class RedStart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {logoLoaded: false};
  }

  componentDidMount() {
    let t0 = new Image();
    t0.src = './tempLogo.svg';
    t0.onload = () => this.setState({logoLoaded: true});
  }

  render() {
    const rootComponent = this.props.rootComponent;
    return <div>
      <div style={{...style.container, opacity: this.state.logoLoaded ? 1 : 0}}>
        {/* 로고 & 타이틀*/}
        <div style={{textAlign: 'center'}}>
          <img alt={'logo'} src={'./tempLogo.svg'} style={{height: '512px'}} />
          <div style={style.title}>RedGradient</div>
        </div>
        {/* 새프로젝트 생성버튼 */}
        <button style={style.button} onClick={() => rootComponent.setNewCanvas(new DataRedGradient())}>새 프로젝트</button>
        {/* 저장파일기반 생성버튼 */}
        <input
          type={'file'}
          accept=".json"
          style={{
            ...style.button,
            boxShadow: '0px 0px 6px rgba(0,0,0,0.16)'
          }}
          onChange={e => {
            // console.log(e);
            let fileReader = new FileReader();
            fileReader.onload = evt => {
              let t0 = RedFrameMenuOpen.prototype.checkValidate(evt.target.result);
              if (t0) rootComponent.setNewCanvas(t0);
              else alert('RedGradient 형식의 파일이 아닙니다.');
            };
            fileReader.readAsText(e.target.files[0]);
          }}
        />
        {/* 카피라이트 */}
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

const style = {
  container: {
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
    transition: 'opacity 0.5s'
  },
  title: {fontSize: '30px', fontWeight: 'bold', marginBottom: '30px'},
  button: {
    padding: '8px 16px',
    cursor: 'pointer',
    background: 'rgba(0,0,0,0.5)',
    border: '1px solid rgba(0,0,0,0.5)',
    color: '#fff',
    fontSize: '11px',
    borderRadius: '6px',
    boxShadow: '0px 0px 6px rgba(0,0,0,0.16)',
    marginBottom: '5px',
  }
};
export default RedStart;
