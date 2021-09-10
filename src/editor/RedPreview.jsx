/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedGradientEditComp from "./edit/gradient/RedGradientEditComp.jsx";
import ACTIVE_FRAME_KEY from "../js/const/ACTIVE_FRAME_KEY.js";
import js_beautify from "js-beautify";
import {toast} from "react-toastify";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCopy} from "@fortawesome/free-solid-svg-icons";

class RedPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    let beforeText = RedGradientEditComp.getContainerCssText(rootComponentState[ACTIVE_FRAME_KEY.BEFORE]);
    let mainText = RedGradientEditComp.getContainerCssText(rootComponentState[ACTIVE_FRAME_KEY.MAIN]);
    let afterText = RedGradientEditComp.getContainerCssText(rootComponentState[ACTIVE_FRAME_KEY.AFTER]);
    let beforeText2 = beforeText.replace('.result', '.red_gradient_result');
    let mainText2 = mainText.replace('.result', '.red_gradient_result');
    let afterText2 = afterText.replace('.result', '.red_gradient_result');
    document.getElementById('red_gradient_result_css').textContent = `
    ${beforeText2}
    ${mainText2}
    ${afterText2}
    `;

    let beforeCanvasInfo = rootComponentState[ACTIVE_FRAME_KEY.BEFORE]['canvasInfo'];
    let mainCanvasInfo = rootComponentState[ACTIVE_FRAME_KEY.MAIN]['canvasInfo'];
    let afterCanvasInfo = rootComponentState[ACTIVE_FRAME_KEY.AFTER]['canvasInfo'];
    return <div style={style.bg}>
      <div style={style.container}>
        <div style={{display: 'flex', flex: 1, width: '100%'}}>
          <div style={{display: 'flex', flexDirection: 'column', width: '360px', margin: '7px 10px'}}>
            {
              [
                {
                  title: 'before',
                  targetCanvasInfo: beforeCanvasInfo,
                  text: beforeText,
                  itemList: [
                    [{key: 'width'}, {key: 'height'},],
                    [{key: 'left'}, {key: 'top'},]
                  ]
                },
                {
                  title: 'main',
                  text: mainText,
                  targetCanvasInfo: mainCanvasInfo,
                  itemList: [
                    [{key: 'width'}, {key: 'height'},]
                  ]
                },
                {
                  title: 'after',
                  text: afterText,
                  targetCanvasInfo: afterCanvasInfo,
                  itemList: [
                    [{key: 'width'}, {key: 'height'},],
                    [{key: 'left'}, {key: 'top'},]
                  ]
                }
              ].map(v => {
                return <div
                  style={{margin: '3px 0px', padding: '10px', border: '1px solid #111', borderRadius: '10px'}}>
                  <div style={{fontSize: '16px', color: '#efb26a'}}>{v['title']}</div>
                  <div style={{maxHeight: '150px', overflowY: 'scroll'}}>{v['text']}</div>
                  {v['title'] === 'main' ?
                    <div style={{fontSize: '14px', color: '#efb26a', marginTop: '5px'}}>출력시 top, left는 0으로
                      출력됩니다.</div> : ''}
                </div>;
              })
            }
            <button
              style={{
                cursor: 'pointer',
                padding: '6px',
                fontSize: '12px',
                color: '#fff',
                outline: 'none',
                border: '1px solid #111',
                background: 'linear-gradient(#5e7ade, #2c3565)',
                borderRadius: '4px'
              }}
              onClick={() => {
                const tempElem = document.createElement('textarea');

                tempElem.value = js_beautify.css_beautify(`
    ${beforeText}
    ${RedGradientEditComp.getContainerCssText(rootComponentState[ACTIVE_FRAME_KEY.MAIN], true)}
    ${afterText}
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

          <div style={{
            display: 'flex', flex: 1, alignItems: 'center', justifyItems: 'center',
            background: '#000'
          }}>
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
              width: `${rootComponentState.device['width']}px`,
              height: `${rootComponentState.device['height']}px`,
              background: '#fff',
              overflow: 'hidden'
            }}>
              <div style={{
                // position: 'absolute',
                // top: '50%', left: '50%',
                // transform: 'translate(-50%,-50%)'
              }}
              >
                <div className={"red_gradient_result"} />
              </div>
            </div>
          </div>

        </div>
        <div style={{margin: '16px 0px', position: 'sticky', bottom: 0}}>
          <button
            style={{
              color: '#fff',
              background: '#666',
              padding: '8px 16px',
              borderRadius: '8px',
              outline: 'none',
              border: 0,
              cursor: 'pointer'
            }}
            onClick={() => {
              rootComponent.updateRootState({});
              this.props.HD_Close();
            }}
          >Close
          </button>
        </div>
      </div>
    </div>;
  }
}

export default RedPreview;
const
  style = {
    bg: {
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.46)',
      zIndex: 3
    },
    container: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      overflowY: 'auto',
      width: 'calc(100% - 160px)',
      height: 'calc(100% - 160px)',
      background: '#333',
      borderRadius: '8px',
      border: '1px solid #000',
      boxShadow: '0 0 16px rgba(0,0,0,0.16)',
      zIndex: 1,
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      flexDirection: 'column'
    },
  };
