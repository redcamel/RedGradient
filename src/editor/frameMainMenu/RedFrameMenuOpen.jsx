/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFolderOpen} from "@fortawesome/free-solid-svg-icons";
import DataCanvas from "../data/DataCanvas.js";

class RedFrameMenuOpen extends React.Component {
  render() {
    const rootComponent = this.props.rootComponent
    return <div>
      <div style={{
        fontSize: '26px',
        margin: '5px',
        cursor: 'pointer'
      }}
           onClick={e => {
             const a = document.createElement('input');
             a.setAttribute('accept', '.json');
             a.setAttribute('type', 'file');
             a.click();
             a.onchange = e => {
               console.log(e);
               console.log(e.target.files);
               let fileReader = new FileReader();
               fileReader.onload = evt => {
                 rootComponent.setNewCanvas(new DataCanvas())
                 requestAnimationFrame(e => {
                   rootComponent.setNewCanvas(JSON.parse(evt.target.result))
                 })
               };
               fileReader.readAsText(e.target.files[0]);
             };
           }}
      ><FontAwesomeIcon icon={faFolderOpen}/>
      </div>
    </div>
  }
}

export default RedFrameMenuOpen;
