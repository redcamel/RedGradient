/*
 *
 *  * RedGL - MIT License
 *  * Copyright (c) 2021~ By RedCamel(webseon@gmail.com)
 *  * https://github.com/redcamel/RedGradient
 *
 */
import React from "react";
import CALC_GRADIENT from "../../../CALC_GRADIENT.js";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PresetBorder from "./PresetBorder.js";

const presetList = [
  {
    name: 'test',
    data: PresetBorder
  }
];

class RedPresetBorder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 0
    };
  }

  renderList(list, delMode) {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const activeSubData = rootComponentState.activeSubData;
    return list.map((v, index) => {
      return <div
        style={style.iconContainer}
        onClick={() => {
          if (delMode) {
            RedPresetBorder.delUserPreset(rootComponent, index)
          } else {
            const newData = JSON.parse(JSON.stringify(v['data']))
            const idx = rootComponentState.activeLayer.items.indexOf(activeSubData)
            rootComponentState.activeLayer.items.splice(idx, 1, newData)
            rootComponentState.activeSubData = newData
          }
          rootComponent.updateRootState({});
        }}
      >
        <div style={{
          ...style.icon,
          background: CALC_GRADIENT.calcGradientItem(JSON.parse(JSON.stringify(v['data'])))
        }}>
        </div>
        <div style={style.name}>{v['name']}</div>
        {delMode ? <div style={style.del}><FontAwesomeIcon
          icon={faMinusCircle}/></div> : ''}
      </div>;
    })
  }

  render() {
    const userPresetBorder = RedPresetBorder.getUserPreset()
    // console.log('presetList', presetList)
    // console.log('userPresetBorder', userPresetBorder)
    return <div>
      <div className={'ui_subTitle'}>Preset Border Gradient</div>
      <div style={style.container}>{this.renderList(presetList)}</div>
      <div style={style.divide}/>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

        <div className={'ui_subTitle'}>User Preset Border Gradient</div>
        <div style={{
          display: 'flex',
          borderRadius: '4px',
          border: '1px solid #000',
          fontSize: '11px',
          marginRight: '4px',
          overflow: 'hidden'
        }}>
          <div
            onClick={() => this.setState({mode: 0})}
            style={{...style.mode, background: this.state.mode === 0 ? '#5e7ade' : '#2f2f2f'}}>view
          </div>
          <div
            onClick={() => this.setState({mode: 1})}
            style={{
              ...style.mode,
              borderLeft: '1px solid #000',
              background: this.state.mode === 1 ? '#5e7ade' : '#2f2f2f'
            }}>del
          </div>
          <div
            onClick={() => RedPresetBorder.exportPreset()}
            style={{...style.mode, borderLeft: '1px solid #000', background: '#2f2f2f'}}>export
          </div>
          <div
            onClick={() => RedPresetBorder.importPreset(this.props.rootComponent)}
            style={{...style.mode, borderLeft: '1px solid #000', background: '#2f2f2f'}}>import
          </div>
        </div>
      </div>
      <div style={style.container}>{this.renderList(userPresetBorder, this.state.mode === 1)}</div>
    </div>
  }
}

export default RedPresetBorder;
RedPresetBorder.getUserPreset = () => JSON.parse(localStorage.getItem('userPresetBorder') || '[]')
RedPresetBorder.addUserPreset = (context, v) => {
  let t0 = RedPresetBorder.getUserPreset()
  t0.push({name: v['title'], data: v});
  localStorage.setItem('userPresetBorder', JSON.stringify(t0))
  context.setState({})
}
RedPresetBorder.delUserPreset = (context, index) => {
  let t0 = RedPresetBorder.getUserPreset()
  t0.splice(index, 1)
  localStorage.setItem('userPresetBorder', JSON.stringify(t0))
  context.setState({})
}
RedPresetBorder.exportPreset = () => {
  const a = document.createElement('a');
  const file = new Blob([JSON.stringify(RedPresetBorder.getUserPreset())], {type: 'application/json'});
  a.href = URL.createObjectURL(file);
  a.download = `RedBorderGradientPreset.json`;
  a.click();
  URL.revokeObjectURL(a.href);
}
RedPresetBorder.checkValidate = (v) => {
  /**
   * JSON 파싱이 되어야하고..
   * 빈배열은 그냥 통과
   * colorList 키를 가지고있는 경우만 통과
   *
   */
  let result = true;
  try {
    let t0 = JSON.parse(v);
    if (t0 instanceof Array) {
      if (t0.length === 0) result = true
      else if (!t0[0].hasOwnProperty('data') || !t0[0]['data'].hasOwnProperty('colorList')) result = false;
    } else result = false
  } catch (e) {
    result = false;
  }
  return result;
}
RedPresetBorder.importPreset = (context) => {
  const a = document.createElement('input');
  a.setAttribute('accept', '.json');
  a.setAttribute('type', 'file');
  a.click();
  a.onchange = e => {
    let fileReader = new FileReader();
    fileReader.onload = evt => {
      // console.log(evt.target.result)
      if (RedPresetBorder.checkValidate(evt.target.result)) {
        localStorage.setItem('userPresetBorder', evt.target.result)
        context.setState({})
      } else alert('RedGradient Preset 형식의 파일이 아닙니다.')
    }
    fileReader.readAsText(e.target.files[0]);
  };
}
const style = {
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  mode: {
    padding: '2px 5px',
    cursor: 'pointer',
  },
  name: {
    width: '30px',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  iconContainer: {
    margin: '5px',
    cursor: 'pointer',
    textAlign: 'center'
  },
  icon: {
    width: '30px',
    height: '30px',
    background: '#fff',
    borderRadius: '5px',
    border: '1px solid rgba(0,0,0,0.5)'
  },
  divide: {
    margin: '5px 0px',
    height: '2px',
    background: '#4e4e4e',
    borderTop: '1px solid #000'
  },
  del: {
    position: 'absolute',
    top: 0, right: 0,
    transform: 'translate(50%,-50%)',
    fontSize: '14px',
    width: '16px',
    height: '16px'
  }
};
