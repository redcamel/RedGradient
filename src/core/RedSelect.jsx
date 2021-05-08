import React from "react";

class RedSelect extends React.Component {
  render() {
    return <select
      style={{width: `${this.props.width || ''}px`}}
      onChange={this.props.HD_change}
      onBlur={this.props.HD_blur}
    >
      {(this.props.options || []).map(v => {
        const activeYn = this.props.value === v;
        return <option value={v} selected={activeYn}>{v}</option>;
      })}
    </select>;
  }
}

export default RedSelect;
