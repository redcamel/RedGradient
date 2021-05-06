import React from "react";

class UI_Number extends React.Component {


  render() {
    return <input
      style={{width: `${this.props.width || ''}`}}
      type={'number'}

      max={this.props.maxValue}
      value={this.props.value}
      onInput={this.props.HD_onInput}
      onBlur={this.props.HD_blur}
    />;
  }
}

export default UI_Number;
