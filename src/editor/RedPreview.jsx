/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedPropertyEdit from "./property/RedPropertyEdit.jsx";
import ACTIVE_FRAME_KEY from "./ACTIVE_FRAME_KEY.js";
import styled from 'styled-components'

class RedPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let rootComponentState = this.props.rootComponentState
    console.log('RedPreview', rootComponentState)
    let beforeText = RedPropertyEdit.getContainerCssText(rootComponentState[ACTIVE_FRAME_KEY.BEFORE])
    let mainText = RedPropertyEdit.getContainerCssText(rootComponentState[ACTIVE_FRAME_KEY.MAIN])
    let afterText = RedPropertyEdit.getContainerCssText(rootComponentState[ACTIVE_FRAME_KEY.AFTER])
    console.log('beforeText', beforeText)
    console.log('mainText', mainText)
    console.log('afterText', afterText)
    let beforeText2 = beforeText.trim().substr(18)
    beforeText2 = beforeText2.substr(0, beforeText2.length - 1)
    let mainText2 = mainText.trim().substr(9)
    mainText2 = mainText2.substr(0, mainText2.length - 1)
    let afterText2 = afterText.trim().substr(17)
    afterText2 = afterText2.substr(0, afterText2.length - 1)
    let ResultPreview = styled.div`
    {
      ${mainText2};

      &::before {
        ${beforeText2}
      }
    ;

      &::after {
        ${afterText2}
      }
    ;
    `
    return <div style={style.bg}>
      <div style={style.container}>
        <div style={{display: 'flex', flex: 1, width: '100%'}}>
          <div style={{display: 'flex', flexDirection: 'column', width: '300px'}}>
            <div style={{padding: '10px', border: '1px solid red'}}>
              <h3>before</h3>
              <div>{beforeText2}</div>
            </div>
            <div style={{padding: '10px', border: '1px solid red'}}>
              <h3>main</h3>
              <div>{mainText2}</div>
            </div>
            <div style={{padding: '10px', border: '1px solid red'}}>
              <h3>after</h3>
              <div>{afterText2}</div>
            </div>
            <h3>
              TODO
              <li>아마 여기서 위치조정은 해야할듯한데?</li>
              <li>프리뷰 줌도 해줘야할것 같고</li>
              <li>흠 사이즈 편집도 해줘야하나</li>
            </h3>
          </div>
          <div style={{
            display: 'flex', flex: 1, alignItems: 'center', justifyItems: 'center',
            background: '#fff'
          }}>
            <div style={{
              position: 'absolute',
              top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)'
            }}>
              <ResultPreview/>
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
            onClick={() => this.props.HD_Close()}
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
      zIndex: 2
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
