import React from "react";

class UI_Select extends React.Component {

  render() {
    console.log(this.props.options)
    return <select
      style={{width: `${this.props.width || ''}px`}}
      onChange={this.props.HD_change}
    >
      {(this.props.options || []).map(v => {
        const activeYn = this.props.value === v;
        console.log(v, activeYn);
        return <option value={v} selected={activeYn}>{v}</option>;
      })}
    </select>;
  }
}

export default UI_Select;
