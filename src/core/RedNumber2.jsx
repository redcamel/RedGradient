/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";

let targetContext;
let startX, startValue, startTime;
let requestAni;
const HD_move = e => {
  targetContext.calc(e);
};
const HD_up = () => {
  window.removeEventListener('mousemove', HD_move);
  window.removeEventListener('mouseup', HD_up);
};
const HD_up2 = () => {
  cancelAnimationFrame(requestAni);
  window.removeEventListener('mouseup', HD_up2);
};

class RedNumber2 extends React.Component {
  constructor(props) {
    super(props);
    HD_up();
    HD_up2();
  }

  componentWillUnmount() {
    HD_up();
    HD_up2();
  }

  calc(e) {
    const step = this.props.step || 0.1;
    const tX = e.pageX - startX;
    console.log(e.pageX);
    this.update(+startValue + tX * step);
  }

  update(v) {
    if (this.props.hasOwnProperty('minValue')) if (v < this.props.minValue) v = this.props.minValue;
    if (this.props.hasOwnProperty('maxValue')) if (v > this.props.maxValue) v = this.props.maxValue;
    this.props.HD_onInput({
      target: {
        value: v
      }
    });
  }

  render() {
    const step = this.props.step || 1;
    return <div
      style={{width: `${this.props.width || ''}`, flexGrow: 1, display: 'inline-block', whiteSpace: 'nowrap'}}>
      {this.props.title ? <span className={'ui_item_title'}>{this.props.title}</span> : ''}
      <input
        style={{
          width: 'calc(100% - 40px)',
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          fontSize: this.props.fontSize,
          cursor: "ew-resize",
          userSelect: 'none'
        }}
        type={'number'}
        value={+(+this.props.value).toFixed(2)}
        onInput={e => {
          this.update(+e.target.value);
        }}
        onBlur={this.props.HD_blur}
        onMouseDown={e => {
          targetContext = this;
          startValue = +this.props.value;
          startX = e.nativeEvent.pageX;

          window.addEventListener('mousemove', HD_move);
          window.addEventListener('mouseup', HD_up);
        }}
      />
      <div style={{
        position: 'absolute',
        right: '20px', top: 1, bottom: 1,
        width: '20px',
        lineHeight: 1,
        background: 'rgb(10,10,10)',
        display: 'flex',
        alignItems: 'center',
        fontSize: '11px',
        justifyContent: 'center',
        borderRight: '1px solid #222',
        cursor: 'pointer'
      }}
           onMouseDown={() => {
             targetContext = this;
             startValue = +this.props.value;
             const tick = time => {
               if (time - startTime > 100) {
                 this.update(+this.props.value + step);
               }
               console.log('여기냐');
               requestAni = requestAnimationFrame(tick);
             };
             requestAni = tick();
             startTime = performance.now();
             this.update(+this.props.value + step);
             window.addEventListener('mouseup', HD_up2);
           }}
           onClick={() => {
             if (this.props.HD_blur) {
               this.props.HD_blur({
                 target: {
                   value: +this.props.value
                 }
               });
             }
           }}
      >+
      </div>
      <div style={{
        position: 'absolute',
        right: 0, top: 1, bottom: 1,
        width: '20px',
        lineHeight: 1,
        background: 'rgb(10,10,10)',
        display: 'flex',
        alignItems: 'center',
        fontSize: '11px',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
           onMouseDown={() => {
             targetContext = this;
             startValue = +this.props.value;
             const tick = time => {
               if (time - startTime > 100) {
                 this.update(+this.props.value - step);
               }
               requestAni = requestAnimationFrame(tick);
             };
             requestAni = tick();
             startTime = performance.now();
             this.update(+this.props.value - step);
             window.addEventListener('mouseup', HD_up2);
           }}
           onClick={() => {
             if (this.props.HD_blur) {
               this.props.HD_blur({
                 target: {
                   value: +this.props.value
                 }
               });
             }
           }}
      >-
      </div>

    </div>;
  }
}

export default RedNumber2;
