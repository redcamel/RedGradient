import React from "react"
class UI_TextField extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return  <input
      style={{width : `${this.props.width || ''}`  }}
      type={'text'}
      value={this.props.value}
      onInput={this.props.HD_onInput}
    />
  }
}
export default UI_TextField
