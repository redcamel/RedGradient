/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedGradientEditComp from "./edit/gradient/RedGradientEditComp.jsx";
import ACTIVE_FRAME_KEY from "../const/ACTIVE_FRAME_KEY.js";

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
    let ResultPreview = `
    ${beforeText2}
    ${mainText2}
    ${afterText2}
    `;
    document.getElementById('red_gradient_result_css').textContent = ResultPreview;
    let beforeCanvasInfo = rootComponentState[ACTIVE_FRAME_KEY.BEFORE]['canvasInfo'];
    let mainCanvasInfo = rootComponentState[ACTIVE_FRAME_KEY.MAIN]['canvasInfo'];
    let afterCanvasInfo = rootComponentState[ACTIVE_FRAME_KEY.AFTER]['canvasInfo'];
    return <div style={style.bg}>
      <div style={style.container}>
        <div style={{display: 'flex', flex: 1, width: '100%'}}>
          <div style={{display: 'flex', flexDirection: 'column', width: '360px'}}>
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
                return <div style={{padding: '10px', border: '1px solid red'}}>
                  <h3>{v['title']}</h3>
                  <div style={{maxHeight: '150px', overflowY: 'scroll'}}>{v['text']}</div>
                  {/*{*/}
                  {/*  v.itemList.map(tList => {*/}
                  {/*    return <div style={{display: 'flex'}}>*/}
                  {/*      {*/}
                  {/*        tList.map((tData, index) => {*/}
                  {/*          const key = tData['key']*/}
                  {/*          const targetCanvasInfo = v['targetCanvasInfo']*/}
                  {/*          return <>*/}
                  {/*            {index ? <div style={{width: '5px'}}/> : ''}*/}
                  {/*            <RedNumber title={key} width={'160px'} value={targetCanvasInfo[key]}*/}
                  {/*                       HD_onInput={e => {*/}
                  {/*                         targetCanvasInfo[key] = +e.target.value;*/}
                  {/*                         this.setState({})*/}
                  {/*                       }}/>*/}
                  {/*          </>*/}
                  {/*        })*/}
                  {/*      }*/}
                  {/*    </div>*/}
                  {/*  })*/}
                  {/*}*/}
                </div>;
              })
            }

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
            }}
            >
              <div className={"red_gradient_result"} />
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
