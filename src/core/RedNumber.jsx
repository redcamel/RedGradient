import React from "react";

class RedNumber extends React.Component {
  render() {
    return <input
      style={{width: `${this.props.width || ''}`,flexGrow:10}}
      type={'number'}
      max={this.props.maxValue}
      value={this.props.value}
      onInput={this.props.HD_onInput}
      onBlur={this.props.HD_blur}
    />;
  }
}

export default RedNumber;
