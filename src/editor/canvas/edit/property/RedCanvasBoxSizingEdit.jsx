/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedSelect from "../../../../core/RedSelect.jsx";

class RedCanvasBoxSizingEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {canvasBgColorPickerOpenYn: false};
    this.refColorPickerContainer = React.createRef();
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    return <div style={style.container}>
      <div style={{
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className={'ui_subTitle'}>boxSizing</div>
        <RedSelect
          width={'90'}
          value={canvasInfo['box_sizing']}
          options={['border-box', 'content-box']}
          HD_change={e => {
            canvasInfo['box_sizing'] = e.target.value;
            rootComponent.updateRootState({});
          }} />

      </div>
    </div>;
  }
}

export default RedCanvasBoxSizingEdit;
const style = {
  container: {}
};
