/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";

class FrameStatus extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className={'frame_status'}>
      <a href={'https://github.com/redcamel/RedGradient'} target={'_blank'}>GitHub :
        https://github.com/redcamel/RedGradient</a>
      <div>This project is maintained by <a href={'mailto:webseon@gmail.com'}>RedCamel</a></div>
    </div>
  }
}

export default FrameStatus
