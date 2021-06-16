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
import DataGradient from "../data/DataGradient";

class RedFrameMenuOpen extends React.Component {
  checkValidate(v) {
    /**
     * JSON 파싱이 되어야하고..
     * activeFrameKey 키를 가지고있는 경우만 통과
     *
     */
    let result = true;
    let loadData
    try {
       loadData = JSON.parse(v);
      if(!loadData.hasOwnProperty('activeFrameKey')) {
        let newData = new DataGradient()
        newData.main =loadData
        loadData = newData
      }
      console.log(loadData)
      if (
        !loadData.hasOwnProperty('activeFrameKey')
        || !loadData.hasOwnProperty('main')
        || !loadData.hasOwnProperty('before')
        || !loadData.hasOwnProperty('after')
      ) {
        result = false;
      }
    } catch (e) {
      result = false;
    }
    return loadData;
  }

  render() {
    const rootComponent = this.props.rootComponent;
    return <div>
      <div style={{
        fontSize: '26px',
        margin: '5px',
        cursor: 'pointer'
      }}
           onClick={() => {
             const a = document.createElement('input');
             a.setAttribute('accept', '.json');
             a.setAttribute('type', 'file');
             a.click();
             a.onchange = e => {
               // console.log(e);
               // console.log(e.target.files);
               let fileReader = new FileReader();
               fileReader.onload = evt => {
                 requestAnimationFrame(() => {
                   let t0 = this.checkValidate(evt.target.result)
                   if (t0) rootComponent.setNewCanvas(t0);
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
