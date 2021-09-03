/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import '../App.css';
import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import ACTIVE_FRAME_KEY from "../js/const/ACTIVE_FRAME_KEY";
import RedPreview from "./RedPreview.jsx";
import getUUID from "../js/getUUID.js";
import js_beautify from "js-beautify";
import RedGradientEditComp from "./edit/gradient/RedGradientEditComp";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy, faEye, faEyeSlash, faPlayCircle, faUserEdit} from "@fortawesome/free-solid-svg-icons";

class ActiveSelectBar extends React.Component {
  render() {
    const appComponent = this.props.appComponent;
    const appComponentState = appComponent.state;
    return <div>
      <div style={{
        display: 'flex',
        height: '100%',
        alignItem: 'center',
        border: '1px solid #000',
        borderTop: 0,
        borderLeft: 0,
        zIndex: 1,
        background: '#333'
      }}>
        <div style={{
          display: 'flex'
        }}>
          {
            Object.values(ACTIVE_FRAME_KEY).map(key => {
              const activeYn = appComponentState.activeFrameKey === key
              return <div
                style={{
                  display: 'flex',
                  width: '100px',
                  height: '30px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  borderRight: '1px solid #000',
                  // fontWeight:'bold',
                  color :activeYn ?'#fff': '#efb26a',
                  background: activeYn ? 'linear-gradient(#5e7ade, #2c3565)' : '#333'
                }}
                onClick={() => {
                  appComponentState.activeFrameKey = key;
                  console.log(appComponentState);
                  appComponent.updateRootState({});
                }}
              ><FontAwesomeIcon icon={faUserEdit} style={{marginRight: '6px',opacity : activeYn ? 1 : 0.3}} /> {key.toUpperCase()}</div>;
            })
          }
          <div
            style={{
              display: 'flex',
              width: '100px',
              height: '30px',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              borderRight: '1px solid #000',
              background: '#333'
            }}
            onClick={() => {
              this.previewModeYn = true;
              this.previewModeKey = getUUID();
              this.setState({});
            }}
          ><FontAwesomeIcon icon={faPlayCircle} style={{marginRight: '6px'}} />Preview
          </div>
          {this.previewModeYn ? <RedPreview
            key={this.previewModeKey}
            rootComponent={appComponent}
            HD_Close={() => {
              this.previewModeYn = false;
              this.setState({});
            }} /> : ''}
        </div>
        <button
          style={{
            cursor: 'pointer',
            padding: '6px 10px',
            fontSize: '11px',
            color: '#fff',
            outline: 'none',
            border : 0,
            background: 'linear-gradient(#5e7ade, #2c3565)'
          }}
          onClick={() => {
            const tempElem = document.createElement('textarea');

            tempElem.value = js_beautify.css_beautify(`
    ${RedGradientEditComp.getContainerCssText(appComponentState[ACTIVE_FRAME_KEY.BEFORE], )}
    ${RedGradientEditComp.getContainerCssText(appComponentState[ACTIVE_FRAME_KEY.MAIN], true)}
    ${RedGradientEditComp.getContainerCssText(appComponentState[ACTIVE_FRAME_KEY.AFTER], )}
    `, {
              indent_size: 2,
              space_in_empty_paren: true,
              max_preserve_newlines: 1
            });
            document.body.appendChild(tempElem);
            tempElem.select();
            document.execCommand("copy");
            document.body.removeChild(tempElem);
            toast.dark("Copy Result Class!", {
              position: 'bottom-left'
            });
          }}
        ><FontAwesomeIcon icon={faCopy} style={{marginRight: '6px'}} />Copy Result Class
        </button>
      </div>

    </div>;
  }
}

export default ActiveSelectBar;
