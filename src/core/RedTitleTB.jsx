/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class RedTitleTB extends React.Component {
  render() {
    return <div className={'ui_title_tb'} style={{
      writingMode: this.props.writingMode, whiteSpace: 'nowrap',
      background: this.props.background
    }}>
      {this.props.icon ?
        <FontAwesomeIcon icon={this.props.icon} style={{transform: 'rotate(90deg)', marginBottom: '6px'}}/> : ''}
      {this.props.title}
    </div>;
  }
}
RedTitleTB.TAB_LIST = ['Container', 'Border']
export default RedTitleTB;
