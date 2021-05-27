/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";

class RedTextField extends React.Component {
  render() {
    return <div style={{display: 'flex', alignItems: 'center'}}>
      {this.props.title ? <span className={'ui_item_title'}>{this.props.title}</span> : ''}
      <input
        style={{width: `${this.props.width || ''}`}}
        type={'text'}
        value={this.props.value}
        onInput={this.props.HD_onInput}
      />
    </div>;
  }
}

export default RedTextField;
