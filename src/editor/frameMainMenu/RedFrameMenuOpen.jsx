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
import DataRedGradient from "../data/DataRedGradient";
import DataDevice from "../data/DataDevice";

class RedFrameMenuOpen extends React.Component {
  checkValidate(v) {
    /**
     * JSON 파싱이 되어야하고..
     * activeFrameKey 키를 가지고있는 경우만 통과
     *
     */
    let loadData;
    try {
      loadData = JSON.parse(v);
      if (!loadData.hasOwnProperty('activeFrameKey')) {
        let newData = new DataRedGradient();
        newData.main = loadData;
        loadData = newData;
      }
      let mainData = loadData['main'];
      // console.log(loadData);
      if (
        !loadData.hasOwnProperty('activeFrameKey')
        || !mainData.hasOwnProperty('activeLayer')
        || !mainData.hasOwnProperty('activeSubData')
        || !mainData.hasOwnProperty('layers')
      ) {
        return false;
      }
    } catch (e) {
      return false;
    }
    if (!loadData['device']) loadData['device'] = new DataDevice();
    return loadData;
  }

  render() {
    const rootComponent = this.props.rootComponent;
    return <div>
      <div
        style={{
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
                let t0 = this.checkValidate(evt.target.result);
                if (t0) {
                  window.actionHistoryCheckNum = 0;
                  rootComponent.setNewCanvas(t0);

                } else {
                  alert('RedGradient 형식의 파일이 아닙니다.');
                }
              });
            };
            fileReader.readAsText(e.target.files[0]);
          };
        }}
      >
        <FontAwesomeIcon icon={faFolderOpen} />
      </div>
    </div>;
  }
}

export default RedFrameMenuOpen;
