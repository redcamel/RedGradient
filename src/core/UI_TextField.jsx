import React from "react"
class UI_TextField extends React.Component{
  constructor(props) {
    super(props);
  }
  render(){
    return <div style={style.container}>
      <input
        type={'text'}
        value={this.props.value}
        onInput={this.props.HD_onInput}
      />
    </div>
  }
}
export default UI_TextField
const style = {
  container : {
    display : 'inline-block'
  }
}
