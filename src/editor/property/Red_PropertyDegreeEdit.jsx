import React from "react";
import GRADIENT_TYPE from "../GRADIENT_TYPE";
import UI_Number from "../../core/UI_Number";

const SIZE = 50;
let targetContext;
const HD_move = e => {targetContext.calcDegree(e);};
const HD_up = e => {
  window.removeEventListener('mousemove', HD_move);
  window.removeEventListener('mouseup', HD_up);
};

class Red_PropertyDegreeEdit extends React.Component {
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

    rootComponent.setState({});
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    const deg = activeSubData['deg'];
    return <div >
      {
        activeSubData['type'] === GRADIENT_TYPE.LINEAR ? <>
          Deg <UI_Number
          width={'71px'}
          value={deg || 0}
          HD_onInput={e => {
            activeSubData['deg'] = e.target.value;
            rootComponent.setState({});
          }} />
          <div style={{textAlign: 'center'}}>
            <div
              style={style.box}
              onMouseDown={e => {
                targetContext = this;
                window.addEventListener('mousemove', HD_move);
                window.addEventListener('mouseup', HD_up);
              }}
              onClick={e => {
                targetContext = this;
                this.calcDegree(e.nativeEvent);
              }}
            >
              <div style={style.centerItem} ref={this.refCenter} />
              <div style={{
                ...style.degreeItem,
                top: `calc(50% + ${Math.sin(Math.PI / 180 * (deg - 90)) * SIZE / 3}px)`,
                left: `calc(50% + ${Math.cos(Math.PI / 180 * (deg - 90)) * SIZE / 3}px)`
              }} />
            </div>
          </div>
        </> : ''
      }
    </div>;
  }

}

export default Red_PropertyDegreeEdit;
const style = {
  box: {
    display: 'inline-block',
    margin: '5px',
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
