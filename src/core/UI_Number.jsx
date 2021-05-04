import React from "react"
class UI_Number extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return <div style={style.container}>
      <input
        style={{width : `${this.props.width || ''}px`  }}
        type={'number'}
        value={this.props.value}
        onInput={this.props.HD_onInput}
      />
    </div>
  }
}
export default UI_Number
const style = {
  container : {
    display : 'inline-block'
  }
}
