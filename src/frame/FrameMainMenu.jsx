/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedCanvas from "../editor/canvas/RedCanvas.jsx";
import RedFrameMenuOpen from "../editor/frameMainMenu/RedFrameMenuOpen.jsx";
import RedFrameMenuSave from "../editor/frameMainMenu/RedFrameMenuSave.jsx";

class FrameMainMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent
    return  <div className={'frame_main_menu'}>
      <div style={{display: 'flex', alignItems: 'center', fontSize: '16px', fontWeight: 'bold', margin: '0px 8px'}}>
        <img src={'./tempLogo.svg'} height={'26px'} style={{marginRight: '7px'}}/>
        RedGradient
      </div>
      <RedFrameMenuOpen rootComponent={rootComponent}/>
      <RedFrameMenuSave rootComponent={rootComponent}/>
    </div>
  }
}

export default FrameMainMenu
