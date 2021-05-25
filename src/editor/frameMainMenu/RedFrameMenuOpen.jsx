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

class RedFrameMenuOpen extends React.Component {
  checkValidate(v) {
    /**
     * JSON 파싱이 되어야하고..
     * activeLayer,activeSubData,layers 키를 가지고있는 경우만 통과
     *
     */
    let result = true;
    try {
      let t0 = JSON.parse(v);
      if (
        !t0.hasOwnProperty('activeLayer')
        || !t0.hasOwnProperty('activeSubData')
        || !t0.hasOwnProperty('layers')
      ) {
        result = false;
      }
    } catch (e) {
      result = false;
    }
    return result;
  }

  render() {
    const rootComponent = this.props.rootComponent;
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

                 requestAnimationFrame(e => {
                   if (this.checkValidate(evt.target.result)) rootComponent.setNewCanvas(JSON.parse(evt.target.result));
                   else alert('RedGradient 형식의 파일이 아닙니다.')
                 });
               };
               fileReader.readAsText(e.target.files[0]);
             };
           }}
      ><FontAwesomeIcon icon={faFolderOpen}/>
      </div>
    </div>;
  }
}

export default RedFrameMenuOpen;
