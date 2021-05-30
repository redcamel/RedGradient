/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
// class RedNumber extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       isMouseDown: false,
//       initialMousePos: null,
//       initialValue: 0,
//       value: +props.value,
//       step: props.step || 0.1
//     };
//     this.handleMouseDown = this.handleMouseDown.bind(this);
//     this.handleMouseMove = this.handleMouseMove.bind(this);
//     this.handleMouseUp = this.handleMouseUp.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.handleInput = this.handleInput.bind(this);
//   }
//
//   handleMouseDown(e) {
//     const initialMousePos = {
//       x: e.pageX,
//       y: e.pageY
//     };
//     this.setState({
//       initialMousePos,
//       initialValue: this.state.value,
//       isMouseDown: true
//     });
//     document.addEventListener("mousemove", this.handleMouseMove);
//     document.addEventListener("mouseup", this.handleMouseUp);
//   }
//
//   handleMouseMove(e) {
//     if (this.state.isMouseDown) {
//       // console.log(this.state)
//       // console.log(this.props)
//       const {minValue, maxValue} = this.props;
//       let newValue =
//         this.state.initialValue +
//         (e.pageX - this.state.initialMousePos.x) * this.state.step;
//       newValue = this.constrain(newValue, minValue, maxValue);
//       this.setState({
//         value: newValue
//       });
//       this.props.HD_onInput({
//         target: {
//           value: newValue
//         }
//       })
//     }
//   }
//
//   handleMouseUp(e) {
//     this.setState({
//       isMouseDown: false
//     });
//   }
//
//   handleInput(e) {
//     if (e.which < 48 || e.which > 57) return e.preventDefault();
//     this.setState({value: e.target.value});
//   }
//
//   handleChange(e) {
//     const {minValue, maxValue} = this.props;
//     const value = isNaN(parseFloat(e.target.value))
//       ? 0
//       : parseFloat(e.target.value);
//     this.setState({
//       value: this.constrain(value, minValue, maxValue)
//     });
//   }
//
//   constrain(value, minValue, maxValue, decimals) {
//     // console.log(value, minValue, maxValue)
//     decimals = typeof decimals !== "undefined" ? decimals : 0;
//     if (minValue !== undefined && maxValue !== undefined) {
//       return this.round(
//         Math.min(Math.max(parseFloat(value), minValue), maxValue),
//         decimals
//       );
//     } else {
//       return value;
//     }
//   }
//
//   round(value, decimals) {
//     return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
//   }
//
//   render() {
//     return (
//       <div style={{width: `${this.props.width || ''}`, flexGrow: 1, display: 'inline-block', whiteSpace: 'nowrap'}}>
//         {this.props.title ? <span className={'ui_item_title'}>{this.props.title}</span> : ''}
//         <input
//           style={{
//             width: 'calc(100% - 40px)',
//             borderTopRightRadius: 0,
//             borderBottomRightRadius: 0,
//             fontSize: this.props.fontSize,
//             cursor: "ew-resize"
//           }}
//           type={'number'}
//           onMouseDown={this.handleMouseDown}
//           onKeyPress={this.handleInput}
//           onChange={this.handleChange}
//           value={this.state.value}
//           onInput={this.props.HD_onInput}
//           onBlur={this.props.HD_blur}
//         />
//         <div style={{
//           position: 'absolute',
//           right: '20px', top: 1, bottom: 1,
//           width: '20px',
//           lineHeight: 1,
//           background: 'rgb(10,10,10)',
//           display: 'flex',
//           alignItems: 'center',
//           fontSize: '11px',
//           justifyContent: 'center',
//           borderRight: '1px solid #222',
//           cursor: 'pointer'
//         }}
//              onClick={e => {
//                this.state.value += this.state.step
//                this.setState({})
//                this.props.HD_onInput({
//                  target: {
//                    value: this.state.value
//                  }
//                })
//              }}
//         >+
//         </div>
//         <div style={{
//           position: 'absolute',
//           right: 0, top: 1, bottom: 1,
//           width: '20px',
//           lineHeight: 1,
//           background: 'rgb(10,10,10)',
//           display: 'flex',
//           alignItems: 'center',
//           fontSize: '11px',
//           justifyContent: 'center',
//           cursor: 'pointer'
//         }}
//
//              onClick={e => {
//                this.state.value -= this.state.step
//                this.setState({})
//                this.props.HD_onInput({
//                  target: {
//                    value: this.state.value
//                  }
//                })
//              }}
//         >-
//         </div>
//
//       </div>
//     );
//   }
// }
//
// RedNumber.propTypes = {
//   minValue: PropTypes.number,
//   maxValue: PropTypes.number,
//   step: PropTypes.number,
//   value: PropTypes.number
// };
// RedNumber.defaultValues = {
//   minValue: 0,
//   maxValue: 500,
//   step: 1,
//   value: 7
// };
// export default RedNumber;
let targetContext;
let startX, startY, startValue
const HD_move = e => {
  targetContext.calc(e);
};
const HD_up = () => {
  window.removeEventListener('mousemove', HD_move);
  window.removeEventListener('mouseup', HD_up);
};

class RedNumber extends React.Component {
  calc(e) {
    const step = this.props.step || 0.1
    const tX = e.pageX - startX;
    console.log(e.pageX)
    this.update(+startValue + tX * step)
  }

  update(v) {
    if (this.props.hasOwnProperty('minValue')) if (v < this.props.minValue) v = this.props.minValue
    if (this.props.hasOwnProperty('maxValue')) if (v > this.props.maxValue) v = this.props.maxValue
    this.props.HD_onInput({
      target: {
        value: v
      }
    })
  }

  render() {
    const step = this.props.step || 1
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
          this.update(+e.target.value)
        }}
        onBlur={this.props.HD_blur}
        onMouseDown={e => {
          targetContext = this;
          startValue = +this.props.value
          startX = e.nativeEvent.pageX
          startY = e.nativeEvent.pageY
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
           onClick={e => {
             this.update(+this.props.value + step)
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

           onClick={e => {
             this.update(+this.props.value - step)
           }}
      >-
      </div>

    </div>
  }
}

export default RedNumber;
