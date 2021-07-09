/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedTitle from "../../core/RedTitle.jsx";
import RedTextField from "../../core/RedTextField.jsx";
import RedGradientColorEdit from "./sub/RedGradientColorEdit.jsx";
import RedGradientPositionEditByMouse from "./sub/RedGradientPositionEditByMouse.jsx";
import RedGradientTypeEdit from "./sub/RedGradientTypeEdit.jsx";
import RedGradientPositionEdit from "./sub/RedGradientPositionEdit.jsx";
import RedGradientDegreeEdit from "./sub/RedGradientDegreeEdit.jsx";
import RedGradientRepeatEdit from "./sub/RedGradientRepeatEdit.jsx";
import RedGradientEndingShapeEdit from "./sub/RedGradientEndingShapeEdit";
import RedGradientAtEdit from "./sub/RedGradientAtEdit";
import GRADIENT_TYPE from "../../const/GRADIENT_TYPE";
import RedGradientSizeEdit from "./sub/RedGradientSizeEdit";
import RedGradientBlendEdit from "./sub/RedGradientBlendEdit";
import RedCanvas from "../canvas/RedCanvas";
import CALC_GRADIENT from "../../const/CALC_GRADIENT";
import {toast} from "react-toastify";
import ACTIVE_FRAME_KEY from "../../const/ACTIVE_FRAME_KEY.js";
import js_beautify from 'js-beautify';

class RedGradientEditComp extends React.Component {
  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const data = rootComponentState.activeSubData;
    let containerCssText = RedGradientEditComp.getContainerCssText(rootComponentState);
    return <div style={{borderLeft: '1px solid rgb(0, 0, 0)'}}>
      <RedTitle title={'Gradient Edit'} />
      <div style={style.container}>
        <div style={style.contentWrap}>
          <div style={{overflowY: 'auto', paddingRight: '5px', marginRight: '15px', borderRight: '1px solid #0c0b0b'}}>
            <div style={{...style.itemContainer, width: '250px'}}>
              <div>
                <RedTextField
                  title={'name'}
                  width={'calc(100% - 4px)'}
                  value={data['title']} HD_onInput={e => {
                  data['title'] = e.target.value;
                  rootComponent.updateRootState({});
                }} />
                <div style={style.divide} />
                <RedGradientTypeEdit rootComponent={rootComponent} />
                <div style={style.divide} />
                <RedGradientRepeatEdit rootComponent={rootComponent} />
                <div style={style.divide} />
                <RedGradientBlendEdit rootComponent={rootComponent} />
                {data.type === GRADIENT_TYPE.RADIAL || data.type === GRADIENT_TYPE.REPEAT_RADIAL ? <>
                  <div style={style.divide} />
                  <RedGradientEndingShapeEdit rootComponent={rootComponent} />
                </> : ''}
                {data.type === GRADIENT_TYPE.LINEAR || data.type === GRADIENT_TYPE.REPEAT_LINEAR || data.type === GRADIENT_TYPE.CONIC || data.type === GRADIENT_TYPE.REPEAT_CONIC ?
                  <>
                    <div style={style.divide} />
                    <RedGradientDegreeEdit rootComponent={rootComponent} />
                  </> : ''}
                <div style={style.divide} />
                <RedGradientSizeEdit rootComponent={rootComponent} />
                {data.type === GRADIENT_TYPE.RADIAL || data.type === GRADIENT_TYPE.REPEAT_RADIAL || data.type === GRADIENT_TYPE.CONIC || data.type === GRADIENT_TYPE.REPEAT_CONIC ? <>
                  <div style={style.divide} />
                  <RedGradientAtEdit rootComponent={rootComponent} />
                </> : ''}
              </div>

              <div style={style.divide} />
              <RedGradientPositionEdit rootComponent={rootComponent} />

              <div style={style.divide} />
              <div style={{display: 'flex'}}>
                <div>
                  position
                  <RedGradientPositionEditByMouse rootComponent={rootComponent} targetKey={'position'} />
                </div>
                {data.type === GRADIENT_TYPE.RADIAL || data.type === GRADIENT_TYPE.REPEAT_RADIAL || data.type === GRADIENT_TYPE.CONIC || data.type === GRADIENT_TYPE.REPEAT_CONIC ?
                  <div>
                    center
                    <RedGradientPositionEditByMouse rootComponent={rootComponent} targetKey={'at'} />
                  </div> : ''
                }

