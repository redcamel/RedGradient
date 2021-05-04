import React from "react"
class UI_Number extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return  <input
      style={{width : `${this.props.width || ''}`  }}
      type={'number'}
      value={this.props.value}
      onInput={this.props.HD_onInput}
    />
  }
}
export default UI_Number
