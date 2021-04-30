import './App.css';
import React from 'react';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.refRoot = React.createRef();
  }

  componentDidMount() {
    this.setState({});
  }


  render() {
    return <div ref={this.refRoot} className={'frame'}>
      <div className={'frame_main_menu'}>Container Main Menu<div style={style.test}>test</div><div style={style.test}>test</div></div>
      <div className={'frame_toolbar'}>Container ToolBar<div style={style.test}>test</div><div style={style.test}>test</div></div>
      <div className={'frame_middle'}>
        <div className={'frame_middle_container'}>
          <div className={'frame_left'}>Container Left<div style={style.test}>test</div></div>
          <div className={'frame_center'} >Container Center<div style={style.test}>test</div></div>
          <div className={'frame_right'}>Container Right<div style={style.test}>test</div></div>
        </div>
      </div>
      <div className={'frame_bottom'}>Container Bottom<div style={style.test}>test</div></div>
      <div className={'frame_status'}>Container Status<div style={style.test}>test</div><div style={style.test}>test</div></div>
    </div>;
  }
}

export default App;
const style = {
  test : {
    background : 'red',
    margin : '1px'
  }
};