              </div>

              {/*  */}
              <div style={{
                display: "flex",
                height: '100%',
                alignContent: 'space-between',
                flexDirection: 'column',
                marginBottom: '20px'
              }}>
                <div style={{marginTop: '10px'}}>
                  <div style={{overflowY: 'auto'}}>
                    <RedTitle title={'Result'} />
                    <button
                      style={style.copyClass}
                      onClick={() => {
                        const tempElem = document.createElement('textarea');

                        tempElem.value = js_beautify.css_beautify(containerCssText, {
                          indent_size: 2,
                          space_in_empty_paren: true,
                          max_preserve_newlines: 1
                        });
                        document.body.appendChild(tempElem);
                        tempElem.select();
                        document.execCommand("copy");
                        document.body.removeChild(tempElem);
                        toast.dark("Copy Class!", {
                          position: 'bottom-left'
                        });
                      }}
                    >Copy Class
                    </button>
                    {containerCssText}
                  </div>

                </div>
                <div>TODO - 애드센스자리</div>
              </div>
            </div>
          </div>
          <div style={{...style.itemContainer, width: '360px'}}>
            <RedGradientColorEdit rootComponent={rootComponent} />
          </div>
        </div>
      </div>
    </div>;
  }
}

RedGradientEditComp.getContainerCssText = (rootComponentState) => {
  const canvasInfo = rootComponentState.canvasInfo;
  let containerCssText = '';
  {
    containerCssText = Object.entries(RedCanvas.getContainerCss(canvasInfo, rootComponentState.borderGradientInfo));
    containerCssText = containerCssText.map(v => {
      return `${v[0].replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)} : ${v[1]}`;
    });
    containerCssText = containerCssText.join(';\n');
    let className = '';
    let position = '';
    switch (rootComponentState['key']) {
      case ACTIVE_FRAME_KEY.BEFORE:
        className = `.result::before`;
        position = `content: ""; position : absolute; top : ${canvasInfo['top'] || 0}px; left : ${canvasInfo['left'] || 0}px; `;
        break;
      case ACTIVE_FRAME_KEY.MAIN:
        className = '.result';
        position = 'position : relative;';
        break;
      case ACTIVE_FRAME_KEY.AFTER:
        className = `.result::after`;
        position = `content: ""; position : absolute; top : ${canvasInfo['top'] || 0}px; left : ${canvasInfo['left'] || 0}px; `;
        break;
    }
    console.log('className', className);
    let filter = RedCanvas.getFilterCss(canvasInfo['filterList']);
    let addCustomCss = canvasInfo['addCss'] || '';
    containerCssText = `${className} {
          ${position}
          background : ${(CALC_GRADIENT.calcGradients(rootComponentState.layers, true, rootComponentState.bgColor))};
          background-blend-mode : ${CALC_GRADIENT.calcBlendMode(rootComponentState.layers)};
          ${filter ? `filter : ${filter};` : ''}
          ${containerCssText};
          ${addCustomCss || ''}
          }`;
  }
  return containerCssText;
};
export default RedGradientEditComp;
const style = {
  container: {
    display: "flex", height: '100%',
    borderRight: '1px solid #000',
    overflowX: 'hidden',
    overflowY: 'hidden'
  },
  contentWrap: {
    padding: '5px 10px 10px',
    display: 'flex'
  },
  layer: {
    height: '30px'
  },
  itemContainer: {
    padding: '4px 0px',
    borderBottom: '1px solid rgba(0,0,0,0.5)'
  },
  divide: {
    margin: '5px 0px',
    height: '2px',
    background: '#4e4e4e',
    borderTop: '1px solid #000'
  },
  copyClass: {
    cursor: 'pointer',
    margin: '4px 4px 0px',
    padding: '4px',
    width: 'calc(100% - 8px)',
    fontSize: '12px',
    color: '#fff',
    outline: 'none',
    border: '1px solid #111',
    background: 'linear-gradient(#5e7ade, #2c3565)',
    borderRadius: '4px'
  }
};
