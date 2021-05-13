/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSave} from "@fortawesome/free-solid-svg-icons";

class RedFrameMenuSave extends React.Component {
  render() {
    const rootComponent = this.props.rootComponent
    const rootComponentState = rootComponent.state
    return <div
      style={{
        fontSize: '16px',
        margin: '5px',
        cursor: 'pointer'
      }}
      onClick={e => {
        const a = document.createElement('a');
        const file = new Blob([JSON.stringify(rootComponentState)], {type: 'application/json'});
        a.href = URL.createObjectURL(file);
        a.download = `RedGradient.json`;
        a.click();
        URL.revokeObjectURL(a.href);
      }}

    ><FontAwesomeIcon icon={faSave}/>
    </div>
  }
}

export default RedFrameMenuSave;
