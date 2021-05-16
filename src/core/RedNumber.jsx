/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */

import React from "react";

class RedNumber extends React.Component {
  render() {
    return <input
      style={{width: `${this.props.width || ''}`, flexGrow: 1}}
      type={'number'}
      step={this.props.step || 1}
      max={this.props.maxValue}
      value={this.props.value}
      onInput={this.props.HD_onInput}
      onBlur={this.props.HD_blur}
    />;
  }
}

export default RedNumber;
