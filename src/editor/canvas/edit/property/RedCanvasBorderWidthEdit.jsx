/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedNumber from "../../../../core/RedNumber.jsx";

const names = ['T', 'R', 'B', 'L'];

class RedCanvasBorderWidthEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    return <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        width
        <div style={{
          display: 'flex',
          borderRadius: '4px',
          border: '1px solid #000',
          fontSize: '11px',
          marginRight: '4px',
          overflow: 'hidden'
        }}>

          <div
            onClick={() => {
              canvasInfo.border_width_mergeMode = false;
              rootComponent.updateRootState();
            }}
            style={{...style.mode, background: canvasInfo.border_width_mergeMode ? '#2f2f2f' : '#5e7ade'}}>solo
          </div>
          <div
            onClick={() => {
              canvasInfo.border_width_mergeMode = true;
              rootComponent.updateRootState();
            }}
            style={{
              ...style.mode,
              borderLeft: '1px solid #000',
              background: canvasInfo.border_width_mergeMode ? '#5e7ade' : '#2f2f2f'
            }}>merge
          </div>
        </div>
      </div>
      <div style={{marginTop: '6px'}} />
      {
        canvasInfo['border_width_mergeMode']
          ? <div style={style.container}>
            <RedNumber
              title={'width'}
              width={'51px'}
              minValue={0}
              value={canvasInfo['border_width'] || 0}
              HD_onInput={e => {
                canvasInfo['border_width'] = +e.target.value;
                rootComponent.updateRootState({});
              }} />
            <span style={{marginLeft: '3px'}}>px</span>
          </div>
          :
          <div style={style.container}>
            {
              canvasInfo['border_width_split'].map((v, index) => {
                return <div>
                  <RedNumber
                    title={names[index]}
                    width={'150px'}
                    minValue={0}
                    value={v || 0}
                    HD_onInput={e => {
                      canvasInfo['border_width_split'][index] = +e.target.value;
                      rootComponent.updateRootState({});
                    }} />
                  <span style={{marginLeft: '3px'}}>px</span>
                </div>;
              })
            }
          </div>
      }

    </div>;
  }
}

export default RedCanvasBorderWidthEdit;
const style = {
  container: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  mode: {
    padding: '2px 5px',
    cursor: 'pointer',
  }
};
