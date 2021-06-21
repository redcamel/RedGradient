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
import RedGradientColorEdit from "./RedGradientColorEdit.jsx";
import RedPropertyPositionEditByMouse from "./RedPropertyPositionEditByMouse.jsx";
import RedPropertyTypeEdit from "./RedPropertyTypeEdit.jsx";
import RedPropertyPositionEdit from "./RedPropertyPositionEdit.jsx";
import RedPropertyDegreeEdit from "./RedPropertyDegreeEdit.jsx";
import RedPropertyRepeatEdit from "./RedPropertyRepeatEdit.jsx";
import RedPropertyTypeEndingShapeEdit from "./RedPropertyTypeEndingShapeEdit";
import RedPropertyAtEdit from "./RedPropertyAtEdit";
import GRADIENT_TYPE from "../GRADIENT_TYPE";
import RedPropertySizeEdit from "./RedPropertySizeEdit";
import RedPropertyBlendEdit from "./RedPropertyBlendEdit";
import RedCanvas from "../canvas/RedCanvas";
import CALC_GRADIENT from "../CALC_GRADIENT";
import {toast} from "react-toastify";
import ACTIVE_FRAME_KEY from "../ACTIVE_FRAME_KEY.js";

class RedPropertyEdit extends React.Component {
  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const data = rootComponentState.activeSubData;
    let containerCssText = RedPropertyEdit.getContainerCssText(rootComponentState)
    return <div style={{borderLeft: '1px solid rgb(0, 0, 0)'}}>
      <RedTitle title={'Gradient Edit'}/>
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
                }}/>
                <div style={style.divide}/>
                <RedPropertyTypeEdit rootComponent={rootComponent}/>
                <div style={style.divide}/>
                <RedPropertyRepeatEdit rootComponent={rootComponent}/>
                <div style={style.divide}/>
                <RedPropertyBlendEdit rootComponent={rootComponent}/>
                {data.type === GRADIENT_TYPE.RADIAL || data.type === GRADIENT_TYPE.REPEAT_RADIAL ? <>
                  <div style={style.divide}/>
                  <RedPropertyTypeEndingShapeEdit rootComponent={rootComponent}/>
                </> : ''}
                {data.type === GRADIENT_TYPE.LINEAR || data.type === GRADIENT_TYPE.REPEAT_LINEAR || data.type === GRADIENT_TYPE.CONIC || data.type === GRADIENT_TYPE.REPEAT_CONIC ?
                  <>
                    <div style={style.divide}/>
                    <RedPropertyDegreeEdit rootComponent={rootComponent}/>
                  </> : ''}
                <div style={style.divide}/>
                <RedPropertySizeEdit rootComponent={rootComponent}/>
                {data.type === GRADIENT_TYPE.RADIAL || data.type === GRADIENT_TYPE.REPEAT_RADIAL || data.type === GRADIENT_TYPE.CONIC || data.type === GRADIENT_TYPE.REPEAT_CONIC ? <>
                  <div style={style.divide}/>
                  <RedPropertyAtEdit rootComponent={rootComponent}/>
                </> : ''}

              </div>

              <div style={style.divide}/>
              <RedPropertyPositionEdit rootComponent={rootComponent}/>

              <div style={style.divide}/>
              <div style={{display: 'flex'}}>
                <div>
                  position
                  <RedPropertyPositionEditByMouse rootComponent={rootComponent} targetKey={'position'}/>
                </div>
                {data.type === GRADIENT_TYPE.RADIAL || data.type === GRADIENT_TYPE.REPEAT_RADIAL || data.type === GRADIENT_TYPE.CONIC || data.type === GRADIENT_TYPE.REPEAT_CONIC ?
                  <div>
                    center
                    <RedPropertyPositionEditByMouse rootComponent={rootComponent} targetKey={'at'}/>
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
                    <RedTitle title={'Result'}/>
                    <button
                      style={style.copyClass}
                      onClick={() => {
                        const tempElem = document.createElement('textarea');
                        tempElem.value = containerCssText;
                        document.body.appendChild(tempElem);
                        tempElem.select();
                        document.execCommand("copy");
                        document.body.removeChild(tempElem);
                        toast.dark("Copy Class!", {
                          position: 'bottom-left'
                        })
                      }}
                    >Copy Class
                    </button>
                    {/*<SyntaxHighlighter language="css" wrapLongLines={'pre'} style={dracula}>*/}
                    {containerCssText}
                    {/*</SyntaxHighlighter>*/}
                  </div>

                </div>
                <div>TODO - 애드센스자리</div>
              </div>
            </div>
          </div>
          <div style={{...style.itemContainer, width: '360px'}}>
            <RedGradientColorEdit rootComponent={rootComponent}/>
          </div>

          {/*<div style={style.itemContainer}>*/}
          {/*  <div>Current Gradient Css</div>*/}
          {/*{CALC_GRADIENT.calcGradientItem(data, false, activeLayer)}*/}
          {/*<SyntaxHighlighter language="css" wrapLongLines={'pre'} style={dracula}>*/}
          {/*  {*/}
          {/*    JSON.stringify(CALC_GRADIENT.calcGradientItem(data, false, activeLayer))*/}
          {/*  }*/}
          {/*</SyntaxHighlighter>*/}
          {/*<div>Current Gradient Data</div>*/}
          {/*<SyntaxHighlighter language="javascript" wrapLongLines={'pre'} style={dracula}>*/}
          {/*  {JSON.stringify(data, null, 2)}*/}
          {/*</SyntaxHighlighter>*/}
          {/*</div>*/}
        </div>
      </div>
    </div>;
  }
}

RedPropertyEdit.getContainerCssText = (rootComponentState) => {
  const canvasInfo = rootComponentState.canvasInfo
  let containerCssText = ''
  {
    containerCssText = Object.entries(RedCanvas.getContainerCss(canvasInfo, rootComponentState.borderGradientInfo))
    containerCssText = containerCssText.map(v => {
      return `${v[0].replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`)} : ${v[1]}`
    });
    containerCssText = containerCssText.join(';\n')
    let className = ''
    let position = ''
    switch (rootComponentState['key']) {
      case ACTIVE_FRAME_KEY.BEFORE:
        className = `.result::before`
        position = `content: ""; position : absolute; top : ${canvasInfo['top'] || 0}px; left : ${canvasInfo['left'] || 0}px; `
        break
      case ACTIVE_FRAME_KEY.MAIN:
        className = '.result'
        position = 'position : relative;'
        break
      case ACTIVE_FRAME_KEY.AFTER:
        className = `.result::after`
        position = `content: ""; position : absolute; top : ${canvasInfo['top'] || 0}px; left : ${canvasInfo['left'] || 0}px; `
        break
    }
    console.log('className', className)
    let filter = RedCanvas.getFilterCss(canvasInfo['filterList'])
    containerCssText = `${className} {
          ${position}
          background : ${(CALC_GRADIENT.calcGradients(rootComponentState.layers, true, rootComponentState.bgColor))};
          background-blend-mode : ${CALC_GRADIENT.calcBlendMode(rootComponentState.layers)};
          ${filter ? `filter : ${filter};` : ''}
          ${containerCssText}
          }`
  }
  return containerCssText
}
export default RedPropertyEdit;
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
