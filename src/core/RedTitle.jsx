import React from "react";

class RedTitle extends React.Component {
  render() {
    return <div className={'ui_title'} style={this.props.style || {}}>
      {this.props.title}
    </div>;
  }
}

export default RedTitle;
