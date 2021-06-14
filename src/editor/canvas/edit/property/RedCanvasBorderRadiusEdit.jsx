/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedSelect from "../../../../core/RedSelect.jsx";
import RedNumber from "../../../../core/RedNumber.jsx";

const names = ['TL', 'BL', 'TR', 'BR']

class RedCanvasBorderRadiusEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    return <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        radius
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
              canvasInfo.border_radius_mergeMode = false
              rootComponent.updateRootState()
            }}
            style={{...style.mode, background: canvasInfo.border_radius_mergeMode ? '#2f2f2f' : '#5e7ade'}}>solo
          </div>
          <div
            onClick={()=> {
              canvasInfo.border_radius_mergeMode = true
              rootComponent.updateRootState()
            }}
            style={{
              ...style.mode,
              borderLeft: '1px solid #000',
              background: canvasInfo.border_radius_mergeMode ? '#5e7ade' : '#2f2f2f'
            }}>merge
          </div>
        </div>
      </div>
      <div style={{marginTop: '6px'}}/>
      {
        canvasInfo['border_radius_mergeMode']
          ? <div style={style.container}>

            <RedNumber
              title={'radius'}
              width={'125px'}
              minValue={0}
              value={canvasInfo['border_radius'] || 0}
              HD_onInput={e => {
                canvasInfo['border_radius'] = +e.target.value;
                rootComponent.updateRootState({});
              }}/>
            <RedSelect value={canvasInfo['border_radius_unit']} options={['px', '%']} HD_change={e => {
              canvasInfo['border_radius_unit'] = e.target.value;
              rootComponent.updateRootState({});
            }}/>
          </div>
          :
          <div style={style.container}>
            {
              canvasInfo['border_radius_split'].map((v, index) => {
                return <div>
                  <RedNumber
                    title={names[index]}
                    width={'115px'}
                    value={v || 0}
                    minValue={0}
                    HD_onInput={e => {
                      canvasInfo['border_radius_split'][index] = +e.target.value;
                      rootComponent.updateRootState({});
                    }}/>
                  <RedSelect
                    value={canvasInfo['border_radius_unit_split'][index]}
                    options={['px', '%']} HD_change={e => {
                    canvasInfo['border_radius_unit_split'][index] = e.target.value;
                    rootComponent.updateRootState({});
                  }}/>
                </div>
              })
            }
          </div>
      }

    </div>;
  }
}

export default RedCanvasBorderRadiusEdit;
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
}
