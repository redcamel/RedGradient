import React from "react";

class RedRadio extends React.Component {
  render() {
    return <div
      style={{display: 'flex',flexWrap: 'wrap', width: `${this.props.width || ''}px`, margin: '5px 0px'}}
    >
      {(this.props.options || []).map(v => {
        // console.log(this.props.options)
        const activeYn = this.props.value === v[1];
        return <label style={{display: 'flex', cursor: 'pointer', marginRight: '5px'}}>
          <input
            style={{marginRight: '5px'}}
            type={'radio'} value={v[1]} checked={activeYn}
            onClick={this.props.HD_change}
          />{v[0]}
        </label>;
      })}
    </div>;
  }
}

export default RedRadio;
