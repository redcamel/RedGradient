import React from "react";

class RedTitle extends React.Component {
  render() {
    return <div className={'ui_title'}>
      {this.props.title}
    </div>;
  }
}

export default RedTitle;
