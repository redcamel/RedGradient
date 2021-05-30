/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedNumber from "../../core/RedNumber.jsx";
import getUUID from "../../getUUID.js";

const SIZE = 37;
let targetContext;
const HD_move = e => {
  targetContext.calcDegree(e);
};
const HD_up = () => {
  window.removeEventListener('mousemove', HD_move);
  window.removeEventListener('mouseup', HD_up);
};

class RedPropertyDegreeEdit extends React.Component {
  constructor(props) {
    super(props);
    this.refCenter = React.createRef();
  }

  calcDegree(e) {
    const rootComponent = targetContext.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    const rect = targetContext.refCenter.current.getBoundingClientRect();
    const tX = e.pageX - (rect.x + rect.width / 2);
    const tY = e.pageY - (rect.y + rect.height / 2);
    const deg = Math.atan2(tY, tX);
    activeSubData['deg'] = deg * 180 / Math.PI;
    activeSubData['deg'] += 90;
    if (activeSubData['deg'] < 0) activeSubData['deg'] += 360;
    activeSubData['deg'] = activeSubData['deg'] % 360;
    rootComponent.updateRootState({});
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    const deg = activeSubData['deg'];
    return <div style={{display: 'flex', alignItems: 'center'}}>
      {
        <>
          <RedNumber
            title={'Deg'}
            width={'61px'}
            value={deg || 0}
            HD_onInput={e => {
              activeSubData['deg'] = +e.target.value;
              rootComponent.updateRootState({});
            }}/>
          <div style={{textAlign: 'center', marginLeft: '10px',marginRight : '10px'}}>
            <div
              style={style.box}
              onMouseDown={() => {
                targetContext = this;
                window.addEventListener('mousemove', HD_move);
                window.addEventListener('mouseup', HD_up);
              }}
              onClick={e => {
                targetContext = this;
                this.calcDegree(e.nativeEvent);
              }}
            >
              <div style={style.centerItem} ref={this.refCenter}/>
              <div style={{
                ...style.degreeItem,
                top: `calc(50% + ${Math.sin(Math.PI / 180 * (deg - 90)) * SIZE / 3}px)`,
                left: `calc(50% + ${Math.cos(Math.PI / 180 * (deg - 90)) * SIZE / 3}px)`
              }}/>
            </div>
          </div>
        </>
      }
    </div>;
  }
}

export default RedPropertyDegreeEdit;
const style = {
  box: {
    display: 'inline-block',
    width: `${SIZE}px`, height: `${SIZE}px`,
    border: '1px solid #5e7ade',
    borderRadius: '50%',
    cursor: 'pointer'
  },
  centerItem: {
    width: '5px', height: '5px',
    background: '#5e7ade',
    borderRadius: '50%',
    position: 'absolute',
    top: '50%', left: '50%', transform: 'translate(-50%,-50%)'
  },
  degreeItem: {
    width: '10px', height: '10px',
    border: '1px solid #5e7ade',
    borderRadius: '50%',
    position: 'absolute',
    top: '50%', left: '50%', transform: 'translate(-50%,-50%)'
  }
};
