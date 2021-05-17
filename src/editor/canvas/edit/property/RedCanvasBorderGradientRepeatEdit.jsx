/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedSelect from "../../../../core/RedSelect.jsx";
import BORDER_REPEAT_TYPE from "../../../BORDER_REPEAT_TYPE.js";

class RedCanvasBorderGradientRepeatEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const borderGradientInfo = rootComponentState;
    return <div>
      <div style={{display: 'flex', marginTop: '3px', alignItems: 'center'}}>
        Repeat
        <RedSelect
          value={borderGradientInfo['border_image_repeat']}
          options={Object.entries(BORDER_REPEAT_TYPE)}
          HD_change={e => {
            borderGradientInfo['border_image_repeat'] = e.target.value;
            rootComponent.updateRootState({});
          }}/>
      </div>
    </div>;
  }
}

export default RedCanvasBorderGradientRepeatEdit;
const style = {
  icon: {
    width: '30px',
    height: '30px',
    borderRadius: '5px',
    border: '1px solid #000',
    overflow: 'hidden',
    marginRight: '5px',
    cursor: 'pointer'
  },
  baseBg: {
    position: 'absolute',
    top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
    width: '100%', height: '100%',
  }
};
