import React from "react";

class Red_GradientColorEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const data = rootComponentState.activeSubData;
    return <div style={style.container}>
      <div className={'transparent_checker'}>
        {renderGradientColorList(data)}
      </div>

    </div>;
  }
}

export default Red_GradientColorEdit;
const style = {
  container: {
    paddingTop: '10px',
    paddingBottom: '30px'
  }
};
const renderColorStep = v=>{
  return <div style={{
    position: 'absolute',
    top: '-3px',
    bottom: '-3px',
    left: `${v['range'] || 0}${v['rangeUnit']}`,
    borderRadius: '5px',
    width: '10px',
    background: '#fff',
    border: '1px solid #000',
    transform: 'translate(-50%,0)',
    textAlign: 'center'
  }}>
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
}
const renderGradientColorList = data => {
  const itemList = [];
  const gradients = data['colorList'].map(v => {
    let colorRangeTxt = v['range'] === undefined ? '' : `${v['range']}${v['rangeUnit']}`;
    itemList.push(renderColorStep(v));
    return `${v['color']} ${colorRangeTxt}`;
  });
  return <div style={{
    height: '35px',
    background: `${data['type']}(${data['deg']}deg, ${gradients})`
  }}>
    {itemList}
  </div>;
};
