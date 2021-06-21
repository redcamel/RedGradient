/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import RedNumber from "../../../../core/RedNumber.jsx";
import {ColorPicker} from "@easylogic/colorpicker";

let rootComponent;
let filterData;

class RedCanvasFilterDropShadow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorPickerOpenYn: false
    };
    this.refColorPickerContainer = React.createRef();
  }

  getCss(filterData) {
    return RedCanvasFilterDropShadow.getCss(filterData);
  }

  render() {
    rootComponent = this.props.rootComponent;
    filterData = this.props.filterData;
    return <div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        offsetX <RedNumber
        width={'50px'}
        value={filterData['values']['offsetX'] || 0}
        HD_onInput={e => {
          filterData['values']['offsetX'] = +e.target.value;
          filterData['css'] = this.getCss(filterData);
          rootComponent.updateRootState({});
        }} />
        offsetY <RedNumber
        width={'50px'}
        value={filterData['values']['offsetY'] || 0}
        HD_onInput={e => {
          filterData['values']['offsetY'] = +e.target.value;
          filterData['css'] = this.getCss(filterData);
          rootComponent.updateRootState({});
        }} />
      </div>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        radius <RedNumber
        step={1}
        width={'100px'}
        value={filterData['values']['radius'] || 0}
        HD_onInput={e => {
          filterData['values']['radius'] = +e.target.value;
          filterData['css'] = this.getCss(filterData);
          rootComponent.updateRootState({});
        }} />
        <div
          className={filterData['values']['color'] === 'transparent' ? 'transparent_checker' : ''}
          style={{
            display: 'inline-block',
            width: '28px',
            height: '28px',
            background: filterData['values']['color'] === 'transparent' ? '' : filterData['values']['color'],
            borderRadius: '6px',
            border: '1px solid #000',
            cursor: 'pointer'
          }}
          onClick={() => {
            this.setState({colorPickerOpenYn: true});
            if (!this.state.colorPicker) {
              this.state.colorPicker = new ColorPicker({
                type: "sketch",
                position: 'inline',
                color: filterData['values']['color'],
                container: this.refColorPickerContainer.current,
                onChange: color => {
                  filterData['values']['color'] = color;
                  rootComponent.updateRootState({filterData});
                }
              });
            }
            requestAnimationFrame(() => {
              this.state.colorPicker.initColorWithoutChangeEvent(filterData['values']['color']);
            });
          }}
        />

        <div style={{
          zIndex: 1, position: 'absolute', top: 0, left: '0%', transform: 'translate(16px , 0px)',
          boxShadow: '0px 0px 16px rgba(0,0,0,0.16)',
          background: '#fff',
          borderRadius: '8px',
          overflow: 'hidden',
          display: this.state.colorPickerOpenYn ? 'block' : 'none'
        }}>
          <div ref={this.refColorPickerContainer} />
          <div
            style={{padding: '4px', background: '#5e7ade', cursor: 'pointer', textAlign: 'center'}}
            onClick={() => {
              this.setState({colorPickerOpenYn: null});
            }}
          >완료
          </div>
        </div>
      </div>

    </div>;
  }
}

RedCanvasFilterDropShadow.getCss = filterData => {
  return `drop-shadow(${filterData['values']['offsetX']}px ${filterData['values']['offsetY']}px ${filterData['values']['radius']}px ${filterData['values']['color']})`;
};
RedCanvasFilterDropShadow.getNewDataValues = () => {
  return {
    offsetX: 2,
    offsetY: 4,
    radius: 6,
    color: '#000'
  };
};
export default RedCanvasFilterDropShadow;
