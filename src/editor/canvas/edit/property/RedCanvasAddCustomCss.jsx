/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";

class RedCanvasAddCustomCss extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    return <div>
      <div className={'ui_subTitle'}>Add Custom Css</div>
      <div style={style.container}>
        <textarea
          style={style.area}
          value = {canvasInfo['addCss']}
          onInput={e=>{
            canvasInfo['addCss'] = e.target.value
            rootComponent.updateRootState({})
          }}
        />
      </div>
    </div>;
  }
}

export default RedCanvasAddCustomCss;
const style = {
  container: {
    display: 'flex',
    alignItems: 'center',
    padding : '10px 10px 0px'
  },
  area : {
    width : '100%',
    minHeight : '300px',
    border : '1px solid rgba(0,0,0,0.16)',
    borderRadius : '4px',
    background : 'rgba(0,0,0,0.16)',
    color : '#fff',
    padding : '10px',
    outline : 'none'
  }
}
