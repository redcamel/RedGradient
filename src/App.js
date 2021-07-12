/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import './App.css';
import '@easylogic/colorpicker/dist/colorpicker.css'
import React from 'react';
import RedStart from "./start/RedStart.jsx";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getActiveLayer from "./editor/js/getActiveLayer.js";
import getActiveSubData from "./editor/js/getActiveSubData.js";
import AppFrame from "./frame/AppFrame";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.history = [];
    this.historyRedo = [];
    window.addEventListener('resize', () => {
      this.updateRootState();
    });
  }

  HD_keydown(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'Z') {
      // console.log('리두 실행해야함')
      let targetState = this.historyRedo.pop();
      if (targetState) {
        this.state = JSON.parse(JSON.stringify(targetState));
        const activeFrameState = this.state[this.state.activeFrameKey];
        activeFrameState.activeLayer = getActiveLayer(activeFrameState);
        activeFrameState.activeSubData = getActiveSubData(activeFrameState);
        this.updateRootState(this.state);
      }
      // console.log('history',this.history)
      // console.log('historyRedo',this.historyRedo)
    } else if (e.ctrlKey && e.key === 'z') {
      // console.log('언두 실행해야함')
      let targetState = this.history.pop();
      if (targetState) {
        this.historyRedo.push(JSON.parse(JSON.stringify(targetState)));
        targetState = this.history[this.history.length - 1];
        if (targetState) {
          this.state = JSON.parse(JSON.stringify(targetState));
          const activeFrameState = this.state[this.state.activeFrameKey];
          activeFrameState.activeLayer = getActiveLayer(activeFrameState);
          activeFrameState.activeSubData = getActiveSubData(activeFrameState);
          this.setState(this.state);
        }
      }
    }

  }

  componentDidMount() {
    document.addEventListener('keydown', this.HD_keydown.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.HD_keydown.bind(this));
  }

  checkUnloadEvent() {
    if (this.state && !window.onbeforeunload) {
      window.onbeforeunload = () => {
        if (window.actionHistoryCheckNum > 1) return "~";
      };
    }
  }

  updateRootState(v = {}) {
    if (this.state) {
      this.setState(v);
      console.log('App updateRootState', this.state);
      console.log(this.state);
      const activeFrameState = this.state[this.state.activeFrameKey];
      if (!activeFrameState || !activeFrameState.canvasInfo) return;
      if (this.history.length > 50) this.history.shift();
      this.history.push(JSON.parse(JSON.stringify(this.state)));

      window.actionHistoryCheckNum = window.actionHistoryCheckNum || 0;
      window.actionHistoryCheckNum++;
      console.log('actionHistoryCheckNum', window.actionHistoryCheckNum);
    }
  }

  setNewCanvas(newState) {
    this.state = newState;
    console.log(this.state);
    //
    this.updateRootState(this.state);
  }

  render() {
    // console.log(this.state);
    if (!this.state) return <RedStart rootComponent={this} />;
    this.checkUnloadEvent();
    return <div className={'frame'}>
      <AppFrame appComponent={this} />
      <ToastContainer
        hideProgressBar={true}
      />
    </div>;
  }
}

export default App;
