import React from "react";

class RedRadio extends React.Component {
  render() {
    return <div
      style={{display: 'flex', width: `${this.props.width || ''}px`, margin: '5px 0px'}}
    >
      {(this.props.options || []).map(v => {
        const activeYn = this.props.value === v;
        return <label style={{display: 'flex', cursor: 'pointer', marginRight: '5px'}}>
          <input
            style={{marginRight: '5px'}}
            type={'radio'} value={v} checked={activeYn}
            onClick={this.props.HD_change}
          />{v}
        </label>;
      })}
    </div>;
  }
}

export default RedRadio;
