/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedNumber from "../../../../core/RedNumber.jsx";

class RedCanvasBoxPositionEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    return <div>
      <div style={style.divide}/>
      <div className={'ui_subTitle'}>Container Position</div>
      <div style={style.container}>
        <RedNumber title={'top'} width={'160px'} value={canvasInfo.top || 0} HD_onInput={e => {
          canvasInfo.top = +e.target.value;
          this.props.canvasComponent.state.useMove = false
          rootComponent.updateRootState({});
        }}/>
        <div style={{width: '5px'}}/>
        <RedNumber title={'left'} width={'160px'} value={canvasInfo.left || 0} HD_onInput={e => {
          canvasInfo.left = +e.target.value;
          this.props.canvasComponent.state.useMove = false
          rootComponent.updateRootState({});
        }}/>
      </div>
    </div>;
  }
}

export default RedCanvasBoxPositionEdit;
const style = {
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '0px 10px'
  },
  divide: {
    margin: '5px 0px',
    height: '2px',
    background: '#4e4e4e',
    borderTop: '1px solid #000'
  }
}
