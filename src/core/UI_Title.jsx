import React from "react";

class UI_Title extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div className={'ui_title'}>
      {this.props.title}
    </div>;
  }
}

export default UI_Title;
