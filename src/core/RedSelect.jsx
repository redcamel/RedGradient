/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";

class RedSelect extends React.Component {
  render() {
    return <>
      {this.props.title ? <span className={'ui_item_title'}>{this.props.title}</span> : ''}
      <select
        style={{width: `${this.props.width || ''}px`, flexGrow: 1}}
        onChange={this.props.HD_change}
        onBlur={this.props.HD_blur}
      >
        {(this.props.options || []).map(v => {
          if (!(v instanceof Array)) v = [v, v];
          const activeYn = this.props.value === v[1];
          return <option value={v[1]} selected={activeYn}>{v[0]}</option>;
        })}
      </select>
    </>;
  }
}

export default RedSelect;
