/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedSelect from "../../core/RedSelect.jsx";
import REPEAT_TYPE from "../../const/REPEAT_TYPE.js";

class RedPropertyRepeatEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    const gradient = 'radial-gradient(at 50% 50%, rgba(255, 255, 0, 0.9) 1.5px, rgba(255, 0, 0, 0.5) 5px, transparent 10px)';
    return <div>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div className={'ui_subTitle'}>Repeat Mode</div>
        <RedSelect
          value={activeSubData['typeRepeat']}
          options={Object.entries(REPEAT_TYPE)}
          HD_change={e => {
            activeSubData['typeRepeat'] = e.target.value;
            rootComponent.updateRootState({});
          }} />
      </div>
      <div style={{display: 'flex', marginTop: '6px', padding: '0px 8px'}}>
        <div style={{display: 'flex'}}>
          <div style={{...style.icon}}
               onClick={() => {
                 activeSubData['typeRepeat'] = 'no-repeat';
                 rootComponent.updateRootState({});
               }}
          >
            <div style={{
              ...style.baseBg,
              background: gradient,
              backgroundSize: '10px 10px',
              backgroundRepeat: 'no-repeat'
            }}
            />
          </div>
          <div style={{...style.icon}}
               onClick={() => {
                 activeSubData['typeRepeat'] = 'repeat-x';
                 rootComponent.updateRootState({});
               }}
          >
            <div style={{
              ...style.baseBg,
              background: gradient,
              backgroundSize: '10px 10px',
              backgroundRepeat: 'repeat-x'
            }}
            />
          </div>
          <div style={{...style.icon}}
               onClick={() => {
                 activeSubData['typeRepeat'] = 'repeat-y';
                 rootComponent.updateRootState({});
               }}
          >
            <div style={{
              ...style.baseBg,
              background: gradient,
              backgroundSize: '10px 10px',
              backgroundRepeat: 'repeat-y'
            }}
            />
          </div>
          <div style={{...style.icon}}
               onClick={() => {
                 activeSubData['typeRepeat'] = 'repeat';
                 rootComponent.updateRootState({});
               }}
          >
            <div style={{
              ...style.baseBg,
              background: gradient,
              backgroundSize: '10px 10px',
              backgroundRepeat: 'repeat'
            }}
            />
          </div>
          <div style={{...style.icon}}
               onClick={() => {
                 activeSubData['typeRepeat'] = 'space';
                 rootComponent.updateRootState({});
               }}
          >
            <div style={{
              ...style.baseBg,
              background: gradient,
              backgroundSize: '10px 10px',
              backgroundRepeat: 'space'
            }}
            />
          </div>
          <div style={{...style.icon}}
               onClick={() => {
                 activeSubData['typeRepeat'] = 'round';
                 rootComponent.updateRootState({});
               }}
          >
            <div style={{
              ...style.baseBg,
              background: gradient,
              backgroundSize: '10px 10px',
              backgroundRepeat: 'round'
            }}
            />
          </div>
        </div>
      </div>

    </div>;
  }
}

export default RedPropertyRepeatEdit;
const style = {
  icon: {
    width: '36px',
    height: '36px',
    borderRadius: '5px',
    border: '1px solid #000',
    overflow: 'hidden',
    marginRight: '3px',
    cursor: 'pointer'
  },
  baseBg: {
    position: 'absolute',
    top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
    width: '100%', height: '100%',
  }
};
