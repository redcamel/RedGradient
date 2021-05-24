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
    return <>
      {this.props.title ? <span className={'ui_item_title'}>{this.props.title}</span> : ''}
      <input
        style={{width: `${this.props.width || ''}`, flexGrow: 1,fontSize : this.props.fontSize}}
        type={'number'}
        step={this.props.step || 1}
        max={this.props.maxValue}
        min={this.props.minValue}
        value={this.props.value}
        onInput={this.props.HD_onInput}
        onBlur={this.props.HD_blur}
      />
    </>;
  }
}

export default RedNumber;
