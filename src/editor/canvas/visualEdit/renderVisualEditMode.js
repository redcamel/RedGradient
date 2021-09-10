import VISUAL_EDIT_MODE from "../../../js/const/VISUAL_EDIT_MODE";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {faEdit, faEye, faObjectGroup} from "@fortawesome/free-solid-svg-icons";

const renderVisualEditMode = function (rootComponentState, canvasInfo, activeSubData) {
  return <div style={{
    position: 'absolute',
    top: 70,
    left: 10,
    display: 'flex',
    background: 'rgba(0,0,0,0.8)',
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid rgba(0,0,0,0.16)'
  }}>
    <div>
      <div>
        <div style={{
          color: '#fff',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <span style={{color: '#efb26a'}}>Container info </span>
          <div style={{marginTop: '3px'}}>
            w : {+canvasInfo['width'].toFixed(2)}, h : {+canvasInfo['height'].toFixed(2)} /
            x : {+canvasInfo['left'].toFixed(2)} , y : {+canvasInfo['top'].toFixed(2)}
          </div>
        </div>
      </div>
      <div style={style.divide} />
      <div style={{
        color: '#fff',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <span style={{color: '#efb26a'}}>Gradient info </span>
        <div style={{marginTop: '3px'}}>
          w : {activeSubData['size']['w'].toFixed(2)}{activeSubData['size']['wUnit']},
          h : {activeSubData['size']['h'].toFixed(2)}{activeSubData['size']['hUnit']}
        </div>
        <div>
          x : {activeSubData['position']['x'].toFixed(2)}{activeSubData['position']['xUnit']},
          y : {activeSubData['position']['y'].toFixed(2)}{activeSubData['position']['yUnit']}
        </div>

      </div>
      <div style={style.divide} />
      <div>
        <div style={{color: '#efb26a'}}>Visual Edit target</div>
        <div style={{
          marginTop: '3px',
          display: 'inline-block'

        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: '4px',
            overflow: 'hidden',
            border: '1px solid #000',
          }}>
            {
              Object.values(VISUAL_EDIT_MODE).map((v, index) => {
                const activeYn = this.state.visualEditMode === v;
                return <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    color: '#fff',
                    borderLeft: index ? '1px solid #000' : 0,
                    padding: '6px',
                    background: activeYn ? 'linear-gradient(rgb(94, 122, 222), rgb(44, 53, 101))' : '#333333'
                  }}
                  onClick={() => {
                    this.setState({visualEditMode: v});
                  }}
                ><FontAwesomeIcon icon={faEdit} style={{marginRight: '6px', opacity: activeYn ? 1 : 0.3}} />{v}</div>;
              })
            }
          </div>
        </div>
      </div>
      <div style={style.divide} />
      <div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={style.canvasResizer}>
            <div>
              <label style={{
                // background: 'linear-gradient(rgb(94, 122, 222), rgb(58, 73, 125))',
                display: 'flex',
                borderRadius: '4px',
                padding: '2px 0px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                alignItems: 'center'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '26px',
                  justifyContent: 'center',
                  marginRight: '4px',
                }}><FontAwesomeIcon
                  icon={faObjectGroup} style={{
                  opacity: this.state.layerSizeView ? 1 : 0.5,
                  color: '#efb26a',
                  fontSize: '20px'
                }} /></div>
                View Visual Edit
                <input type={'checkbox'}
                       checked={this.state.layerSizeView}
                       style={{
                         display: 'inline-block',
                         width: '15px',
                         height: '15px',
                         background: rootComponentState.bgColor === 'transparent' ? '' : rootComponentState.bgColor,
                         borderRadius: '4px',
                         border: '1px solid #000',
                         cursor: 'pointer',
                         marginLeft: '5px'
                       }}
                       onClick={() => this.setState({layerSizeView: !this.state.layerSizeView})}
                />
              </label>
            </div>
            <div>
              <label style={{
                // marginLeft: '5px',
                // background: 'linear-gradient(rgb(94, 122, 222), rgb(58, 73, 125))',
                display: 'flex',
                borderRadius: '4px',
                padding: '2px 0px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                alignItems: 'center',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '26px',
                  height: '26px',
                  justifyContent: 'center',
                  marginRight: '4px',
                }}><FontAwesomeIcon icon={faEye}
                                    style={{
                                      opacity: this.state.editCanvasOnly ? 1 : 0.5,
                                      color: '#efb26a',
                                      fontSize: '20px', marginTop: '2px'
                                    }} />
                </div>
                View Edit Container Only
                <input type={'checkbox'}
                       checked={this.state.editCanvasOnly}
                       style={{
                         display: 'inline-block',
                         width: '15px',
                         height: '15px',
                         background: rootComponentState.bgColor === 'transparent' ? '' : rootComponentState.bgColor,
                         borderRadius: '4px',
                         border: '1px solid #000',
                         cursor: 'pointer',
                         marginLeft: '5px'
                       }}
                       onClick={() => this.setState({editCanvasOnly: !this.state.editCanvasOnly})}
                />
              </label>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>;
};
export default renderVisualEditMode;
const style = {
  canvasResizer: {
    // display: 'flex',
    alignItems: 'center',
    fontSize: '12px'
  },
  divide: {
    margin: '5px 0px',
    height: '2px',
    background: '#4e4e4e',
    borderTop: '1px solid #000'
  }
};
