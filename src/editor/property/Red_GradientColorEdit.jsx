import React from "react";
import GRADIENT_TYPE from "../GRADIENT_TYPE";
import Red_GradientColorItem from "./Red_GradientColorItem";

//TODO - 일단 더미로 쭉 쳐보고 정리

class Red_GradientColorEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIDX: 0,
    };
    this.refBar = React.createRef();
  }

  renderGradientColorList(data) {
    const itemList = [];
    const gradients = data['colorList'].map((v, index) => {
      const activeYn = this.state.activeIDX === index;
      let colorRangeTxt;
      colorRangeTxt = `${v['range']}%`;
      itemList.push(this.renderColorStep(v, index, activeYn));
      return `${v['color']} ${colorRangeTxt}`;
    });
    const code = `${GRADIENT_TYPE.LINEAR}(90deg, ${gradients})`;
    return <div style={{
      height: '55px',
      background: code,
      transition: 'background 0.2s'
    }}>
      {itemList}
    </div>;
  };

  renderColorStep(v, index, activeYn) {
    let tLeft;
    tLeft = `${v['range']}%`;
    return <div
      style={{
        position: 'absolute',
        height: '10px',
        bottom: 0,
        left: tLeft,
        borderRadius: '4px',
        width: '4px',
        background: activeYn ? '#5e7ade' : '#fff',
        border: '1px solid #000',
        transform: `translate(-50%,100%)`,
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'background 0.2s, top 0.2s, bottom 0.2s',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.46)'
      }}
    />;

  };

  sortColorList() {
    this.props.rootComponent.state.activeSubData.colorList.sort((a, b) => {
      const aX = a['range'];
      const bX = b['range'];
      if (aX > bX) return 1;
      if (aX < bX) return -1;
      return 0;
    });
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const data = rootComponentState.activeSubData;
    const activeLayer = rootComponentState.activeLayer;

    return <div style={style.container}>
      <div
        ref={this.refBar}
        className={'transparent_checker'}
        style={{border:'1px solid rgba(0,0,0,1)'}}

      >
        {this.renderGradientColorList(data)}
      </div>
      <div style={{marginTop: '20px'}}>
        {
          data['colorList'].map((v, index) => {
            return <Red_GradientColorItem
              rootComponent={rootComponent}
              colorData={v}
              activeYn={this.state.activeIDX === index}
              HD_active={index => {
                this.setState({activeIDX: index});
              }}
              HD_sort={e => {this.sortColorList();}}
            />;
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
