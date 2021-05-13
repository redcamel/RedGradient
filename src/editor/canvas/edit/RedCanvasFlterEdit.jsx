import React from "react";
import RedSelect from "../../../core/RedSelect.jsx";
import RedCanvasFilterBlurEdit from "./RedCanvasFilterBlurEdit";

const filterList = [
  'normal', 'blur'
];
const filterComponent = {
  blur : {
    component : RedCanvasFilterBlurEdit,
    data : {
      amount : 0
    }
  }
}

class RedCanvasFilterEdit extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const rootComponent = this.props.rootComponent;
    const rootComponentState = rootComponent.state;
    const canvasInfo = rootComponentState.canvasInfo;
    if (!canvasInfo.hasOwnProperty('border_radius_unit')) {
      canvasInfo['border_radius'] = 0;
      canvasInfo['border_radius_unit'] = 'px';
    }
    const TargetFilter = filterComponent[canvasInfo['filter']]?.component
    console.log(canvasInfo)
    return <div>
      <div style={style.container}>
        filterList
        <RedSelect value={canvasInfo['filter']} options={filterList} HD_change={e => {
          canvasInfo['filter'] = e.target.value;
          const filter = filterComponent[canvasInfo['filter']]
          canvasInfo['filterData'] = filter ? JSON.parse(JSON.stringify(filter['data'])) : null
          rootComponent.setState({});
        }} />
      </div>
      {TargetFilter ? <TargetFilter rootComponent={rootComponent} /> : ''}
      <div className={'todo'}>Todo - 멀티 필터 적용가능하게 개발되어야함</div>
    </div>;
  }
}

export default RedCanvasFilterEdit;

const style = {
  container: {
    display: 'flex',
    alignItems: 'center'
  }
};
