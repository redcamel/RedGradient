/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedSelect from "../../../core/RedSelect.jsx";
import BORDER_REPEAT_TYPE from "../../../const/BORDER_REPEAT_TYPE.js";

class RedCanvasBorderGradientRepeatEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const borderGradientInfo = rootComponent.state;
    return <div>
      <div style={{display: 'flex', marginTop: '3px', alignItems: 'center'}}>
        <RedSelect
          title={'Repeat'}
          value={borderGradientInfo['border_image_repeat']}
          options={Object.entries(BORDER_REPEAT_TYPE)}
          HD_change={e => {
            borderGradientInfo['border_image_repeat'] = e.target.value;
            rootComponent.updateRootState({});
          }} />
      </div>
    </div>;
  }
}

export default RedCanvasBorderGradientRepeatEdit;
