import React from "react";
import GRADIENT_TYPE from "../GRADIENT_TYPE";
//TODO - 일단 더미로 쭉 쳐보고 정리
class Red_GradientColorEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIDX: 0
    };
  }

  renderGradientColorList(data) {
    const itemList = [];
    const gradients = data['colorList'].map((v, index) => {
      console.log('this.state.activeIDX === index', this.state.activeIDX === index);
      const activeYn = this.state.activeIDX === index;
      let colorRangeTxt
      colorRangeTxt = `${v['range']}${v['rangeUnit']}`;
      itemList.push(this.renderColorStep(v, index, activeYn));
      return `${v['color']} ${colorRangeTxt}`;
    });
    const code = `${GRADIENT_TYPE.LINEAR}(90deg, ${gradients})`;
    return <div style={{
      height: '35px',
      background: code
    }}>
      {itemList}
    </div>;
  };

  renderColorStep(v, index, activeYn) {

    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    let tLeft
    if(v['rangeUnit']==='%') tLeft = `${v['range'] || 0}${v['rangeUnit']}`
    else {
      tLeft = `${v['range']/canvasInfo['width']*100}%`
    }
    return <div
      style={{
        position: 'absolute',
        top: '-3px',
        bottom: '-3px',
        left: tLeft,
        borderRadius: '5px',
        width: '10px',
        background: activeYn ? '#5e7ade' : '#fff',
        border: '1px solid #000',
        transform: 'translate(-50%,0)',
        textAlign: 'center',
        cursor: 'pointer',
        transition : 'left 0.2s'
      }}
      onClick={e => {
        this.setState({
          activeIDX: index
        });
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          transform: 'translate(-25%,100%)',
          textAlign: 'center',
          fontSize: '9px',
          whiteSpace: 'nowrap'
        }}>
        {v['range']} {v['rangeUnit']}
      </div>
    </div>;
  };

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const data = rootComponentState.activeSubData;

    return <div style={style.container}>
      <div className={'transparent_checker'}>
        {this.renderGradientColorList(data)}
      </div>
      <div style={{marginTop: '20px'}}>
        {
          data['colorList'].map((v, index) => {
            const activeYn = this.state.activeIDX === index;
            const colorInfo = v['color']
            let rgba = []
            if(colorInfo.indexOf('rgba')>-1) rgba = colorInfo.split('(')[1].split(')')[0].split(',')
            else if(colorInfo==='transparent') rgba = [0,0,0,0]
            else rgba = hexToRgbA(colorInfo)
            return <div style={{
              margin: '3px',
              border: activeYn ? '1px solid #5e7ade' : '1px solid rgba(255,255,255,0.1)',
              padding: '4px',

            }}>
              <div style={{
                display: 'inline-block'
              }}>
                {v['range']} {v['rangeUnit']} {v['color']}
                <div>r:{rgba[0]} g:{rgba[1]} b:{rgba[2]} a:{rgba[3]}</div>
                <div>#{rgba2hex(`rgba(${rgba.join(',')})`)}</div>
              </div>
            </div>;
          })
        }
      </div>

    </div>;
  }
}

export default Red_GradientColorEdit;
const style = {
  container: {
    paddingTop: '10px',
  }
};

function hexToRgbA(hex){
  var c;
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
    c= hex.substring(1).split('');
    if(c.length== 3){
      c= [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c= '0x'+c.join('');
    return [(c>>16)&255, (c>>8)&255, c&255,1];
  }
  throw new Error('Bad Hex');
}
function rgba2hex(orig) {
  var a, isPercent,
    rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
    alpha = (rgb && rgb[4] || "").trim(),
    hex = rgb ?
      (rgb[1] | 1 << 8).toString(16).slice(1) +
      (rgb[2] | 1 << 8).toString(16).slice(1) +
      (rgb[3] | 1 << 8).toString(16).slice(1) : orig;

  if (alpha !== "") {
    a = alpha;
  } else {
    a = 1;
  }
  // multiply before convert to HEX
  a = ((a * 255) | 1 << 8).toString(16).slice(1)
  hex = hex + a;

  return hex;
}
