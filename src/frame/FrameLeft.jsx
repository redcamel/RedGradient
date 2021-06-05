/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import LOCAL_STORAGE_MANAGER from "../editor/LOCAL_STORAGE_MANAGER.js";
import RedTitleTB from "../core/RedTitleTB.jsx";
import {faFolder, faFolderOpen} from "@fortawesome/free-solid-svg-icons";
import RedCanvasEdit from "../editor/canvas/edit/RedCanvasEdit.jsx";

class FrameLeft extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent

    return <div className={'frame_left'}>
      {/*frame Left*/}
      <div style={{display: "flex", height: '100%'}}>
        <div
          style={{background: 'rgb(60, 60, 60)'}}
          onClick={e => {
            LOCAL_STORAGE_MANAGER.toggleTabOpenYn('containerProperty')
            rootComponent.updateRootState({})
          }}
        >
          <RedTitleTB
            icon={LOCAL_STORAGE_MANAGER.getTabOpenYn('containerProperty') ? faFolderOpen : faFolder}
            title={'Container Property'}
            writingMode={'tb'}
            background={LOCAL_STORAGE_MANAGER.getTabOpenYn('containerProperty') ? 'rgb(32, 32, 32)' : ''}
          />
        </div>
        {
          LOCAL_STORAGE_MANAGER.getTabOpenYn('containerProperty') ?
            <div style={{
              display: "flex", height: '100%', overflowY: 'auto',
              borderLeft: '1px solid rgb(26, 26, 26)',
            }}>
              <RedCanvasEdit rootComponent={rootComponent} />
            </div> : ''
        }

      </div>
    </div>
  }
}

export default FrameLeft
